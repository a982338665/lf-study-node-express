

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
