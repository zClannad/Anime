
var formidable = require("formidable")
var allDongman = require("../model/allDongman")
var administrator = require("../model/administrator")
var user = require('../model/user')
var fs = require("fs")
var path = require("path")
var md5 = require("../model/md5")

// 添加数据
exports.add = function (req, res, next) {
  chuli(req, res);
  // 添加数据
  allDongman.create(req.query, function (err) {
    if (err) {
      res.send('1')
      console.log('添加失败')
      // console.log(err)
    } else {
      res.json({ "name": req.query.name })
      console.log('添加成功')
    }
  })
}
// 处理图片
exports.upload = (req, res, next) => {
  var form = new formidable.IncomingForm();
  // 最大上传2M
  var maxSize = 2 * 1024 * 1024;
  form.encoding = 'utf-8';
  // 设置文件上传存放地址
  form.uploadDir = "./uploads";
  // 保留扩展名
  form.keepExtensions = true;
  //设置单个表单域能申请到的内存值
  form.maxFieldsSize = 2 * 1024 * 1024;
  form.maxFields = 1000;
  // console.log(form);
  // 限制大小
  // form.on('fileBegin', function (name, file) {
  //   if (form.bytesExpected > maxSize) {
  //     this.emit('error', '最大上传2M');
  //   }
  // });
  // // 限制类型
  // form.on('file', function (name, file) {
  //   var type = file.type;
  //   type = type.split('/');
  //   type = type[1];
  //   if (type != 'jpeg' && type != 'png') {
  //     this.emit('error', "只能上传JPG或png");
  //   }
  // });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.send("1")
      console.log("图片上传失败")
      console.log(err)
      return false
    } else {
      // console.log(fields);
      // console.log(files);
      var extname = path.extname(files.file.name)
      // 临时文件
      var oldpath = path.normalize(files.file.path)

      if (files.file.size > maxSize || (files.file.type != 'image/jpeg' && files.file.type != 'image/png')) {
        res.send("1")
        fs.unlink(oldpath)
        // console.log(files.file.type);
        return
      } else {
        // 新文件名 = 动漫名+后缀
        let newfilename = fields.name.trim() + extname
        var newpath = '../static/image/uploads/' + newfilename
        console.warn('oldpath:' + oldpath + '****newpath:' + newpath)

        // 修改或添加图片名
        allDongman.updmdate({ name: fields.name.trim() }, { imgname: newfilename }, function (err) {
          if (err) {
            res.send("1")
            return
          }
          // 移动并改名
          fs.rename(oldpath, newpath, function (err) {
            if (err) {
              console.log("改名失败" + err)
              res.send("1")
              return
            }
            res.send("2")
          })
        })
      }
    }

  })
}
//根据页码查询动漫的所有数据和数据的总条数
exports.queryPage = (req, res, next) => {
  // 存放发给前端的数据
  var sendRes = {}
  allDongman.queryPage(req.query.page, function (err, result1) {
    if (err) {
      res.send('1')
      return
    } else {
      sendRes.result = result1
      allDongman.getcount(function (error, result2) {
        if (error) {
          res.send('1')
          return
        }
        sendRes.count = result2
        res.json(sendRes)
      })
    }
    // res.json({'result':result})
  })
}
// 获得总数
// exports.getcount = (req, res, next) => {
//   allDongman.getcount(function (err, result) {
//     if (err) {
//       res.send('1');
//       return
//     }
//     res.json({ 'count': result })
//   })
// }

// 修改数据
exports.update = (req, res, next) => {
  // console.log(req.query)
  chuli(req, res)
  allDongman.updmdate({ _id: req.query._id }, req.query, function (err, result) {
    if (err) {
      console.log(err)
      res.send("1")
      return
    }
    console.log(result)
    res.json({ "name": req.query.name })
  })
  // res.send("1");
}

// 删除数据
exports.deletedm = (req, res, next) => {
  allDongman.deletedm(req.query.id, function (err) {
    if (err) {
      res.send("1")
      return
    }
    res.send("2")
  })
}

//处理从前端发过来的数据
function chuli(req, res) {
  req.query.niandai = parseInt(req.query.niandai);
  if (req.query.pingfen) {
    req.query.pingfen = parseFloat(req.query.pingfen)
    //评分最大为10
    if (req.query.pingfen > 10) {
      req.send('1')
      return
    }
  }
  //去掉两边空格
  req.query.name = req.query.name.trim();
}

// 管理员登录
exports.adminLogin = (req, res, next) => {
  login(req, res, next, administrator)
}

// 用户登录
exports.userlogin = (req, res, next) => {
  login(req, res, next, user)
}

// 管理员和用户登录的验证，第4个参数为集合名
function login(req, res, next, jihe) {
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.send('1')
      return
    }
    // console.log(req.query)
    // console.log(fields)
    // console.log(files)
    fields.user = fields.user.trim()
    jihe.login(fields.user, function (err, result) {
      if (err) {
        res.send('1')
        return
      }
      // console.log(result )
      if (!result || !result.pass) {
        res.send('1')
        return
      }
      if (result.pass == md5(fields.pass)) {
        // req.session.login = true;
        res.json(fields.user)
        console.log(fields.user, result.pass)
      } else {
        res.send('1')
      }
    })
  })
}
// 用户注册
exports.userregister = (req, res, next) => {
  var form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.send('1')
      return
    }
    console.log(fields)
    // res.send('哈哈')
    fields.user = fields.user.trim()
    fields.pass = fields.user.trim()
    fields.email = fields.email.trim()
    user.queryUser(fields.user, (err, result) => {
      if (err) {
        res.send('1')
        return
      }
      if (result) {
        res.send('2')
      } else {
        user.create({
          user: fields.user,
          pass: md5(fields.pass),
          email: fields.email
        }, function (err) {
          if (err) {
            res.send('1')
            return
          }
          res.send(fields.user)
        })
      }
    })
  })
}
// 连载中数据
exports.shouye = (req, res, next) => {
  // console.log(req.query)
  queryData(req, res, next, req.query.biaoti)
}
// 用于取前台首页的函数
function queryData(req, res, next, leibie) {
  // 用存储发给前台的数据
  let shuju = {}
  allDongman.queryData({ 'leibie': leibie, 'show': true }, { 'name': 1, 'imgname': 1 }, 8, 1, { "createTime": -1 }, function (err, result1) {
    if (err) {
      console.log(err)
      shuju.xianshi = ''
    } else {
      // console.log(result1)
      // res.send(result1)
      shuju.xianshi = result1
    }
    allDongman.queryData({ 'leibie': leibie, 'show': true }, { 'name': 1, 'pingfen': 1 }, 10, 1, { "pingfen": -1 }, function (err, result2) {
      if (err) {
        console.log(err)
        shuju.paihan = ''
      } else {
        shuju.paihan = result2
      }
      res.send(shuju)
    })
  })
}
exports.details = (req, res, next) => {
  let dmname = req.query.name.trim();
  if (dmname) {
    allDongman.queryData({ 'name': dmname }, {}, 1, 1, {}, function (err, result) {
      if (err) {
        res.send('1');
        return
      }
      // console.log(result[0])
      res.send(result[0])
    })
  } else {
    res.send('1')
  }
}
exports.comment = (req, res, next) => {
  let name = req.query.name.trim()
  let user = req.query.user.trim()
  let content = req.query.content.trim()
  if (!(name && user && content)) {
    res.send('1')
    return
  }
  allDongman.tjComment({ name }, { user, content }, function (err, result) {
    if (err) {
      res.send('1')
      return
    }
    console.log(result)
    res.send('2')
  })
}
