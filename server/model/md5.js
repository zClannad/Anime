// 加密
var crypto = require("crypto")

module.exports = (data)=>{
  var md5 = crypto.createHash('md5')
  return md5.update(data + '张','utf8').digest('base64')
}
