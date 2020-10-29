;
(function () {
    var usernameInp = document.getElementById("username");
    var passwordInp1 = document.getElementById("password1");
    var passwordInp2 = document.getElementById("password2");
    var register_btn = document.getElementById("register_btn");

    // 设置两个锁
    var userLock = false;
    var passLock = false;

    // 用户名输入框
    usernameInp.onchange = function () {
        // 获取用户名
        var username = usernameInp.value;

        // 定义正则表达式
        var reg = /^[a-zA-Z]\w{3,8}$/;

        // 正则判断用户名
        if (!reg.test(username)) {
            userLock = false;
            usernameInp.style.border = "2px solid red";
            alert("请输入4~9位的用户名，以字母开头，可包含数字、字母、下划线")
            return 0;
        } else {
            usernameInp.style.border = "2px solid green";
        }

        // 检测用户名是否被注册
        // 定义query字符串
        var querystring = "username" + "=" + username;

        res.get("/checkusername", {
            username
        }, function (data) {
            if (data.error) {
                userLock = false;
                usernameInp.style.border = "2px solid red";
                alert(data.data);
                return 0;
            } else {
                usernameInp.style.border = "2px solid green";
                userLock = true;
            }
        })
    }

    // 密码框1聚焦事件
    passwordInp1.onfocus = function () {
        passwordInp2.value = "";
    }

    // 密码框1失去焦点事件
    passwordInp1.onchange = function () {
        // 获取密码1
        var password1 = passwordInp1.value;

        // 定义正则表达式
        var reg = /^[a-zA-Z]\w{5,11}$/;

        // 正则判断密码
        if (!reg.test(password1)) {
            passLock = false;
            passwordInp1.style.border = "2px solid red";
            alert("请输入6~12位密码，以字母开头，包含数字、字母、下划线")
            return;
        } else {
            passwordInp1.style.border = "2px solid green";
        }
    }

    // 密码框2失去焦点事件
    passwordInp2.onchange = function () {
        // 获取密码
        var password1 = passwordInp1.value;
        var password2 = passwordInp2.value;
        // 定义正则表达式
        var reg = /^[a-zA-Z]\w{5,11}$/;

        // 正则判断密码
        if (!reg.test(password2) || password1 !== password2) {
            passLock = false;
            passwordInp2.style.border = "2px solid red";
            alert("密码格式错误或者密码不一致")
            return;
        } else {
            passwordInp2.style.border = "2px solid green";
            passLock = true;
        }
    }

    // 提交按钮单击事件
    register_btn.onclick = function (e) {
        // 停止默认事件
        e.preventDefault();
        // 判断是否开锁
        if (!userLock || !passLock) {
            alert("请重新检查！");
            return false;
        }

        var username = usernameInp.value;
        var password = passwordInp2.value;

        // 发送ajax
        res.post("/register", {
            username,
            password
        }, function (data) {
            if (data.error) {
                alert("注册失败！");
            } else {
                alert("恭喜，注册成功！");
                location.href = "./login.html";
            }
        });


    }


})();