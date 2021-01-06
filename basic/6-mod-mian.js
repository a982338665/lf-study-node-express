
const modA = require('./4-mod-a');
const modB = require('./5-mod-b');

console.log(modA.test);
console.log(modB.test);
/*!
    解释：
    1.依赖模块A，进入执行
        module.exports.test = "A";  //初始化test
        const modB = require('./5-mod-b');
        -- 依赖模块B，进入执行
            module.exports.test = "B";  //赋值test
            const modB = require('./4-mod-a');  //此时开始循环调用了 就只输出已经执行的部分，还未执行的部分不会被输出
            -- 依赖模块A，找到已执行部分 即
                module.exports.test = "A";  //此为A中已执行部分，未执行部分不会输出，
            -- 回到模块B，往下执行
            console.log('B: - '+modA.test);//此时打印内容为 B: - A
            module.exports.test = "BB";    //重新赋值test
        -- 回到模块A，继续执行，此时已执行完完整的模块B
        console.log('A: - '+modB.test); //由于test 被重新赋值为BB，此时打印应为 A: - BB
        module.exports.test = "AA";
    2.依赖模块B，进入执行：
         //此时开始循环调用了 就只输出已经执行的部分，还未执行的部分不会被输出
         即执行内容只有
         module.exports.test = "BB";  //赋值test
         console.log(modA.test);    //AA
         console.log(modB.test);    //BB
    3.即最后打印结果为:
        B: - A
        A: - BB
        AA
        BB
 */