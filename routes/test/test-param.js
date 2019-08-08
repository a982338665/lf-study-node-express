const express = require('express');
const router = express.Router();


/**
 * 参数解析:get请求传参数
 * http://localhost:3000/testParams/params.html/23?id=10
 */
router.get('/params.html/:id1', function (req, res, next) {
    let id = req.query.id;
    let id1 = req.param("id1");
    res.send('<h1>' + id + '|' + id1 + '</h1>');
});
/**
 * 参数解析:post请求传参数  form表单提交
 * http://localhost:3000/testParams/post
 * Content-Type:application/x-www-form-urlencoded
 */
router.post('/post', function (req, res, next) {
    let id = req.body.username;
    let id1 = req.body.pwd;
    res.send('<h1>' + id + '|' + id1 + '</h1>');
});


module.exports = router;
