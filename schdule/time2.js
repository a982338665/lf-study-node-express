/**
 *  全部process.nextTick的回调函数，执行都会早于Promise
 *  所以结果为：循环 3 2 4
 */
process.nextTick(
    () =>
    {
        for (let i = 0; i < 20; i++) {
            console.log("+++++++s"+i)
        }
    }
);
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));