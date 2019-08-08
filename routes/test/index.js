const express = require('express');
const router = express.Router();
const apiUtil = require('../utils/apiUtil');

/* GET home page. */
router.get('/test', function (req, res, next) {
    //引用模板index.ejs
    res.render('index', {title: '测试路由'});
});

/**
 * //数据返回
 * //http://localhost:3000/test/news.html
 */

router.get('/news.html', function (req, res, next) {
    res.send('<h1>新闻列表</h1>');
});

/**
 * //json数据返回
 * http://localhost:3000/test/news.html
 */
router.get('/jsonData', function (req, res, next) {
    let json = {"id": 15};
    console.log(json["id"]);
    res.redirect('news.html');//重定向内网
    // res.redirect('http://www.baidu.com');//重定向到外部网站
    // res.download('../download/a.txt');//数据下载
    // res.download('../download/a.txt','b.txt');//数据下载并且重命名
    // res.json(json);//自己会设置响应头为json：'Content-Type': 'application/json;charset=utf-8'
    // apiUtil.responseResult2(res,true,null,null,json);//直接调用工具类进行数据返回封装
    // apiUtil.responseResult(res,true,null,null,json);//直接调用工具类进行数据返回封装
    // res.status(200).send(apiUtil.responseResult(res,true,null,null,{"id":18}));//链式调用
    // res.send(1);如果返回数字，会将其作为返回状态码，所以会报错
    // res.send();在单次请求中只能发送一次
});

module.exports = router;
