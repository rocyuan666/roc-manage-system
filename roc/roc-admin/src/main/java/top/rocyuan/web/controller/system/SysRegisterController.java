package top.rocyuan.web.controller.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import top.rocyuan.common.core.controller.BaseController;
import top.rocyuan.common.core.domain.AjaxResult;
import top.rocyuan.common.core.domain.model.RegisterBody;
import top.rocyuan.common.utils.StringUtils;
import top.rocyuan.framework.web.service.SysRegisterService;
import top.rocyuan.system.service.ISysConfigService;

/**
 * 注册验证
 * 
 * @author roc
 */
@RestController
public class SysRegisterController extends BaseController
{
    @Autowired
    private SysRegisterService registerService;

    @Autowired
    private ISysConfigService configService;

    @PostMapping("/register")
    public AjaxResult register(@RequestBody RegisterBody user)
    {
        if (!("true".equals(configService.selectConfigByKey("sys.account.registerUser"))))
        {
            return error("当前系统没有开启注册功能！");
        }
        String msg = registerService.register(user);
        return StringUtils.isEmpty(msg) ? success() : error(msg);
    }
}
