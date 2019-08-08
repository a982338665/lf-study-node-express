
//json数据返回封装util

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
    //合并以下内容直接返回json数据：
    // let returnData = JSON.stringify(result);
    // console.log("返回结果："+JSON.stringify(returnData));
    // res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8'});
    // res.end(returnData);
    res.json(result);
}

function responseResult2(res, isSuccess, errorCode, errorMessage, jsonObject) {
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
    //合并以下内容直接返回json数据：
    let returnData = JSON.stringify(result);
    console.log("返回结果："+JSON.stringify(returnData));
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8'});
    res.end(returnData);
}

exports.responseResult = responseResult;
exports.responseResult2 = responseResult2;