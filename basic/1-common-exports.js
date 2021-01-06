console.log('this is a module!');

const testVar = 100;

function test() {
    console.log(testVar);
};

//对外暴露属性
module.exports.testVar = testVar;
//对外暴露方法
module.exports.testFn = test;