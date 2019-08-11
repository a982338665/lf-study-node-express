
#mongodb

**1.基本概述:**
    
    关系型数据库：mysql,oracle,db2等
    非关系型数据库：nosql mongodb(文档数据库)，redis，memcached，HBase
        
**2.mongodb(文档数据库)：**

    1.json格式存放
    2.常用于超大规模的存储，数据无需固定模式便可横向扩展
    3.基于分布式文件存储的数据库，由c++编写，为web应用提供高性能可拓展的数据存储解决方案
    4.目前使用最多的非关系型数据库
    5.特点：高性能，易部署，易使用
        ·面向集合存储，易存储对象类型的数据
        ·模式自由
        ·支持动态查询
        ·只会完全索引，包含内部对象
        ·支持查询
        ·支持复制和故障恢复
        ·使用高效的二进制数据存储，包括大型对象，例如视频等
        ·自动处理碎片，以支持云计算存储的拓展性
        ·支持RUBY，python，java，php等语言
        ·文件存储格式为Bson，一种json的拓展
            BSON一种类似于json的二进制形式的存储格式，简称Binary JSON
            同json一样支持内嵌的文档对象和数据对象，但也支持json中没有的，如Date，BinDate二进制日期类型
            特点：轻量，可遍历，高效

**3.非关系型数据库和关系型数据库的对比：**

    非关系：
        1.性能高
        2.可拓展性
    关系：
        3.复杂查询
        4.事务支持
        
**4.安装mongodb：安装包百度网盘：20190811-soft下**

**5.目录介绍及安装使用：**
    
    1.安装位置：D:\install-soft\mongodb
    2.bin目录：
        ·mongo.exe          使用数据库
        ·mongod.exe         开启服务
        ·mongodump.exe      备份
        ·mongoexport.exe    导出
        ·mongoimport.exe    导入
        ·mongorestore.exe   还原
    3.设置环境变量：
    4.自定义安装会自动挂载在windows下成为server：
        查看位置：我的电脑->右键管理->服务和应用程序->服务双击->找到mongo点击开启
    5.启动测试服务：
        1.创建数据存放目录：mkdir D:\install-soft\mongodb\data
        2.启动服务：mongod --dbpath D:\install-soft\mongodb\data
        3.连接服务：mongo
    5.手动配置为windows服务：
        1.创建数据存放目录：mkdir D:\install-soft\mongodb\data
        2.创建日志文件目录：mkdir D:\install-soft\mongodb\log
        3.使用文件或直接配置：
            1.使用文件：创建文件 D:\install-soft\mongodb\mongod.cfg
                systemLog:
                    destination: file
                    path: D:\install-soft\mongodb\log
                storage:
                    dbPath: D:\install-soft\mongodb\data
        4.安装：以管理员身份运行cmd
            1.使用文件：mongod --config "D:\install-soft\mongodb\mongod.cfg" --install
            2.使用备用dbpath：mongod --dbpath "D:\install-soft\mongodb\data" --logpath "D:\install-soft\mongodb\log" --install --serviceName "MongoDB"
        5.开启服务：
            1.我的电脑->右键管理->服务和应用程序->服务双击->找到mongo点击开启
            2.命令：
                net start MongoDB
                net stop MongoDB
                mongod --remove 移除 MongoDB 服务
                sc delete mongodb 卸载服务
        6.连接：mongo
        

     