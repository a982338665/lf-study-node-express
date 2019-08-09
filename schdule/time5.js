const fs = require('fs');

/**
 * 以下代码一定会先输出 22 然后 21
 * 1.timers  2.I/O callbacks  3.idle, 4.prepare poll 5.check  6.close callbacks
 * 进入回调函数之后是处于事件循环的第二步，
 * 接着会进入第五步check：执行setImmediate
 * 然后进入下次循环，重新进入第一步执行 setTimeout
 */
fs.readFile('test.js', () => {
    setTimeout(() => console.log(11));
    setImmediate(() => console.log(22));
});