var mongoose = require("mongoose")
var db = require("./db")
// var md5 = require("./md5")


var administratorSchema = new mongoose.Schema({
  user:{ type: String, index: true,unique: true},
  pass:String,
  email:String
})

// 管理员登录的静态方法
administratorSchema.statics.login = function(user,callback){
  this.model("administrator").findOne({user:user},'pass',callback)
}

var administrator = db.model("administrator",administratorSchema)

// 创建一个账户
// administrator.create({
//   user:'admin',
//   pass:md5(12345),
//   email:'719462227@qq.com'
// },function(err){
//   if(err){
//     console.log("失败")
//     return
//   }console.log("成功")
// })

module.exports = administrator
