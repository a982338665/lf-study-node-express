# node-express
express

**1.express项目初始化：**

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
        
**2.项目目录说明：**

    bin             --可执行文件目录
        www         --可执行文件，一般是项目入口
    node_modules    --依赖包目录
    public          --静态文件根目录(所有静态文件：html/css/js/png/mp4/字体等,可直接访问)
    routes          --路由模块目录(动态文件目录) -> 优先找静态文件public/,再找静态文件
    views           --视图目录:用来存放所有的ejs模板
    app.js          --项目主文件：对所有资源进行统筹
    package.json    --项目描述文件
    
**3.响应对象res:**

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
    
**4.请求对象req:**

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
    
**5.中间件：类似于拦截器**

       1.概念：是一个位于客户端和路由直接的函数（app.js中的app.use()都可称为中间件），
               可以访问请求对象和响应对象，也可以调用下一个中间件，express就是一个由中间件构成的框架 
       2.分类：
            应用级中间件
            内置中间件：静态文件设置
            第三方中间件:app.use(第三方)->例如文件上传中间件
                cnpm i multer  --save
           
**6.路由介绍**
    
    news -- 空的，暂时没用
    excelappend         excel文件追加行
    generate            node接口生成工具类
    test                测试
    utils               工具类     
    index.js            mongo      
