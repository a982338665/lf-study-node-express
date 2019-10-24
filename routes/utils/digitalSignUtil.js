const NodeRSA = require('node-rsa');
const BASE64 = 'base64';
const UTF8 = 'utf8'
const pkcsSize = 512;
const str = '服务端测试 -> miaomiaomiao~~~';


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
 * 私钥数据签名
 * @param str
 */
function dataPrivateSign(str, name, pri) {
    let privateKey = new NodeRSA({b: pkcsSize});
    // 2.导入 私钥，并指定使用 pkcs标准，pem格式
    privateKey.importKey(pri, name);
    let signedData = privateKey.sign(Buffer.from(str), BASE64,BASE64).toString(BASE64);
    // let signedData = privateKey.encryptPrivate(str, BASE64, UTF8);
    console.log('\n使用私钥签名:', signedData);
    return signedData;
}

/**
 * 公钥验签
 * @param str
 */
function dataPubVerifySign(str, rsaStr, name, pub) {
    // 1.创建RSA对象，并指定 秘钥长度
    var publicKey = new NodeRSA({ b: pkcsSize });
    // 2.导入 公钥，并指定使用 pkcs标准，pem格式
    publicKey.importKey(pub,name);
    let result = publicKey.verify(Buffer.from(str), rsaStr, BASE64, BASE64);
    console.log('\n验签：\n', result);
    return result;
}

function test() {
    let generateKeyPairobj = generateKeyPair('pkcs8', 'miaowenjuan', 'yueke');
    console.error(JSON.stringify(generateKeyPairobj));
    let namePri = generateKeyPairobj.namePri;
    let namePub = generateKeyPairobj.namePub;
    let publicPem = generateKeyPairobj.publicPem;
    let privatePem = generateKeyPairobj.privatePem;

    let dataPrivateSign1 = dataPrivateSign('1212', namePri, privatePem);
    console.error(dataPubVerifySign('1212', dataPrivateSign1, namePub, publicPem))

}

test();
