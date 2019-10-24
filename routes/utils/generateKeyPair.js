const NodeRSA = require('node-rsa');
const BASE64 = 'base64';
const pkcsSize = 512;

const conf = {
        "namePub": "pkcs8-miaowenjuan",
        "namePri": "pkcs8-yueke",
        "publicPem": "-----BEGIN PRIVATE KEY-----\nMIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEA4SlLE/bIChwOFf2b\nWKpwwNshKRFpXcGi3Z9LURJ5ns8fjRNjQQBV2FRkHH7Uo+lenDDk3nkSXGtWQRg/\n9c1tAQIDAQABAkB/gNq7G2x8DRcM7OgjdaEUFQLaNrnsFdMcnTARYNzuSFu8HwFS\nwc4JGdDRVqG+x6uOg3h7tnTWj/2hYVsJiLVhAiEA/pKCCwVuSlDOzH+WyajcRCzh\n8sPIGZsvh1S8Ek9GbhsCIQDibI9D6afIPVrr6avtCI/DehN2xeFdUjmETfz0danT\nEwIhAOBCJicZWKhE+Xgy6Z2qkKfKNh2LFQphqAP6xFcI2Q2DAiBnEthdKB7TDus2\n/dbgPseDSy1VIlunaej5C6+dcXrvtQIgbdySI8DKHQYYZhUUjzIvTlcrcg7Eju4l\nfDBT+3LJ8K8=\n-----END PRIVATE KEY-----",
        "privatePem": "-----BEGIN PRIVATE KEY-----\nMIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEA4SlLE/bIChwOFf2b\nWKpwwNshKRFpXcGi3Z9LURJ5ns8fjRNjQQBV2FRkHH7Uo+lenDDk3nkSXGtWQRg/\n9c1tAQIDAQABAkB/gNq7G2x8DRcM7OgjdaEUFQLaNrnsFdMcnTARYNzuSFu8HwFS\nwc4JGdDRVqG+x6uOg3h7tnTWj/2hYVsJiLVhAiEA/pKCCwVuSlDOzH+WyajcRCzh\n8sPIGZsvh1S8Ek9GbhsCIQDibI9D6afIPVrr6avtCI/DehN2xeFdUjmETfz0danT\nEwIhAOBCJicZWKhE+Xgy6Z2qkKfKNh2LFQphqAP6xFcI2Q2DAiBnEthdKB7TDus2\n/dbgPseDSy1VIlunaej5C6+dcXrvtQIgbdySI8DKHQYYZhUUjzIvTlcrcg7Eju4l\nfDBT+3LJ8K8=\n-----END PRIVATE KEY-----"
    }
;

/**
 * 生成密钥对
 * 传入公司name：www.yushang
 * @param name:指定格式 pkcs8
 *
 */
function generateKeyPair(name, namePub, namePri) {
    // 1.创建RSA对象，并指定 秘钥长度
    let key = new NodeRSA({b: pkcsSize});
    key.setOptions({encryptionScheme: 'pkcs1'});//指定加密格式
    // 2.生成 公钥私钥，使用 pkcs8标准，pem格式
    namePub = name + '-' + namePub;
    namePri = name + '-' + namePri;
    let publicPem = key.exportKey(namePub);//制定输出格式
    let privatePem = key.exportKey(namePri);
    console.log(name + '公钥:\n', publicPem);
    console.log(name + '私钥:\n', privatePem);
    return {
        namePub: namePub,
        namePri: namePri,
        publicPem: publicPem,
        privatePem: privatePem
    };
}

/**
 * 生成公私钥作为配置文件在顶部，然后注释以下代码，导出配置
 * @type {{namePub: *, publicPem: *, privatePem: *, namePri: *}}
 */
// let generateKeyPair1 = generateKeyPair('pkcs8', 'miaowenjuan', 'yueke');
// console.error(generateKeyPair1);

exports.signConf = conf;
