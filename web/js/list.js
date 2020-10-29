;
(function () {
    var list = document.getElementById("list");
    var backBtn = document.getElementById("back_btn");
    var nextBtn = document.getElementById("next_btn");
    // 定义页码数
    var page = 0;
    // 定义一个当页的商品列表数组
    var shoppingInfoArr = null;

    // 封装函数发送Ajax
    function sendAjax(page) {
        res.get("/list", {
            page,
            num: 32
        }, function (data) {
            if (!data.error) {
                shoppingInfoArr = data.data;
                list.innerHTML = "";
                data.data.forEach(function (value) {
                    list.innerHTML += `
                    <div class="col-lg-3">
                        <div class="card" style="width: 16rem;">
                            <img src="${value.goods_small_logo}" class="card-img-top" alt="...">
                            <div class="card-body card-padding">
                            <h5 class="card-title">${value.cat_id}</h5>
                            <p class="card-text text-truncate"><a href="./detail.html#${value.goods_id}">${value.goods_name}</a></p>
                            <p class="font-weight-bolder text-danger">￥${value.goods_price}</p>
                            <a data-goods_id="${value.goods_id}" href="#" class="addTocart btn btn-primary">加入购物车</a>
                            </div>
                        </div>
                    </div>
                    `;
                })
            }
        })
    }

    // 首次渲染页面
    sendAjax(page);

    // 翻页按钮
    // 下一页按钮事件
    nextBtn.onclick = function () {
        page++;
        sendAjax(page);
    }
    // 上一页按钮事件
    backBtn.onclick = function () {
        if (page == 0) {
            alert("已经是第一页啦！");
            return;
        } else {
            page--;
            sendAjax(page);
        }
    }

    // 加入购物车按钮添加委托事件
    list.onclick = function (e) {
        if (e.target.className.includes("addTocart")) {
            e.preventDefault();
            var data_goods_id = e.target.getAttribute("data-goods_id");
            var shoppingInfoObj = shoppingInfoArr.find(function (value) {
                return value.goods_id === +data_goods_id;
            })
            // 把本地存储的内容取出来
            var shoppingCart = JSON.parse(localStorage.getItem("cart")) || [];
            // 先看一下数据是否在数组里，如果存在， 数量+1， 如果不在，再往里放
            var isExist = shoppingCart.find(function (value) {
                return value.goods_id === shoppingInfoObj.goods_id;
            });
            // 此时 isExist 是shoppingCart中符合条件的商品
            if (isExist) {
                isExist.cart_number++;
            } else {
                shoppingInfoObj.cart_number++;
                // 把取出来的内容放进数组
                shoppingCart.push(shoppingInfoObj);
            }
            // 将数组再保存回本地存储
            localStorage.setItem("cart", JSON.stringify(shoppingCart));

        }
    }
})();