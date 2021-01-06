const express = require('express');
const router = express.Router();

//===============================需要引入的通用内容
const apiUtil = require('../utils/apiUtil')
const dbHelp = require('../utils/dbhelp');
const util = require('../utils/util');
const db = require('../utils/mysql_pool');
const logger = require('log4js').getLogger("request");


/**
 *  描述
 *  可修改的值：name,deptId,salary
 */
router.post('/update', function (req, res) {
  let usercode = req.headers.usercode;
  let orgcode = req.headers.orgcode;
  let id = req.body.id;
  util.verifyParams([usercode, orgcode, id], (result) => {
    if (result == 0) {
      apiUtil.responseResult(res, false, 300, '缺少必要参数!', null);
    } else {
      let sqlParamsEntity = [];
      let params = [];

      let sql = `update test set id=id `

      let name = req.body.name;
      if (!util.isNull(name)) {
        sql = sql + `,name=? `;
        params.push(name);
      }


      let deptId = req.body.deptId;
      if (!util.isNull(deptId)) {
        sql = sql + `,deptId=? `;
        params.push(deptId);
      }


      let salary = req.body.salary;
      if (!util.isNull(salary)) {
        sql = sql + `,salary=? `;
        params.push(salary);
      }

      sql = (sql.substring(sql.length - 1) == ',') ? sql.substring(0, sql.length - 1) : sql
      sql = sql + ' where id=? '
      params.push(id);
      sqlParamsEntity.push(db.getNewSqlParamEntity(sql, params));
      dbHelp.execTransRes(sqlParamsEntity, res);
    }
  });
});
//*****************************************************************************************************

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
  let sql = "DELETE from test where id in (";
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

//*****************************************************************************************************

/**
 * 新增
 * 字段：name,deptId,salary
 */
router.post('/insert', function (req, response, next) {
  logger.info(req.originalUrl + " --- " + JSON.stringify(req.body));
  let usercode = req.headers.usercode;
  let orgcode = req.headers.orgcode;
  let sql = "insert into t_s_person(";
  let params = [];

  let name = req.body.name;
  if (!util.isNull(name)) {
    sql = sql + `name,`;
    params.push(name);
  }


  let deptId = req.body.deptId;
  if (!util.isNull(deptId)) {
    sql = sql + `deptId,`;
    params.push(deptId);
  }


  let salary = req.body.salary;
  if (!util.isNull(salary)) {
    sql = sql + `salary,`;
    params.push(salary);
  }

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



  db.query(sql, params, function (err, results, fields) {
    if (err) {
      apiUtil.responseResult(response, false, 301, "系统异常:" + err, null);
    } else {
      let obj = new Object();
      apiUtil.responseResult(response, true, 0, "", obj); //查询成功
    }
  });
});
//*******************}}}}}}}}}}}}}}}}}}}}}}**********************************************************************************
//{"id":0,"name":0,"deptId":0,"salary":0}
