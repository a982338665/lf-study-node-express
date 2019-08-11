
**1.基本命令：**

    1.进入：cmd ：mongo
    2.退出：cmd ：exit
    
**2.命令:**

    1.数据库命令：
        >help                   获取帮助
        >show dbs               显示所有数据库列表
        >use 数据库名           如果数据库存在则进入，如果不存在则创建
        >db                     查看当前数据库
        >db.dropDatabase()      删除当前使用的数据库 需要在执行db后确认要删除的数据库
        >db.runCommand({"dropDatabase":1}) 删除当前数据库，1代表当前
    2.集合命令：
        1.删除：
            db.users.remove({})             删除users集合下的所有数据
            db.users.remove({"name":"li"}); 删除users集合下name=li的数据
            db.users.drop()                 删除集合users
            db.runCommand({"drop":"users"}) 删除集合users
        2.显示所有集合：show collections
        3.创建集合并新增数据：db.集合名.insert({})
     3.文档命令：数据操作
        1.新增：两种方式新增后均会生成一个默认_id
            db.users.insert({"id":"12"});   直接新增
            db.users.save({"id":"12"});     不存在则新增，存在则更新,更新时需要传入默认生成的那个id，一般不建议使用
        2.查看：
            db.集合名.find()                查看集合中所有数据
            db.集合名.find().pretty()       查看集合中所有数据并将其格式化json格式易辨识
            db.集合名.find({"id":"12"})     查看集合中符合条件的数据
            db.集合名.findOne()             查询集合中的第一条数据
            db.集合名.findOne({"id":"12"})  查询集合中的满足条件的第一条数据
        3.修改：
            db.集合名.update({"name":"li"},{"age":"11"})   此种修改方式会全部替换，不会只修改age字段，也就是说，修改完之后该数据仅剩"age":"11"和自动生成的id
            db.集合名.update({"name":"li"},{$set:{"age":"11"}})   局部更新:修改当前数据中符和条件数据中的age字段的内容
        4.删除:
            db.users.remove({})             删除users集合下的所有数据
            db.users.remove({"name":"li"})  删除指定数据
        
**3.高级命令：**

        1.大于：       db.集合名.find({"字段名":{$gt:值}})
        2.小于：       db.集合名.find({"字段名":{$lt:值}})
        3.不等于：     db.集合名.find({"字段名":{$ne:值}})
        3.大于等于：   db.集合名.find({"字段名":{$gte:值}})             
        4.小于等于：   db.集合名.find({"字段名":{$lte:值}})
        5.范围：       db.集合名.find({"字段名":{$gt:值1,$lt:值2}})    
        6.指定范围：         db.集合名.find({"字段名":{$in:[值1，值2，值3]}}) 等同于mysql中的in    
        7.指定不在范围：     db.集合名.find({"字段名":{$nin:[值1，值2，值3]}}) 等同于mysql中的 not in
        8.数组字段的大小：   db.集合名.find({"字段名":{$size:数量}})    查询此集合中某数组字段的长度为多少的 集合
        9.字段是否存在       db.集合名.find({"字段名":{$exists:true|false}})
        10.或者              db.集合名.find({$or:[{"name":"li"},{"name":"wang"}]})  查询name=li或name=wang的数据
        11.并且同时满足      db.集合名.find({"name":"li","age":"18"})     两个条件同时满足
        12.排序              db.集合名.find({}).sort({"字段名1":1,"字段名2":-1})   1升序 -1降序 先按字段名1，再按字段名2
        13.分页：限定输出    db.集合名.find({}).sort({"age":1}).limit(3).skip(3)  排序后跳过前三条显示后3条，常用于分页，skip与limit不分先后
        13.分页：            db.集合名.find({}).sort({"age":1}).limit(page).skip((page-1)*amount) 表示page页，每页amount条
        14.模糊查询-正则     db.集合名.find({"name":/li/i})  模糊查询name包含li的数据：i表示不区分大小写                         