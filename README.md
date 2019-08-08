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

 