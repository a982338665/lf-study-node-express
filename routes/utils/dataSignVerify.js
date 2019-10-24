const NodeRSA = require('node-rsa');
const BASE64 = 'base64';
const pkcsSize = 512;
const signConf = require('./generateKeyPair').signConf;


/**
 * 公钥验签
 * @param str
 */
function dataPubVerifySign(str, rsaStr, name, pub) {
    // 1.创建RSA对象，并指定 秘钥长度
    var publicKey = new NodeRSA({b: pkcsSize});
    // 2.导入 公钥，并指定使用 pkcs标准，pem格式
    publicKey.importKey(pub, name);
    let result = publicKey.verify(Buffer.from(str), rsaStr, BASE64, BASE64);
    console.log('\n验签：\n', result);
    return result;
}

/**
 * 对外暴露验签
 * @param str
 * @returns {string}
 */
function ExportDataPubVerifySign(str,rasStr) {
    return dataPubVerifySign(str, rasStr, signConf.namePub, signConf.publicPem);
}

exports.ExportDataPubVerifySign = ExportDataPubVerifySign;
