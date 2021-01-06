/*!
    调试：step in 、step over
    inspector   ：nodejs.org/en/docs/inspector --> 文档包含多种调试方式
    vs code     :
    命令:
    1.node --inspect-brk 13-debug.js --> 在该文件执行之前进行调试
        执行命令后打开谷歌浏览器访问  chrome://inspect/
        在Remote Target下面会发现 要调试文件，打开即可调试
    2.idea调试：
        同 java debug
 */

function test1() {
    const a = parseInt(Math.random() * 10);
    const b = parseInt(Math.random() * 10);
    const c = test2(a, b);
}

function test2(a, b) {
    if (a > b) {
        a += a * 2;
    } else {
        b -= a;
    }
    return a + b;
}

test1();

