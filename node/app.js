var express = require("express")
var app = express()
var session = require("express-session")
var router = require("./router/router")

// 设置允许跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200); //让options请求快速返回
  }
  else {
    next();
  }
});

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
  // 好像好https
  // cookie: { secure: true }
}))

//添加数据
app.get("/add", router.add)
//上传图片
app.post("/upload",router.upload)
//根据页数查询所有动漫数据
app.get('/querypage',router.queryPage)
// 获取动漫数据的总数量
// app.get("/getcount",router.getcount)
// 修改数据
app.get("/update",router.update)
// 删除数据
app.get("/delete",router.deletedm)
// 管理员登录
app.post("/adminlogin",router.adminLogin)
// 用户登录
app.post("/userlogin",router.userlogin)

app.listen(3000)
