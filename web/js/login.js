;
(function () {
    // 判断是否是在登录状态
    function getCookie(key) {
        var arr = document.cookie.split(";");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].split("=")[0] === key) {
                return arr[i].split("=")[1];
            }
        }
    }

    var cookie = getCookie("isLogin");
    if (cookie) {
        console.log(1);
        location.href = "./list.html";
    }

    // 获取元素
    var usernameInp = document.getElementById("username");
    var passwordInp = document.getElementById("password");
    var login_btn = document.getElementById("login_btn");
    var register_btn = document.getElementById("register_btn");

    // 添加注册按钮点击事件
    register_btn.onclick = function (e) {
        e.preventDefault();
        location.href = "./register.html";
    }

    // 添加登录按钮点击事件
    login_btn.onclick = function (e) {
        e.preventDefault();

        // 获取输入框的账号密码
        var username = usernameInp.value;
        var password = passwordInp.value;

        // 发送ajax验证用户名密码是否存在
        res.post("/login", {
            username,
            password
        }, function (data) {
            if (data.error) {
                alert("登陆失败，请检查用户名密码！")
            } else {
                alert("恭喜，登录成功！Have a good time!");
                location.href = "./list.html";
            }
        })



    }
})();