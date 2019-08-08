const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
  //引用模板index.ejs
  res.render('index', { title: '测试路由' });
});

module.exports = router;
