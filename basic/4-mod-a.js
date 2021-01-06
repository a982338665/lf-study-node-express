
module.exports.test = "A";

const modB = require('./5-mod-b');

console.log('A: - '+modB.test);

module.exports.test = "AA";
