// 引入数据库
const mysql = require('mysql');
// 普通连接方式
var db = mysql.createConnection({
    host: '127.0.0.1', // 数据库地址
    port: '3306',
    user: 'root',    // 数据库用户名
    password: 'root', // 密码
    database: 'psychology', // 数据库名
    // multipleStatements: true, // 注意node.js中，mysql默认是不允许一次性同时执行多条sql语句的
});
db.connect((err) => {   
    err ? console.log("数据库连接失败！",err) : console.log("数据库连接成功！",db.query);
});
module.exports = db;
