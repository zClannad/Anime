var express = require("express")
var app = express()
// var session = require("express-session")
var router = require("./router/router")

var http = require('http').Server(app)
var io = require('socket.io')(http)

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
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
  // 好像好https
  // cookie: { secure: true }
// }))

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
// 用户注册
app.post("/userregister",router.userregister)
// 获得两条今日推荐
app.get("/shouye",router.shouye)
// 获得一条数据的全部信息
app.get("/details",router.details)
// 评论
app.get('/comment',router.comment)

io.on('connection', function(socket){
    //接收
  socket.on('chat', function(msg){
    // console.log('message: ' + msg);
    // 发给所有人
    io.emit('chat', msg);
    // 谁发给服务就发给谁
    // socket.emit('chat', msg);
    //发给除了发给服务器的其他全部人
    // socket.broadcast.emit('chat', msg);
  });
});

http.listen(3000)
