
/*!
加载模块时，其所有内容均会被执行
D:\git-20181009\node-muke-basic>node 2-common-require.js
this is a module!
100
100
 */
const mod = require('./1-common-exports');

console.log(mod.testVar);

mod.testFn();