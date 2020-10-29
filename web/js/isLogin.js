;
(function () {
    // 封装一个获取cookie函数
    function getCookie(key) {
        var arr = document.cookie.split(";");
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].split("=")[0] === key) {
                return arr[i].split("=")[1];
            }
        }
    }

    var cookie = getCookie("isLogin");
    if (!cookie) {
        location.href = "http://localhost/demo5/web/html/login.html";
    }
})();