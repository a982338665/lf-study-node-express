var bytenode = require('bytenode');
var fs = require('fs');
var path = require("path");

/**
 * 排除在外不编译的文件夹
 * @type {*[]}
 */
const noComplierOutPutFile = ['compile.js','README.md','nodejs的Logj.md','nodejs设置process.env.PORT的值的命令.md','node接口excel追加.md','node接口生成工具类.md'];
const noComplierOutPutDirectory = ['dist', '.idea','basic','logs'];
const compilerFile = ['./dist/routes','./dist/promise', './dist/views','./dist/schdule','./dist/bin/server'];

fs.exists('./dist', exist => {
    if (exist) {
        delDir('./dist');
    }
    fs.mkdirSync('./dist');
})

// 拷贝目录到 dist 下
fs.readdir('./', (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    for (var i = 0; i < files.length; i++) {
        var stat = fs.statSync('./' + files[i]);
        if (stat.isFile()) {
            if (noComplierOutPutFile.indexOf(files[i]) == -1) {
                fs.writeFileSync('./dist/' + files[i], fs.readFileSync('./' + files[i]));
            }
        } else if (stat.isDirectory()) {
            if (noComplierOutPutDirectory.indexOf(files[i]) == -1) {
                createDocs('./' + files[i], './dist/' + files[i], function () {

                })
            }
        } else {

        }
    }

    compileFile()
})

function compileFile() {
    // 编译 app.js 为字节码
    bytenode.compileFile({
        filename: './dist/app.js'
    });
    fs.unlinkSync('./dist/app.js');

    compilerFile.forEach((v) => {
        compileDir(v);
    })

    // 编译 filters/routes/services 目录下的js文件为字节码
    // compileDir('./dist/filters');
    // compileDir('./dist/routes');
    // compileDir('./dist/services');
    // compileDir('./dist/config');
    // compileDir('./dist/config');
}

function compileDir(dir) {
    var stat = fs.statSync(dir);
    if (stat.isFile() && dir.indexOf('.js') != -1 && dir.indexOf('.json') == -1 ) {
        console.error('===============================', dir)
        // 文件，直接转换
        bytenode.compileFile({
            filename: dir
        });
        fs.unlinkSync(dir);
    } else if (stat.isDirectory()) {
        // 目录，列出文件列表，循环处理
        var files = fs.readdirSync(dir);
        for (var i = 0; i < files.length; i++) {
            var file = dir + '/' + files[i];
            compileDir(file);
        }
    } else {

    }
}

//递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            console.log("mkdirsSync = " + dirname);
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

function _copy(src, dist) {
    var paths = fs.readdirSync(src)
    paths.forEach(function (p) {
        var _src = src + '/' + p;
        var _dist = dist + '/' + p;
        var stat = fs.statSync(_src)
        if (stat.isFile()) {// 判断是文件还是目录
            fs.writeFileSync(_dist, fs.readFileSync(_src));
        } else if (stat.isDirectory()) {
            copyDir(_src, _dist)// 当是目录是，递归复制
        }
    })
}

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist) {
    var b = fs.existsSync(dist)
    console.log("dist = " + dist)
    if (!b) {
        console.log("mk dist = ", dist)
        mkdirsSync(dist);//创建目录
    }
    console.log("_copy start")
    _copy(src, dist);
}

function createDocs(src, dist, callback) {
    console.log("createDocs...")
    copyDir(src, dist);
    console.log("copyDir finish exec callback")
    if (callback) {
        callback();
    }
}

function delDir(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}
