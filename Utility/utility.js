var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

var encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, 'abcd').toString();
}

var decrypt = (encryptedtext) => {
    var bytes = CryptoJS.AES.decrypt(encryptedtext, 'abcd');
    return bytes.toString(CryptoJS.enc.Utf8);
}
var JWTgenerateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY)
}

var JWTDecodeToken = (data) => {
    return jwt.verify(data, process.env.JWT_SECRET_KEY)
}

module.exports = { encrypt, decrypt, JWTgenerateToken,JWTDecodeToken };
