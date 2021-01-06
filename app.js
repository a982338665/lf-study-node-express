const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');//npm install body-parser --save

/**************************设置nodejs路由对应的文件***************************/
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test/index');
const testParamsRouter = require('./routes/test/test-param');
const newsRouter = require('./routes/news/news');
const generateRouter = require('./routes/generate/generate');
const excelappendRouter = require('./routes/excelappend/excelappend');

const app = express();
/******************express配置模板视图**********************************/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎及模板根目录
// app.engine('html',ejs.__express); //设置视图为html引擎，ejs在页面仍然可用
// app.set('view engine', 'html');//设置视图为html引擎，ejs在页面仍然可用
app.set('view engine', 'ejs');

/******************引入要使用的模块**********************************************/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//设置静态文件目录：每个应用都可以设置多个静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
/*************************拦截器：即中间件**************************************/
/**
 * 不符合条件的可在此处拦截:
 * next之前在接口调用之前拦截
 * next之后在接口调用之后拦截
 */
app.use((req, res, next) => {
    console.log('执行中间件...-> 必须调用尾函数next才能进入下一个中间件：');
    next();
    console.log('res:' + res.statusCode);
    const fs = require('fs');
    let ip = req.ip;
    let time = new Date().toLocaleString();
    let path = __dirname+"/logs/login.txt";
    let log = "访问时间:"+time+"|IP:"+ip+"|response:"+res.statusCode+"\n";
    fs.writeFile(path,log,{flag:'a'},(err)=>{
    });
    // console.log('res:' + res.statusMessage);
    // console.log('res:' + res.socket.remoteAddress);
    // console.log('res:' + res.socket.remotePort);
    // console.log('finished！');
});
// app.use((req, res, next) => {
//     console.log('正在执行...');
//     next();
// });
// app.use(function (req, res, next) {
//     let url = req.originalUrl;//获取浏览器中当前访问的nodejs路由地址；
//     let userCookies=req.cookies.userCookies;
//     //获取客户端存取的cookie,userCookies为cookie的名称；
//     // 有时拿不到cookie值，可能是因为拦截器位置放错，获取该cookie的方式是依赖于nodejs自带的cookie模块，
//     // 因此，获取cookie必须在1,2步之后才能使用，否则拿到的cookie就是undefined.
//     console.log("123"+url);
//     console.log("app获得cookie"+req.cookies.userCookies+"真假11111："+(req.cookies.userCookies==undefined));
//
//     if(url=='/login'&&!(userCookies==undefined)){ //通过判断控制用户登录后不能访问登录页面；
//         return res.redirect('/');//页面重定向；
//     }
//     next();
// });
/*********************************node路由配置**********************************/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/testParams', testParamsRouter);
app.use('/generateRouter', generateRouter);
app.use('/excelappend', excelappendRouter);
// app.use('/news', newsRouter);

/*******************************捕获异常***********************************/
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
