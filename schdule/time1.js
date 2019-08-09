/**
 *
 * 1.同步任务总是更早执行:            5
 * 2.本轮循环执行：
 *      process.nextTick最先执行      3
 *      Promise 紧接                  4
 * 3.次轮循环执行：
 *      1
 *      2
 */


setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
(() => console.log(5))();
