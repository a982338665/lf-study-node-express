

**1.Log4j的使用：简易流程**

    1.安装：
        npm install log4js
        npm install log4js --save   (依赖会添加在package.json)
    2.创建日志目录:   ./logs/
    3.添加配置文件:   log4js.json
    4.代码中加载log4js,并将配置文件获取到调用一下配置方法(log4js.configure(cfg.json))
    5.写日志log4js.getLogger('log_test').debug("随便写日志啦!!!") 
    