package top.rocyuan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * 启动程序
 * 
 * @author roc
 */
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class RocApplication
{
    public static void main(String[] args)
    {
        // System.setProperty("spring.devtools.restart.enabled", "false");
        SpringApplication.run(RocApplication.class, args);
        System.out.println("(♥◠‿◠)ﾉﾞ  大鹏管理平台启动成功   ლ(´ڡ`ლ)ﾞ  ");
    }
}
