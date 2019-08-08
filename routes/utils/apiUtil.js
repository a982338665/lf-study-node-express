
//json数据返回封装util
// let logger = require('log4js').getLogger("response");

function responseResult(res, isSuccess, errorCode, errorMessage, jsonObject) {
    // {code: ,errorCode: 0,errorMessage: “”,data:{}}
    let result = new Object();
    let code = 200;//成功
    let msg = "ok";
    if (!isSuccess) {
        code = errorCode;
        msg = errorMessage;
    }
    result.code = code;
    result.msg = msg;
    result.data = jsonObject;
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8'});
    let returnData = JSON.stringify(result);
    // logger.info(msg);
    // console.log("返回结果："+JSON.stringify(result));
    res.end(returnData);
}

exports.responseResult = responseResult;