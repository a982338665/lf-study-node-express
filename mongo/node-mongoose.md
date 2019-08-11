
**1.mongoose：node的依赖模块**

    CURD:create新增 update修改 read读取 delete删除
    
**2.安装使用：**

    1.安装：npm/cnpm i mongoose  
    2.使用：引入
        const mongoose = require('mongoose');
        mongoose.connect("mongodb://127.0.0.1:27017/app",(err) => {
            if(err){
                throw err;
            }else{
                console.log("mongoServer is running!");
            }
        });
    3.定义骨架：即集合结构
        String,
        Number,
        Date,
        Buffer,二进制
        Boolean,
        Mixed,混合类型
        ObjectId,自动生成的id
        Array
    
    