

### 主要内容
    
    正常使用的前提：
        npm i mysql --save
        npm i async --save
        npm i moment --save
        npm i uuid --save
        npm i log4js --save
    
    生成console的头部文件--> 目前生成后需要从控制台复制粘贴    
        const apiUtil = require('../utils/apiUtil')
        const dbHelp = require('../utils/dbhelp');
        const util = require('../utils/util');
        const db = require('../utils/mysql_pool');
        const logger = require('log4js').getLogger("request");

    执行获取代码 generateUtils.js 
    添加路由测试执行
        
        curl --location --request POST 'localhost:3000/generateRouter/insert' \
        --header 'Content-Type: application/json' \
        --data-raw '{"name":0,"deptId":0,"salary":0}'
    返回成功
