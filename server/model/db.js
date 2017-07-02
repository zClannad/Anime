// import mongoose from "mongoose"
var mongoose = require("mongoose")

var db = mongoose.createConnection('mongodb://localhost:27017/dongman')
db.once('open', function () {
  console.log("数据库打开成功")
})

module.exports = db