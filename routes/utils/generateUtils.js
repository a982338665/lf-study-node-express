const db = require('./mysql_pool');

/**
 * 修改信息 - 代码生成工具类
 * sql -> 修改sql：
 *  使用以下方式查询
 *      SELECT
 CONCAT('update ',TABLE_NAME,' set ',GROUP_CONCAT(CONCAT(COLUMN_NAME,'=?') SEPARATOR ",")) as `sql`,
 COUNT(0) FROM information_schema.COLUMNS
 WHERE TABLE_SCHEMA = 'cdc' AND TABLE_NAME = 't_s_person';
 *interfaceName -> 接口名称
 * desc -> 接口描述
 */
function f(sql, interfaceName, desc) {

    console.error(`
        const express = require('express');
        const router = express.Router();
        
        //===============================需要引入的通用内容
        const apiUtil = require('../utils/apiUtil')
        const dbHelp = require('../utils/dbhelp');
        const util = require('../utils/util');
        const db = require('../utils/mysql_pool');
        const logger = require('log4js').getLogger("request");
    `)
    let arr = sql.split(" ");
    let tableName = arr[1];
    let strarr = arr[arr.length - 1].split(",");
    let sqlupdate = arr[0] + " " + arr[1] + ' ' + arr[2] + " id=id ";
    let sqlupdateVal = '';
    let paraConent = ''
    let updateVAalue = '';
    strarr.forEach((v, i) => {
        let volume = v.split("=")[0];
        if (volume != 'id') {
            updateVAalue += volume + ","
            if (volume == 'update_user') {
                paraConent = paraConent + `\n 
              let ${volume} = usercode;
              if (!util.isNull(${volume})) {
                  sql = sql + \`,${volume}=? \`;
                  params.push(${volume});
              }
            `
            } else if (volume == 'update_time') {
                paraConent = paraConent + `\n 
              let ${volume} = new Date();
              if (!util.isNull(${volume})) {
                  sql = sql + \`,${volume}=? \`;
                  params.push(${volume});
              }
            `
            } else {
                paraConent = paraConent + `\n 
              let ${volume} = req.body.${volume};
              if (!util.isNull(${volume})) {
                  sql = sql + \`,${volume}=? \`;
                  params.push(${volume});
              }
            `
            }
        }
        if (i == strarr.length - 1) {
            paraConent = paraConent + `
            sql = (sql.substring(sql.length - 1) == ',') ? sql.substring(0, sql.length - 1) : sql
            sql = sql + ' where id=? '`
            updateVAalue = (updateVAalue.substring(updateVAalue.length - 1) == ',') ? updateVAalue.substring(0, updateVAalue.length - 1) : updateVAalue
        }
    })
    let para = `
    /**
     *  ${desc}
     *  可修改的值：${updateVAalue}
     */
    router.post('/${interfaceName}', function (req, res) {
        let usercode = req.headers.usercode;
        let orgcode = req.headers.orgcode;
        let id = req.body.id;
        util.verifyParams([usercode, orgcode, id], (result) => {
            if (result == 0) {
                apiUtil.responseResult(res, false, 300, '缺少必要参数!', null);
            } else {
                let sqlParamsEntity = [];
                let params = [];
    `;
    para = para + "\n let sql = \`" + sqlupdate + '\`'
    // para = para + "\n let sql = \`" + sqlupdate + '\`'
    para = para + paraConent;
    para = para + `  
            params.push(id);
            sqlParamsEntity.push(db.getNewSqlParamEntity(sql, params));
            dbHelp.execTransRes(sqlParamsEntity, res);
        }
    });
});`
    console.error(para)
    console.error('//*****************************************************************************************************')
    let deleteSql = `
    /* 
     *删除 
     */
    router.post('/delete', function (req, response, next) {
    logger.info(req.originalUrl + " --- " + JSON.stringify(req.body));
    let id = req.body.ids;
    if (util.isNull(id)) {
        apiUtil.responseResult(response, false, 300, "缺少参数", null);
        return;
    }
    let sql = "DELETE from ${tableName} where id in (";
    let options = [];
    if (id instanceof Array) {
        id.forEach(function (item, index) {
            options.push(item)
            sql += '?,';
            if (id.length - 1 == index) {
                sql = sql.substring(0, sql.length - 1);
            }
        });
        sql = sql + ")"
    }
    db.query(sql, options, function (err, results, fields) {
        if (err) {
            apiUtil.responseResult(response, false, 301, "系统异常:" + err, null);
        } else {
            let obj = new Object();
            apiUtil.responseResult(response, true, 0, "", obj); //查询成功
        }
    });
});
    `
    console.error(deleteSql)
    console.error('//*****************************************************************************************************')
    let first = `
    /**
     * 新增
     * 字段：${updateVAalue}
     */
    router.post('/insert', function (req, response, next) {
        logger.info(req.originalUrl + " --- " + JSON.stringify(req.body));
        let usercode = req.headers.usercode;
        let orgcode = req.headers.orgcode;
        let sql = "insert into t_s_person(";
        let params = [];`
    let middle = ''
    let ziduan = updateVAalue.split(",")
    ziduan.forEach((volume, i) => {
        if (volume == 'create_user') {
            middle = middle + `\n 
              let ${volume} = usercode;
              if (!util.isNull(${volume})) {
                  sql = sql + \`${volume},\`;
                  params.push(${volume});
              }
            `
        } else if (volume == 'create_time') {
            middle = middle + `\n 
              let ${volume} = new Date();
              if (!util.isNull(${volume})) {
                  sql = sql + \`${volume},\`;
                  params.push(${volume});
              }
            `
        } else {
            middle = middle + `\n 
              let ${volume} = req.body.${volume};
              if (!util.isNull(${volume})) {
                  sql = sql + \`${volume},\`;
                  params.push(${volume});
              }
            `
        }
        if (i == ziduan.length - 1) {
            middle = middle + `
            sql = (sql.substring(sql.length - 1) == ',') ? sql.substring(0, sql.length - 1) : sql
            sql = sql + ') values (';
            
            let lengthStr = params.length;
            for (let i = 0; i <= lengthStr; i++) {
                if(i==lengthStr){
                    sql = (sql.substring(sql.length - 1) == ',') ? sql.substring(0, sql.length - 1) : sql
                    sql = sql + ');';
                }else{
                    sql = sql+"?,";
                }
            }
            `

            // updateVAalue = (updateVAalue.substring(updateVAalue.length - 1) == ',') ? updateVAalue.substring(0, updateVAalue.length - 1) : updateVAalue
        }
    })

    let last = `
    \n
    db.query(sql, params, function (err, results, fields) {
        if (err) {
            apiUtil.responseResult(response, false, 301, "系统异常:" + err, null);
        } else {
            let obj = new Object();
            apiUtil.responseResult(response, true, 0, "", obj); //查询成功
        }
    });
});`

    let finalSql = first + middle + last
    console.error(finalSql)

}

/**
 * 修改信息 - 代码生成工具类
 * taleName
 * interfaceName -> 接口名称
 * desc -> 接口描述
 */
function f2(dataSourceName, taleName, interfaceName, desc) {
    db.query(`SELECT
         CONCAT('update ',TABLE_NAME,' set ',GROUP_CONCAT(CONCAT(COLUMN_NAME,'=?') SEPARATOR ",")) as \`sql\`,
         COUNT(0) FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = "` + dataSourceName + `" AND TABLE_NAME = '` + taleName + "'", [], (err, data) => {
        // console.error(data)
        f(data[0].sql, interfaceName, desc)
        console.error('//*******************}}}}}}}}}}}}}}}}}}}}}}**********************************************************************************')
        db.query(`SELECT
       CONCAT('{',GROUP_CONCAT(CONCAT('"',COLUMN_NAME,'":0') SEPARATOR ","),'}') val,
       COUNT(0) FROM information_schema.COLUMNS
WHERE  TABLE_SCHEMA = "` + dataSourceName + `" AND TABLE_NAME = '` + taleName + "'", [], (err, data) => {
            console.error('//' + data[0].val)
        });
    });

}


// f('update t_s_person set id=?,sample_code=?,sample_type=?,gender=?,name=?,age=?,cardid=?,phone=?,\nsample_date=?,' +
//     'sample_addr=?,source=?,is_collect=?,others=?,update_user=?,update_time=?,org_code=?,import_batch=?,xuekangti=?,danshuangshiji=?', 'updatePerson', '修改信息');
/**
 * create table test.test(
 id int(11),
 name VARCHAR(25),
 deptId int (11),
 salary FLOAT
 );
 */
f2('test', 'test', 'update', '描述')
