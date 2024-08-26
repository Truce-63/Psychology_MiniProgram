var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// 改写, 从bin目录下剪切代码过来 , 然后就可以删除bin目录了
var http = require('http');
var server = http.createServer(app);
var cors = require('cors')
app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
// module.exports = app;  改写之后这里就不用暴露出去了 ，直接在下面写一个监听端口
server.listen(6008,()=>{
  console.log("服务器启动成功！");
});
