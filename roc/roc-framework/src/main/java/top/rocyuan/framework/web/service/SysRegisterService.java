package top.rocyuan.framework.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import top.rocyuan.common.constant.CacheConstants;
import top.rocyuan.common.constant.Constants;
import top.rocyuan.common.constant.UserConstants;
import top.rocyuan.common.core.domain.entity.SysUser;
import top.rocyuan.common.core.domain.model.RegisterBody;
import top.rocyuan.common.core.redis.RedisCache;
import top.rocyuan.common.exception.user.CaptchaException;
import top.rocyuan.common.exception.user.CaptchaExpireException;
import top.rocyuan.common.utils.MessageUtils;
import top.rocyuan.common.utils.SecurityUtils;
import top.rocyuan.common.utils.StringUtils;
import top.rocyuan.framework.manager.AsyncManager;
import top.rocyuan.framework.manager.factory.AsyncFactory;
import top.rocyuan.system.service.ISysConfigService;
import top.rocyuan.system.service.ISysUserService;

/**
 * 注册校验方法
 * 
 * @author roc
 */
@Component
public class SysRegisterService
{
    @Autowired
    private ISysUserService userService;

    @Autowired
    private ISysConfigService configService;

    @Autowired
    private RedisCache redisCache;

    /**
     * 注册
     */
    public String register(RegisterBody registerBody)
    {
        String msg = "", username = registerBody.getUsername(), password = registerBody.getPassword();

        boolean captchaEnabled = configService.selectCaptchaEnabled();
        // 验证码开关
        if (captchaEnabled)
        {
            validateCaptcha(username, registerBody.getCode(), registerBody.getUuid());
        }

        if (StringUtils.isEmpty(username))
        {
            msg = "用户名不能为空";
        }
        else if (StringUtils.isEmpty(password))
        {
            msg = "用户密码不能为空";
        }
        else if (username.length() < UserConstants.USERNAME_MIN_LENGTH
                || username.length() > UserConstants.USERNAME_MAX_LENGTH)
        {
            msg = "账户长度必须在2到20个字符之间";
        }
        else if (password.length() < UserConstants.PASSWORD_MIN_LENGTH
                || password.length() > UserConstants.PASSWORD_MAX_LENGTH)
        {
            msg = "密码长度必须在5到20个字符之间";
        }
        else if (UserConstants.NOT_UNIQUE.equals(userService.checkUserNameUnique(username)))
        {
            msg = "保存用户'" + username + "'失败，注册账号已存在";
        }
        else
        {
            SysUser sysUser = new SysUser();
            sysUser.setUserName(username);
            sysUser.setNickName(username);
            sysUser.setPassword(SecurityUtils.encryptPassword(registerBody.getPassword()));
            boolean regFlag = userService.registerUser(sysUser);
            if (!regFlag)
            {
                msg = "注册失败,请联系系统管理人员";
            }
            else
            {
                AsyncManager.me().execute(AsyncFactory.recordLogininfor(username, Constants.REGISTER,
                        MessageUtils.message("user.register.success")));
            }
        }
        return msg;
    }

    /**
     * 校验验证码
     * 
     * @param username 用户名
     * @param code 验证码
     * @param uuid 唯一标识
     * @return 结果
     */
    public void validateCaptcha(String username, String code, String uuid)
    {
        String verifyKey = CacheConstants.CAPTCHA_CODE_KEY + StringUtils.nvl(uuid, "");
        String captcha = redisCache.getCacheObject(verifyKey);
        redisCache.deleteObject(verifyKey);
        if (captcha == null)
        {
            throw new CaptchaExpireException();
        }
        if (!code.equalsIgnoreCase(captcha))
        {
            throw new CaptchaException();
        }
    }
}
