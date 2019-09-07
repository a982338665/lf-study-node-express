
const fsHelp = require('../util/fsHelp');

async function fn(){
    await fsHelp.dirExists(__dirname+'/../logs/init');
}

function init() {
    //1.创建日志文件夹
    let promise = fn();
    console.error("make logs success!")

};


exports.init= init ;