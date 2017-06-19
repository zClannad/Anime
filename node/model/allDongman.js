// import mongoose from "mongoose"
// import db from"./db"
var mongoose = require("mongoose")
var db = require("./db")

var allDongmanSchema = new mongoose.Schema({
  // 动漫名
  name: { type: String, index: true, unique: true },
  // 类别
  leibie: String,
  // 图片名
  imgname: String,
  // 标签
  biaoqian: [String],
  // 年代
  niandai: Number,
  // 简介
  jianjie: String,
  // 评分
  pingfen: Number,
  // 是否显示在首页
  show: { type: Boolean, default: true },
  // 创建时间
  createTime: { type: Date, default: Date.now },
  // 评论
  comment: [{
    user: String,
    content: String,
    time: { type: Date, default: Date.now }
  }]
}, { collection: 'alldongman' })

// 根据页码获得动漫数据
allDongmanSchema.statics.queryPage = function (page, callback) {
  //过滤的条数
  var filter = (page - 1) * 8;
  return this.model('allDongman').find({}, callback).sort({ 'createTime': -1 }).skip(filter).limit(8);
}

//获得动漫的总条数
allDongmanSchema.statics.getcount = function (callback) {
  return this.model("allDongman").count({}, callback)
}

// 根据条件修改数据
allDongmanSchema.statics.updmdate = function (tiaojian, shuju, callback) {
  return this.model("allDongman").update(tiaojian, { $set: shuju }, {}, callback)
}

// 根据id删除数据
allDongmanSchema.statics.deletedm = function (id, callback) {
  return this.model("allDongman").remove({ _id: id }, callback)
}

// 查询数据（条件，查什么，查询个数，第几页，排序）
allDongmanSchema.statics.queryData = function (tiaojian, chashenme, num, page, paixu, callback) {
  //过滤的条数
  var filter = (page - 1) * num;
  return this.model('allDongman').find(tiaojian, chashenme, callback).sort(paixu).skip(filter).limit(num);
  // return this.model('allDongman').find(tiaojian, callback).
  // select(chashenme).sort({ paixu: -1 }).skip(filter).limit(num);
}
// 添加评论
allDongmanSchema.statics.tjComment = function(name,obj,cb){
  return this.model('allDongman').update(name,{
    $push:{
      comment:obj
    }
  },cb)
}
// 集合绑定结构
var allDongman = db.model("allDongman", allDongmanSchema)
// allDongman.create({
//   name:"声形",
//   leibie:'dianing',
//   biaoqian:['青春','恋爱'],
//   niandai:2017,
//   jianjie:"《声之形》是由日本漫画家大今良时创作的漫画作品， 故事主题是没法用声音交流来传达自己的想法， 故事以男主角石田将也的视角出发， 讲述一位患有听力障碍的女生西宫硝子在学校备受霸凌， 得不到友情和关爱，后来男主良心发现，帮助她找到幸福。",
//   pingfen:'8.8',
//   show:false
// },function(err){
//   console.log(err)})
module.exports = allDongman
