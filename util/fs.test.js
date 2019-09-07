
const fshe = require('./fsHelp');

async function fn(){
    await fshe.dirExists('./2018/a/b');
}

fn();