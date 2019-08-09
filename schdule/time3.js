const fs = require('fs');
/**
 * 1.timers  2.I/O callbacks  3.idle, 4.prepare poll 5.check  6.close callbacks
 * 进入事件循环之前：1.同步任务 2.发出异步请求 3.规划定时器生效的时间 4.执行process.nextTick()等等
 * 第一轮事件循环：没有到期定时器，没有可执行的IO回调，读取小文件<=100ms,得到结果继续向下执行
 * 第二轮事件循环：依然没有到期的定时器，但是已经有了可以执行的 I/O 回调函数，进入回调函数执行，该回调函数至少需要200ms,
 *                 即它执行到一半的时候，100ms 的定时器就会到期，但是，必须等到这个回调函数执行完，才会离开这个阶段，打印数据
 * 第三轮事件循环：已经有了到期的定时器，所以会在 timers 阶段执行定时器。最后输出结果>=200ms。
 * 综上所述：读取文件的时间如果在100ms内，则会先执行IO的异步回调，而定时器则会等待异步回调执行完后再继续执行
 * @type {number}
 */
const timeoutScheduled = Date.now();

// 异步任务一：100ms 后执行的定时器
setTimeout(() => {
    const delay = Date.now() - timeoutScheduled;
    console.log(`${delay}ms`);
}, 100);

// 异步任务二：
// 文件读取后，执行一个用时 200ms 的回调函数
// 这样才能保证，readfile阻塞了事件循环，导致setTimeout没有按时执行回调函数
fs.readFile('./file.txt', () => {
    const startCallback = Date.now();
    console.log('==='+(startCallback - timeoutScheduled));
    while (Date.now() - startCallback < 200) {
        // 什么也不做
    }
    console.log('xxx');
});