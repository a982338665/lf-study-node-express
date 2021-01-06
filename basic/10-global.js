
const testVar = 1000;

//暴露全局 对象 所有js 不使用require引用即可使用
global.testVar2 = 200;

// 需引用require才能使用
module.exports.testVar = testVar;