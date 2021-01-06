# node-muke-basic
**0.idea编译js无法使用require():**

    1.在Node中开启Node.js Core library
    settings->Languages & Frameworks->Node.js Core library设置成enable
    2.在JS中开启Node.js Core library
    settings->Languages & Frameworks->JavaScript->Libraries,将Node.js Core前的enable选中
    
**1.学习内容：**

    1.nodejs 原理
    2.基础api
    3.静态资源服务器
    4.代码本地构建
    5.单元测试
    6.ui测试
    7.headless爬虫
    
**2.技术栈:**

    1.nodejs
    2.http
   
**3.学习前提：**

    1.了解js es6语法
    2.简单使用命令行工具
    3.了解http协议

**4.课程大纲：**

    1.`nodejs介绍`
    2.调试 & 项目初始化
    3.基础API
    4.简单web server
    5.单元测试 & 发布
    6.nodejs 爬虫示例

**5.node 优势：**
    
    1.js开发
    2.在处理高并发，i/o密集场景性能优势明显
        
**6.I/O密集 与 CPU密集：**

    1.cpu密集：程序大多用来做计算或逻辑判断 - 压缩，解压，加密，解密
    2.IO密集：程序大多用来做网络操作，磁盘读取 - 文件操作，网络操作，数据库
    
**7.web常见场景:**

    1.静态资源读取
    2.数据库操作
    3.渲染页面 - 读取模板
    因为web经常会用到IO 故IO密集
    
**8.高并发：**

    1.增加机器
    2.增加每台机器cpu (多核)

**9.nodejs的单进程，单线程:**

    1.cpu几核 就启动几个进程，不会浪费性能
    
**10.常用场景：**

    1.web server
    2.本地代码构建
    3.实用工具开发 ——> 小爬虫
    
**11.环境，调试：**

    1.LTS -> 长期稳定版
    2.CommonJS -> nodejs的模块规范
        1.每一个文件都是一个模块，有自己的作用域
        2.模块内部 module变量代表模块本身
        3.module.exports 属性代表模块对外接口
    3.global -> 全局对象
    4.process -> 当前执行进程

**12.require规则:**

    1./表示绝对路径,./表示相对于当前文件
    2.支持js ，json，node拓展名，若在require中不写拓展名 ，则会依次尝试查找
    3.require里不写路径，则会认为是build-in模块或者各级node_modules内的第三方模块
    
**13.require特性：**

    1.module被加载时候执行，加载后缓存 --> 3-common-require-cache.js
    2.一旦出现某模块被循环加载，就只输出已经执行的部分，还未执行的部分不会被输出(代码中应该避免此现象) 6-mod-mian.js

**14.常用命令：**

    1.npm install <module>      安装模块-当前项目
    2.npm install <module> -g   安装模块-全局
    3.npm root -g               查看全局 npm 安装的模块的根目录
    4.npm init -y               初始化项目
    
    
    
