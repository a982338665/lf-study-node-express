const express = require('express');
const router = express.Router();
const excel = require('../utils/excelAppend')


router.get('/get', function (req, res, next) {

    let rule = {
        'A': {'field': 'id'},          //要追加的行的第一列（A）的字段值（field）
        'B': {'field': 'update_time', 'date': 'YYYY-MM-DD HH:mm:ss'}, //要追加行的第二列（B）的字段值（field）,指定要转换的时间格式
        'C': {'field': 'type', 'convertType': '1=男@2=女'}
    } //要追加行的第二列（C）的字段值（field），含转换规则，若该字段等于1，则导出转化为男，同理字段等于2则导出为女
    let data = [
        {'id': 1, 'update_time': new Date()}, //追加的第1行数据，包含id，update_time两个字段，时间默认转换格式为 yyyy/MM/dd
        {'id': 2, 'update_time': new Date()}, //追加的第2行数据，包含id，update_time两个字段
        {'id': 3, 'type': 1},                 //追加的第3行数据，包含id，type两个字段 1会被转换为男
        {'id': 4, 'type': 2},                 //追加的第4行数据，包含id，type两个字段 2会被转换为女
        {'id': 4, 'type': 3}]                 //追加的第5行数据，包含id，type两个字段 3没有匹配到规则，为空
    let isReadPath = __dirname + '/../../download/result.xlsx'
    excel.exportExcel(data, res, rule, isReadPath, 'result.xlsx')
});


module.exports = router;
