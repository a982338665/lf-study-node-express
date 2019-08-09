/**
 * 由于setTimeout在 timers 阶段执行，
 * setImmediate在 check 阶段执行。所以，setTimeout会早于setImmediate完成
 *
 * 实际执行的时候，结果却是不确定，有时还会先输出2，再输出1:
 *
 * Node 做不到0毫秒，最少也需要1毫秒，根据官方文档，第二个参数的取值范围在1毫秒到2147483647毫秒之间。
 * 也就是说，setTimeout(f, 0)等同于setTimeout(f, 1)。
 * 实际执行的时候，进入事件循环以后，有可能到了1毫秒，也可能还没到1毫秒，取决于系统当时的状况。
 * 如果没到1毫秒，那么 timers 阶段就会跳过，进入 check 阶段，先执行setImmediate的回调函数
 */
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
