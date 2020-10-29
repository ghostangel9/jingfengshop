;
(function () {
    //当前页面是一个模板页面
    //用来渲染某一个商品的详情
    //到底渲染哪个商品，需要通过url来获取

    var idx = location.href.indexOf("#") + 1;
    var shopID = location.href.slice(idx);
    var goods_detail = document.getElementById("goods_detail");
    var detail_img = document.getElementById("detail_img");
    // 定义一个变量存储商品信息
    var shoppingInfo = null;

    res.get("/detail", {
        shopID
    }, function (data) {
        if (!data.error) {
            // 把返回的数据给shoppingInfo
            shoppingInfo = data.data[0];
            detail_img.src = `${data.data[0].goods_small_logo}`;
            goods_detail.innerHTML = `
                <li class="list-group-item">${data.data[0].cat_id}</li>
                <li class="list-group-item">${data.data[0].goods_name}</li>
                <li class="list-group-item">分类：${data.data[0].cat_one_id}      ${data.data[0].cat_two_id}      ${data.data[0].cat_three_id}</li>
                <li class="list-group-item text-danger">￥${data.data[0].goods_price}</li>
                <button type="button" class="btn btn-primary">加入购物车</button>
            `;
        }
    })
    // 委托模式
    goods_detail.addEventListener("click", function (e) {
        if (e.target.tagName.toLowerCase() === "button") {
            // 1 把当前页面所显示的商品的详细信息放进本地存储

            // 把本地存储的内容取出来
            var shoppingCart = JSON.parse(localStorage.getItem("cart")) || [];

            // 先看一下数据是否在数组里，如果存在， 数量+1， 如果不在，再往里放
            var isExist = shoppingCart.find(function (value) {
                return value.goods_id === shoppingInfo.goods_id;
            });
            // 此时 isExist 是shoppingCart中符合条件的商品
            if (isExist) {
                isExist.cart_number++;
            } else {
                shoppingInfo.cart_number++;
                // 把取出来的内容放进数组
                shoppingCart.push(shoppingInfo);
            }
            // 将数组再保存回本地存储
            localStorage.setItem("cart", JSON.stringify(shoppingCart));

            // 2 跳转到购物车页面
            location.href = "./shoppingcar.html";
        }

    })
})();