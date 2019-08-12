
const fs = require('fs');
const util = require('util');
const readAsync = util.promisify(fs.readFile);

async function init() {
    try {
        let data = await readAsync('./package.json');
        let data2 = await readAsync('./package.json');
        let data3 = await readAsync('./package.json');
        data = JSON.parse(data);
        data = JSON.parse(data2);
        data = JSON.parse(data3);
        console.log(data);
        return data;
    }catch (e) {
        console.log(e);
        return e;
    }
}

init();
// console.log("----"+data);