const db = require('./mysql_pool');
const apiUtil = require('./apiUtil');

/**
 * 执行事务并响应成功
 * @param sqlParamsEntity
 * @param res
 */
function execTransRes(sqlParamsEntity, res) {
    db.execTrans(sqlParamsEntity, (err, data) => {
        if (err) {
            apiUtil.responseResult(res, false, 302, err, null);
        } else {
            apiUtil.responseResult(res, true, 0, "", null);
        }
    });
}

/**
 * 执行事务并响应成功
 * @param sqlParamsEntity
 * @param res
 */
function execErrorTransRes(sqlParamsEntity, res,msg) {
    db.execTrans(sqlParamsEntity, (err, data) => {
        if (err) {
            if (err.code == 'ER_DUP_ENTRY') {
                apiUtil.responseResult(res, false, 301, msg, null);
            } else {
                apiUtil.responseResult(res, false, 301, "系统异常！" + err, null);
            }
        } else {
            apiUtil.responseResult(res, true, 0, msg, msg);
        }
    });
}

/**
 * 执行查询并响应成功
 * @param sqlParamsEntity
 * @param res
 */
function execQueryRes(insertSql, params, res) {
    db.query(insertSql, params, (err, data) => {
        if (err) {
            apiUtil.responseResult(res, false, 301, "系统异常，数据库执行失败:" + err, null);
        } else {
            apiUtil.responseResult(res, true, 0, "", data);
        }
    });
}

/**
 * 执行查询并响应成功
 * @param sqlParamsEntity
 * @param res
 */
function execQueryErrorMsgRes(insertSql, params, res, msg) {
    db.query(insertSql, params, (err, data) => {
        if (err) {
            if (err.code == 'ER_DUP_ENTRY') {
                apiUtil.responseResult(res, false, 301, msg, null);
            } else {
                apiUtil.responseResult(res, false, 301, "系统异常！" + err, null);
            }
        } else {
            apiUtil.responseResult(res, true, 0, "", data);
        }
    });
}

/**
 * 执行分页查询并响应成功
 * @param sqlParamsEntity
 * @param res
 */
function execGetListRes(verifysql, param, res) {
    db.getList(verifysql, param, (err, data) => {
        if (err) {
            apiUtil.responseResult(res, false, 0, err, null);
        } else {
            apiUtil.responseResult(res, true, 0, "", data);
        }
    })
}

exports.execTransRes = execTransRes;
exports.execQueryRes = execQueryRes;
exports.execGetListRes = execGetListRes;
exports.execQueryErrorMsgRes = execQueryErrorMsgRes;
exports.execErrorTransRes = execErrorTransRes;
