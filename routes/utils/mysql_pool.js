let mysql = require("mysql");
let async = require("async");

let debug = false
/**
 * 测试
 * @type {Pool}
 */
let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'xxx',
    port: 3306
});
let logPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'xxx',
    port: 3306
});


function execLog(sql, options, callback) {
    if (debug) {
        console.log("log sql:" + sql + " === " + options);
    }
    logPool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, options, function (err, results, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(err, results, fields);
            });
        }
    });
};

function query(sql, options, callback) {
    if (debug) {
        console.log("sql:" + sql + " === " + options);
    }
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, options, function (err, results, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(err, results, fields);
            });
        }
    });
};

function getNewSqlParamEntity(sql, params, callback) {
    if (callback) {
        return callback(null, {
            sql: sql,
            params: params
        });
    }
    return {
        sql: sql,
        params: params
    };
}


function execTrans(sqlparamsEntities, callback) {
    console.log('sqlparamsEntities:', sqlparamsEntities);

    pool.getConnection(function (err, connection) {
        if (err) {
            return callback(err, null);
        }
        connection.beginTransaction(function (err) {
            if (err) {
                return callback(err, null);
            }
            console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
            var funcAry = [];
            sqlparamsEntities.forEach(function (sql_param) {
                var temp = function (cb) {
                    var sql = sql_param.sql;
                    var param = sql_param.params;
                    connection.query(sql, param, function (tErr, rows, fields) {
                        if (tErr) {
                            connection.rollback(function () {
                                console.log("事务失败，sql:" + sql +'param:'+param+ "，ERROR：" + tErr);
                                // throw tErr;
                                return cb(tErr, null);
                            });
                        } else {
                            return cb(null, rows);
                        }
                    })
                };
                funcAry.push(temp);
            });

            async.series(funcAry, function (err, result) {
                console.log("transaction error1: " + err);
                if (err) {
                    connection.rollback(function (errback) {
                        console.log("transaction error2: " + errback);
                        connection.release();
                        return callback(err, null);
                    });
                } else {
                    connection.commit(function (err, info) {
                        console.log("transaction info: " + JSON.stringify(info));
                        if (err) {
                            console.log("执行事务失败，" + err);
                            connection.rollback(function (err) {
                                console.log("transaction error: " + err);
                                connection.release();
                                return callback(err, null);
                            });
                        } else {
                            connection.release();
                            return callback(null, info);
                        }
                    })
                }
            })
        });
    });
}
const getList =(sql,param,callback)=>{
    if(!sql || !/(?<=\bSELECT\b\s).*?(?=\s\bFROM\b)/is.test(sql)){
        console.log("sql格式不正确");
        callback("sql格式不正确",null);
        return ;
    }
    let qc = param.pop();
    let qi = param.pop();
    let countSql =sql.replace(/(?<=\bSELECT\b\s).*\)*.*?(?=\s\bFROM\b)/is,"count(0) count")
        .replace(/(?=\bORDER\sby\b\s).*/is,'')
        .replace(/(?=\blimit\b\s).*/is,'')
    // console.log('countSql:',countSql);
    if(/GROUP\sby/is.test(countSql)){
        countSql = `select count(0) count from ( ${countSql} ) a`
    }
    query(countSql,param,(err,data)=>{

        if(err){
            callback(err,null);
        }else{
            let obj = {};
            let count = data[0].count;
            obj.count = count;
            if(count>0){
                param.push(qi,qc);
                query(sql,param,(err,data1)=>{
                    if(err){
                        callback(err,null)
                    }else {
                        obj.data=data1;
                        callback(null,obj)
                    }
                });
            }else{
                obj.data=[];
                callback(null,obj)
            }

        }
    });

}
exports.query = query;
exports.getNewSqlParamEntity = getNewSqlParamEntity;
exports.execTrans = execTrans;
exports.getList = getList;
exports.execLog = execLog;
