var res = {
    get: function (url, queryObj, callback) {
        // 定义 querystring 字符串
        var querystring = "";
        for (var i in queryObj) {
            querystring += i + "=" + queryObj[i] + "&";
        }
        querystring = querystring.slice(0, -1);

        // 1 初始化xhr
        var xhr = new XMLHttpRequest();

        // 2 xhr绑定事件
        xhr.onreadystatechange = function () {
            // 数据完全接收完成时
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback && callback(JSON.parse(this.responseText));
            }
        }

        // 3 决定请求方式
        xhr.open("get", url + "?" + querystring, true);

        // 发送请求
        xhr.send(null);
    },
    post: function (url, queryObj, callback) {

        // 定义querystring
        var querystring = "";

        // 遍历queryObj
        for (var i in queryObj) {
            querystring += i + "=" + queryObj[i] + "&";
        }

        // 删掉最后一个&
        querystring.slice(0, -1);

        // 定义一个xhr
        var xhr = new XMLHttpRequest();

        // 添加一个onreadystatechange事件
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback && callback(JSON.parse(xhr.responseText));
            }
        }

        // 打开tcp连接
        xhr.open("post", url, true);

        // 添加请求头，伪装成form data
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

        // 发送请求
        xhr.send(querystring);
    }
}