const express = require('express');
const router = express.Router();
const apiUtil = require('../utils/apiUtil');

/* GET home page. */
router.get('/test', function(req, res, next) {
  //引用模板index.ejs
  res.render('index', { title: '测试路由' });
});

//http://localhost:3000/test/news.html
router.get('/news.html', function(req, res, next) {
  //数据返回
  res.send('<h1>新闻列表</h1>');
});

//http://localhost:3000/test/news.html
router.get('/jsonData', function(req, res, next) {
  //数据返回
  res.send(apiUtil.responseResult(res,true,null,null,{"id":18}));
});

module.exports = router;
