// 定义QF对象
var QF = {
	get: function(url, queryobj, callback) {
		// 因为queryobj是一个对象 而我们要的是querystring 所以需要进行转换
		var querystring = "";
		// 循环传递进来的对象 将它格式化成 querystring
		for (var i in queryobj) {
			querystring += i + "=" + queryobj[i] + "&";
			// 假如传递进来的对象是 {a: 1, b: 2, c: 3}
			// 第一次循环的结果是 a=1&
			// 第二次循环的结果是 a=1&b=2&
			// 第三次循环的结果实 a=1&b=2&c=3&
		}
		// 去掉最后的&
		querystring = querystring.slice(0, -1);
		// 初始化xhr对象
		var xhr = new XMLHttpRequest();
		// 绑定事件
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var responseText = xhr.responseText;
				callback && callback(JSON.parse(responseText));
			}
		}
		// 调用open 
		xhr.open("get", url + "?" + querystring, true);
		// 调用send
		xhr.send();
	},
	post: function(url, queryobj, callback) {
		// 格式化传递进来的对象
		var querystring = "";
		for (var i in queryobj) {
			querystring += i + "=" + queryobj[i] + "&";
		}
		querystring = querystring.slice(0, -1);

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				callback && callback(JSON.parse(xhr.responseText));
			}
		}
		xhr.open("post", url, true);
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.send(querystring);
	},

	getCookie: function(key) {
		// 获取cookie 就是在解析字符串
		var arr = document.cookie.split("; ");
		for (var i = 0; i < arr.length; i++) {
			// 再把每一个cookie的key=value按照=打断 => [key, value]
			if (arr[i].split("=")[0] === key) {
				return arr[i].split("=")[1];
			}
		}
	},
	setCookie: function(key, value, maxAge, path) {
		document.cookie = key + "=" + value + "; path=" + path + "; max-age=" + maxAge;
	},
	removeCookie: function(key, path) {
		document.cookie = key + "=1;max-age=-1;path=" + path;
	},
	jsonp: function(url, data, fun) {
		// 创建script标签
		var script = document.createElement("script");
		// 把data做成querystring 
		var querystring = "";
		for (var i in data) {
			querystring += i + "=" + data[i] + "&";
		}
		querystring = querystring.slice(0, -1);
		// 把fun这个函数以 data.jsonpcallback为名字 暴露到全局
		var funName = data.jsonpcallback;
		window[funName] = fun;
		script.src = url + "?" + querystring;
		document.body.appendChild(script);
		// 当代码执行完毕之后 移出script标签 并且 删除window的函数
		script.onload = function() {
			document.body.removeChild(script);
			delete window[funName];
		}
	}
}