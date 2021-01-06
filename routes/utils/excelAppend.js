const exceljs = require('exceljs');
const moment = require('moment');


function dealExcel(workbook, data, obj) {
    let worksheet = workbook.getWorksheet(1);
    let lastRow = worksheet.lastRow;
    let num = lastRow.number
    data.forEach((v, i) => {
        num = num + 1
        let getRowInsert = worksheet.getRow(num);
        for (let v2 in obj) {

            //此处取每一列对应索要的字段值
            let key = v2
            let field = obj[v2].field


            //时间类型转换
            let dateFormat = obj[v2].date
            //类型转换，例如数据库存储的为1或2分别代表 男和女，那么此处就会按照规则将其转换为男和女导出
            //基本规则格式为【数据库值=导出值@数据库值=导出值@数据库值=导出值】
            //@为分隔符
            //取转换规则
            let convertType = obj[v2].convertType;

            if (dateFormat && dateFormat.length > 0) {
                let stringFormat = moment(v[field]).format(dateFormat);
                getRowInsert.getCell(key).value = stringFormat;
            } else if (convertType && convertType.length > 0) {
                let convertTypeArr = convertType.split('@');
                convertTypeArr.forEach((v3, i3) => {
                    if (v3 != '') {
                        let duiyinArr = v3.split('=')
                        let key1 = duiyinArr[0]
                        let val1 = duiyinArr[1]
                        if (key1 == v[field]) {
                            console.error(key1, '========', v[field])
                            getRowInsert.getCell(key).value = val1
                            return;
                        }
                    } else {
                        getRowInsert.getCell(key).value = v[field]
                    }
                })
            } else {
                getRowInsert.getCell(key).value = v[field]
            }
        }
        getRowInsert.commit();
    });
}

/**
 * 读取文件后，追加行，生成新文件
 * @param data    要追加的数据
 * @param obj     追加的字段对应关系和规则指定
 * @param isReadPath    要读的文件path
 * @param isWritePath   要写出的文件path
 */
let readExcel = function (data, rule, isReadPath, isWritePath) {
    let nameFileExcel = isReadPath
    console.error(nameFileExcel)
    let nameFileExcelLast = isWritePath
    let workbook = new exceljs.Workbook();
    workbook.xlsx.readFile(nameFileExcel)
        .then(function () {
            dealExcel(workbook, data, rule);
            return workbook.xlsx.writeFile(nameFileExcelLast);
        });
};


/**
 *
 * @param data        要追加的数据
 * @param res         response用来响应到浏览器
 * @param obj         追加的字段对应关系和规则指定
 * @param isReadPath  要读的文件path
 * @param fileName    响应到浏览器的文件名称
 */
let exportExcel = function (data, res, rule, isReadPath,fileName) {
    let nameFileExcel = isReadPath
    var workbook = new exceljs.Workbook();
    workbook.xlsx.readFile(nameFileExcel)
        .then(function () {
            dealExcel(workbook, data, rule);
            //写出浏览器======================================== 来自于官网
            res.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
            res.setHeader("Content-Disposition", "attachment; filename=" + encodeURIComponent(fileName));
            workbook.xlsx.writeBuffer().then(r => {
                res.end(r);
            });
        });
};

exports.readExcel = readExcel;
exports.exportExcel = exportExcel;

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
let isWritePath = __dirname + '/../../download/result3.xlsx'
// readExcel(data, rule, isReadPath, isWritePath)

// exportExcel(data,null, rule,isReadPath,'result.xlsx')
