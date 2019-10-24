const NodeRSA = require('node-rsa');
const BASE64 = 'base64';
const pkcsSize = 512;
const signConf = require('./generateKeyPair').signConf;

/**
 * 私钥数据签名
 * @param str
 */
function dataPrivateSign(str, name, pri) {
    let privateKey = new NodeRSA({b: pkcsSize});
    // 2.导入 私钥，并指定使用 pkcs标准，pem格式
    privateKey.importKey(pri, name);
    let signedData = privateKey.sign(Buffer.from(str), BASE64, BASE64).toString(BASE64);
    // let signedData = privateKey.encryptPrivate(str, BASE64, UTF8);
    console.log('\n使用私钥签名:', signedData);
    return signedData;
}


/**
 * 对外暴露加签
 * @param str
 * @returns {string}
 */
function exportDataPrivateSign(str) {
    return dataPrivateSign(str, signConf.namePri, signConf.privatePem);
}


exports.exportDataPrivateSign = exportDataPrivateSign;
