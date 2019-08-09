const express = require('express');
const router = express.Router();


/**
 * 参数解析:get请求传参数
 * http://localhost:3000/testParams/params.html/23?id=10
 * 路径参数匹配 及 查询参数获取
 */
router.get('/params.html/:id', function (req, res, next) {
    let id = req.query.id;
    //以下两种为匹配路径参数
    // let id1 = req.param("id");//此方法已为弃用
    let id2 = req.params.id;
    res.send('<h1>' + id + '|' + id2 + '</h1>');
});
/**
 * 参数解析:post请求传参数  form表单提交
 * http://localhost:3000/testParams/post
 * Content-Type:application/x-www-form-urlencoded
 *"username":"hhh",
 * "pwd":"xxx"
 * 或者：
 * Content-Type:application/json
 * {"username":"hhh","pwd":"xxx"}
 */
router.post('/post', function (req, res, next) {
    let id = req.body.username;
    let id1 = req.body.pwd;
    res.send('<h1>' + id + '|' + id1 + '</h1>');
});


module.exports = router;
