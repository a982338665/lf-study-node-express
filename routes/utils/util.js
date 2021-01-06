var UUID = require('uuid');
var moment = require('moment');

/**
 * Get a random number
 *
 * @return {number}
 * @public
 */
function getVcode() {
    return Math.round(Math.random() * 99999) + "";
}

function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

/**
 * 判断是否null
 * @param data
 */
function isNull(data) {
    return (data == "" || data == undefined || data == null) ? true : false;
}

/**
 * 验证参数
 * @param params
 * @param callback
 */
function verifyParams(params,callback) {
    let nullValue = [];
    params.forEach((v) => {
        if (isNull(v)) {
            nullValue.push(v);
        }
    });
    if(nullValue.length == 0){
        callback(1);
    }else{
        callback(0);
    }
}


/**
 * 验证参数 同步返回
 * @param params
 * @param callback
 * 通过验证返回true 未通过返回false
 */
function isPassVerifyParams(params) {
    let nullValue = [];
    params.forEach((v) => {
        if (isNull(v)) {
            nullValue.push(v);
        }
    });
    if (nullValue.length == 0) {
        return true;
    } else {
        return false;
    }
}

function md5(str) {
    var crypto = require('crypto');
    var md5 = crypto.createHash('md5');

    var result = md5.update(str).digest('hex');
    return result;
}

function uuid() {
    var uuid = UUID.v1();
    uuid = uuid.replace(/-/g, '');
    return uuid;
}

function encryption(str) {
    var str1 = str.substring(11) + str.substring(0, 11);

    return str1.split("").reverse().join("");
}

//获取当前日期前多少天
function getLastDate(count) {
    var dates = [];
    var _today = moment();
    dates.push(_today.format('YYYY-MM-DD'));//今天的日期
    for (var i = count; i > 0; i--) {
        dates.push(_today.subtract(1, 'days').format('YYYY-MM-DD'));
        /*前一天的时间*/
    }
    return dates;
}

//获取当前日期前多少天
function getLastDateFormatDD(count) {
    var dates = [];
    var _today = moment();
    dates.push(_today.format('MM-DD'));//今天的日期
    for (var i = count; i > 0; i--) {
        dates.push(_today.subtract(1, 'days').format('MM-DD'));
        /*前一天的时间*/
    }
    dates = dates.reverse();
    return dates;
}

//获取当前日期前多少天
function getThisMonthDate() {
    var dates = [];
    var _today = moment();
    var month = _today.format('MM');
    var today = _today.format('YYYY-MM');
    var days = moment(today, "YYYY-MM").daysInMonth(); // 天数

    for (var i = 1; i <= days; i++) {
        var day = '' + i;
        if (i < 10) {
            day = '0' + i;
        }
        dates.push(day);
        /*前一天的时间*/
    }
    return dates;
}

//获取当前日期前多少天
function getYearAllMonth() {
    var dates = [];
    dates.push('01');
    dates.push('02');
    dates.push('03');
    dates.push('04');
    dates.push('05');
    dates.push('06');
    dates.push('07');
    dates.push('08');
    dates.push('09');
    dates.push('10');
    dates.push('11');
    dates.push('12');
    return dates;
}

function getAllHours() {
    var dates = [];
    dates.push('00');
    dates.push('01');
    dates.push('02');
    dates.push('03');
    dates.push('04');
    dates.push('05');
    dates.push('06');
    dates.push('07');
    dates.push('08');
    dates.push('09');
    dates.push('10');
    dates.push('11');
    dates.push('12');
    dates.push('13');
    dates.push('14');
    dates.push('15');
    dates.push('16');
    dates.push('17');
    dates.push('18');
    dates.push('19');
    dates.push('20');
    dates.push('21');
    dates.push('22');
    dates.push('23');
    return dates;
}

function getRandom(s) {
    let Num = '';
    for (var i = 0; i < s; i++) {
        Num += Math.floor(Math.random() * 10);
    } 
    return Num;
}

exports.getVcode = getVcode;
exports.isEmptyObject = isEmptyObject;
exports.isNull = isNull;
exports.md5 = md5;
exports.uuid = uuid;
exports.encryption = encryption;
exports.getLastDate = getLastDate;
exports.getLastDateFormatDD = getLastDateFormatDD;
exports.getThisMonthDate = getThisMonthDate;
exports.getYearAllMonth = getYearAllMonth;
exports.getAllHours = getAllHours;
exports.getRandom = getRandom;
exports.verifyParams = verifyParams;
exports.isPassVerifyParams = isPassVerifyParams;
