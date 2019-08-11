const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//1.连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/app", (err) => {
    if (err) {
        throw err;
    } else {
        console.log("mongoServer is running!");
    }
});
//2.定义骨架:一般名称为 集合名+Schema
const usersSchema = new mongoose.Schema({
    name: String,
    country: String,
    age: Number
});
//3.根据骨架创建模型:参数 模型名称，骨架名称，集合名称   常用于读取数据库
const usersModel = mongoose.model("users", usersSchema, "users");
//4.根据模型创建实体：Entity常用于新增修改删除数据


/* GET home page. */
router.get('/', function (req, res, next) {
    //根据条件查询数据并返回一个Array
    usersModel.find({"age": "18"}, (err, data) => {
        console.log(data);
        // res.send(data);
    });
    //根据id查找返回一条数据为Object
    usersModel.findById("【ObjectId】", (err, data) => {
        console.log(data);
    });
    //另一种方式：可实现链式调用
    usersModel.find({"age": "18"}).skip(1).limit(1).sort(1).exec((err, data) => {
        console.log(data);
        // res.send(data);
    });
    res.render('index', {title: 'Express'});
});

module.exports = router;
