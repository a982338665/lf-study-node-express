
> 合并仓库：基础-https://github.com/a982338665/lf-mk-node-basic.git

* [1\.Express框架相关](#1express框架相关)
  * [1\.1 express项目初始化](#11-express项目初始化)
  * [1\.2 项目目录说明：](#12-项目目录说明)
  * [1\.3 响应对象res](#13-响应对象res)
  * [1\.4 请求对象req:](#14-请求对象req)
  * [1\.5 中间件：类似于拦截器](#15-中间件类似于拦截器)
  * [1\.6\.路由介绍](#16路由介绍)
* [2\.node启动部署](#2node启动部署)
  * [2\.1 启动](#21-启动)
  * [2\.2 forever启动](#22-forever启动)


# 1.Express框架相关

## 1.1 express项目初始化

    1.安装生成器(全局)：npm/cnpm i -g express-generator
    2.初始化及使用：
        1.命令生成初始化项目：
            express -e 项目名称 （目录即为名称）
            express -e （将当前目录作为express初始化项目）
        2.安装依赖：
             install dependencies:
                 > npm install
             run the app:
                 > SET DEBUG=node-express:* & npm start
        3.开启项目：默认端口 3000
            npm start  (查找package.json中的scripts内容)
            node app
                需要在app.js中添加端口监听才能启动
            node ./bin/www
        
## 1.2 项目目录说明：

    bin             --可执行文件目录
        www         --可执行文件，一般是项目入口
    node_modules    --依赖包目录
    public          --静态文件根目录(所有静态文件：html/css/js/png/mp4/字体等,可直接访问)
    routes          --路由模块目录(动态文件目录) -> 优先找静态文件public/,再找静态文件
    views           --视图目录:用来存放所有的ejs模板
    app.js          --项目主文件：对所有资源进行统筹
    package.json    --项目描述文件
    
## 1.3 响应对象res

    1.res.send();
        1.返回任意类型的数据给客户端:
            json
            普通文本
            流文件等
        2.注意：
             // res.send(1);如果返回数字，会将其作为返回状态码，所以会报错
             // res.send();在单次请求中只能发送一次
        3.链式调用：
             // res.status(200).send(apiUtil.responseResult(res,true,null,null,{"id":18}));//链式调用
    2.res.json();
    3.res.render();//模板渲染
    4.res.download():数据下载
    
## 1.4 请求对象req:

    req.params.id       获取匹配路径参数  /params.html/:id    /params.html/23
    req.param("id")     获取匹配路径参数  /params.html/:id    /params.html/23
    req.query.id        获取get请求路径查询参数   /params.html/?id=10
    req.body.username   获取请求体参数
    req.headers.orgcode 获取请求头参数
    req.app             当callback为外部文件是，使用此访问express实例
    req.baseUrl         获取路由由当前安装的url路径
    req.cookies         cookies
    req.fresh           判断请求是否还新鲜
    req.hostname        获取主机名
    req.ip              获取ip地址
    req.originalUrl     获取原始请求url
    req.path            获取请求路径
    req.protocol        获取协议类型
    req.route           获取当前匹配的路由
    req.subdomains      获取子域名
    req.accpets()       获取请求的Accept头的请求类型
    req.acceptsCharsets/acceptsEncodings/acceptsLanguages
    req.get()           获取指定的http请求头
    req.is()            判断请求头的Content-Type的MIME类型
    
## 1.5 中间件：类似于拦截器

       1.概念：是一个位于客户端和路由直接的函数（app.js中的app.use()都可称为中间件），
               可以访问请求对象和响应对象，也可以调用下一个中间件，express就是一个由中间件构成的框架 
       2.分类：
            应用级中间件
            内置中间件：静态文件设置
            第三方中间件:app.use(第三方)->例如文件上传中间件
                cnpm i multer  --save
           
## 1.6.路由介绍

    -basic      合并的基础知识
    -bin        执行文件
    -download   模板文件-待下载
    -logs       日志
    -mongo      MongoDB介绍
    -routes
        news -- 空的，暂时没用
        excelappend         excel文件追加行
        generate            node接口生成工具类
        test                测试
        utils               工具类     
        index.js            mongo      
    -schdule    定时测试

# 2.node启动部署

## 2.1 启动

      ***java启动：**************************************************************
      chmod 777 mss-api.jar 
      nohup java -jar mss-api.jar --server.port=8088 >> mss.log  2>& 1 &
      tail -f mss.log 
    
      ***node后台启动:*******************************************************************
       nohup command & node www & 
       nohup command & node ./bin/www & 
       nohup node ./bin/www >> mss.log  2>& 1 &

## 2.2 forever启动

    npm i -g forever
    
    　　forever可以看做是一个nodejs的守护进程，能够启动，停止，重启我们的app应用。
    
    1.全局安装 forever
    // 记得加-g，forever要求安装到全局环境下 
    sudo npm install forever -g
    2.启动
    复制代码
    // 1. 简单的启动 
    forever start app.js 
    
    // 2. 指定forever信息输出文件，当然，默认它会放到~/.forever/forever.log 
    forever start -l forever.log app.js 
    
    // 3. 指定app.js中的日志信息和错误日志输出文件， 
    // -o 就是console.log输出的信息，-e 就是console.error输出的信息 
    forever start -o out.log -e err.log app.js 
    
    // 4. 追加日志，forever默认是不能覆盖上次的启动日志， 
    // 所以如果第二次启动不加-a，则会不让运行 
    forever start -l forever.log -a app.js 
    
    // 5. 监听当前文件夹下的所有文件改动 
    forever start -w app.js 
    复制代码
    3.文件改动监听并自动重启
    // 1. 监听当前文件夹下的所有文件改动（不太建议这样） 
    forever start -w app.js 
    4. 显示所有运行的服务
    forever list 
    5. 停止操作
    复制代码
    // 1. 停止所有运行的node App 
    forever stopall 
    
    // 2. 停止其中一个node App 
    forever stop app.js 
    // 当然还可以这样 
    // forever list 找到对应的id，然后： 
    forever stop [id] 
    复制代码
    6.重启操作
    重启操作跟停止操作保持一致。
    // 1. 启动所有 
    forever restartall
