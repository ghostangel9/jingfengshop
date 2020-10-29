// 引入express
var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
// 设置mysql数据库的ip，用户名，密码，数据库名
var mysql_info = {
    host: "118.31.75.249",
    user: "jingfengshop",
    password: "jingfengshop",
    database: "jingfengshop"
}

// express是一个函数，执行之后得到一个服务器
var app = express();

// 静态资源托管
app.use('/web/', express.static('./web'));
// 固定配置
app.use(bodyParser.urlencoded({
    extended: false
}));

// 单独处理 /checkusername----------------------------------------------------------
app.get('/checkusername', function (req, res) {
    // 获取前端提交的数据
    var username = req.query.username;
    // 定义数据库连接
    var connection = mysql.createConnection(mysql_info)
    // 连接数据库
    connection.connect();
    // 数据库查询
    connection.query(`SELECT * FROM user_info WHERE username = "${username}"`, function (err, results, fields) {
        if (results.length === 0) {
            res.send({
                error: 0,
                data: "用户名可以注册"
            })
        } else {
            res.send({
                error: 1,
                data: "用户名已存在"
            })
        }
    });
    // 断开数据库连接
    connection.end();
})

// 单独处理/register-------------------------------------------------------------------------
app.post('/register', function (req, res) {
    // 解构用户名和密码
    var {
        username,
        password
    } = req.body;
    // 定义数据库连接
    var connection = mysql.createConnection(mysql_info)
    // 连接数据库
    connection.connect();
    // 执行查询语句
    connection.query(`INSERT INTO user_info VALUES('${username}','${password}')`, function (err, results, fields) {
        if (err) {
            res.send({
                error: 1,
                data: "注册失败"
            })
        } else {
            res.send({
                error: 0,
                data: "注册成功"
            })
        }
    });
    // 关闭数据库连接
    connection.end();
})

// 单独处理 /login-----------------------------------------------------------------
app.post("/login", function (req, res) {
    var {
        username,
        password
    } = req.body;
    // 建立数据库连接
    var connection = mysql.createConnection(mysql_info)
    // 连接数据库
    connection.connect();
    // 执行查询语句
    connection.query(`SELECT * FROM user_info WHERE username='${username}' and password='${password}'`, function(err, results, fields){
        if(err){
            res.send({
                error: 2,
                data: "数据库查询失败"
            })
        }
        if(results.length === 0){
            res.send({
                error: 1,
                data: "登录失败"
            })
        }else{
            res.cookie("isLogin", "true",{path: "/", maxAge: 3600 * 1000 * 4});
            res.send({
                error: 0,
                data: "登陆成功"
            })
        }
    });
    // 关闭数据库连接
    connection.end();
})

// 单独处理 /list---------------------------------------------------------------------
app.get("/list", function(req, res){
    var {page, num} = req.query;
    // 定义数据库连接
    var connection = mysql.createConnection(mysql_info)
    // 连接数据库
    connection.connect();
    // 执行查询语句
    connection.query(`SELECT * FROM goods limit ${page * num}, ${num}`, function(err, results, fields){
        if(err){
            res.send({
                error: 2,
                data: "查询失败"
            })
        }
        if(results.length === 0){
            res.send({
                error: 1,
                data: "没有更多了"
            })
        }else{
            res.send({
                error: 0,
                data: results
            })
        }
    });
})

// 单独处理 /detail
app.get("/detail", function(req, res){
    var goods_id = req.query.shopID;
    
    // 定义数据库连接
    var connection = mysql.createConnection(mysql_info)

    // 连接数据库
    connection.connect();

    // 执行查询语句
    connection.query(`SELECT * FROM goods WHERE goods_id = '${goods_id}'`, function(err, results, fields){
        if(results.length === 0){
            res.send({
                error: 1,
                data: "查询失败"
            })
        }else{
            res.send({
                error: 0,
                data: results
            })
        }
    })
})


// 监听端口号
app.listen(3000, function () {
    console.log("服务器已经监听了3000端口");
})