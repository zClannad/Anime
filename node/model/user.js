const mongoose = require('mongoose')
const db = require('./db')
const md5 = require('./md5')

const userSchema = new mongoose.Schema({
  user:{ type: String, index: true,unique: true},
  pass:String,
  email:String
})

userSchema.statics.login = function(user,cb){
  this.model('user').findOne({user:user},'pass',cb)
}

const user = db.model('user',userSchema)

// user.create({
//   user:'张明志',
//   pass:md5('52082216'),
//   email:'719462227@qq.com'
// },function(err){
//   if(err){
//     console.log(err)
//   }else{
//     console.log('成功')
//   }
// })

module.exports = user
