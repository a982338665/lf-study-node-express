
module.exports.test = "B";

const modA = require('./4-mod-a');

console.log('B: - '+modA.test);

module.exports.test = "BB";
