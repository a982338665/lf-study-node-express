const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/**************************设置nodejs路由对应的文件***************************/
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test/index');
const testNextRouter = require('./routes/test/test-next');

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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
/*************************拦截器**************************************/
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
app.use('/testNext', testNextRouter);

/*******************************捕获异常***********************************/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
