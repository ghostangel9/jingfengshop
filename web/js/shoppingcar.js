;
(function () {
    // 从本地存储中，把购物车的数据拿出来
    var shoppingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // 获取table元素
    var $table = $("table");

    // 定义渲染页面-------------------------- render()方法 --------------------------------------
    function render() {
        // 定义一个是否全选变量
        var is_all_check = shoppingCart.every(function (value) {
            return value.is_check;
        })

        $table[0].innerHTML = `
            <thead>
                <tr class="d-flex">
                    <th class="col-lg-1 text-center"><input class="all_check" ${is_all_check ? "checked" : " "} type="checkbox"></th>
                    <th class="col-lg-4">商品名称</th>
                    <th class="col-lg-2 text-center">商品数量</th>
                    <th class="col-lg-2 text-center">商品单价</th>
                    <th class="col-lg-3 text-center">操作</th>
                </tr>
            </thead>
            <tbody>
            `
        // 遍历shoppingCart
        if (shoppingCart.length !== 0) {
            shoppingCart.forEach(function (value) {
                $table[0].innerHTML += `
            <tr class="d-flex">
            <th class="col-lg-1 text-center"><input data-goods_id = ${value.goods_id} class="single_check" ${value.is_check ? "checked" : " "} type="checkbox"></th>
            <td class="col-lg-4 text-truncate">
                <a href="./detail.html#${value.goods_id}">${value.goods_name}</a>
            </td>
            <td class="col-lg-2 text-center">${value.cart_number}</td>
            <td class="col-lg-2 text-center">￥${value.goods_price}</td>
            <td class="col-lg-3 text-center">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button data-goods_id="${value.goods_id}" type="button" class="decrease btn btn-secondary">减少</button>
                    <button data-goods_id="${value.goods_id}" type="button" class="del btn btn-secondary">删除</button>
                    <button data-goods_id="${value.goods_id}" type="button" class="increase btn btn-secondary">增加</button>
                </div>
            </td>
        </tr>
        `
            })
        } else if (shoppingCart.length === 0) {
            $table[0].innerHTML += `<tr><p class="h3 text-center empty">您的购物车竟然空空如也！<a href="./list.html">快点这里选购吧！</a></p><tr></tbody>`
        }
        count();
    }

    // 定义计算总价-------------------------    count()方法  ------------------------------------
    function count() {
        // 计算选中的每一件商品的单价与数量乘积之和
        var price = shoppingCart.filter((value) => {
            return value.is_check;
        }).reduce((prev, value) => {
            return value.goods_price * value.cart_number + prev;
        }, 0)

        $table[0].innerHTML += `
        <tr class="d-flex justify-content-between">
            <td class="text-danger font-weight-bolder"><span>合计：￥</span><span>${price.toFixed(2)}</span></td>
            <td><button type="button" class="btn btn-primary font-weight-bolder"> 结 算 </button></td>
        </tr>
    </tbody>
    `
    }

    // 页面刷新渲染页面
    render();

    // 事件委托商品操作按钮
    $table.click(function (e) {
        if (e.target.className.includes("decrease")) {
            // ------------------------------减少商品数量
            var goods_id = e.target.getAttribute("data-goods_id");
            var goods = shoppingCart.find(function (value) {
                return value.goods_id === +goods_id;
            })
            if (goods.cart_number <= 1) {
                alert("请至少买一件吧！如果不需要，请删除！");
                return;
            }
            goods.cart_number--;
            localStorage.setItem("cart", JSON.stringify(shoppingCart));
            render();

        } else if (e.target.className.includes("del")) {
            // ---------------------------------删除商品
            // 删除localStorage里面对应的数据
            // 获取idx
            var goods_id = e.target.getAttribute("data-goods_id");
            // 使用findIndex()方法找到localStorage中对应数据的下标
            var index = shoppingCart.findIndex(function (value) {
                return value.goods_id === goods_id;
            })
            // 把localStorage中对应的数据删除
            shoppingCart.splice(index, 1);
            // 把新的数据插回localStorage中
            localStorage.setItem("cart", JSON.stringify(shoppingCart));
            // 渲染购物车
            render();

        } else if (e.target.className.includes("increase")) {
            // ----------------------------------增加商品数量
            // 获取idx
            var goods_id = e.target.getAttribute("data-goods_id");
            // 使用find()方法找到localStorage中对应数据
            var goods = shoppingCart.find(function (value) {
                return value.goods_id === +goods_id;
            });
            console.log(goods);
            goods.cart_number++;
            localStorage.setItem("cart", JSON.stringify(shoppingCart));
            render();
        }
    })

    // 事件委托全选框事件
    $table.click(function (e) {
        if (e.target.className === "all_check") {
            if (e.target.checked) {
                shoppingCart.forEach(function (value) {
                    value.is_check = true;
                    render();
                });
            } else {
                shoppingCart.forEach(function (value) {
                    value.is_check = false;
                    render();
                });
            }
        }
    })

    $table.click(function (e) {
        if (e.target.className === "single_check") {
            // 1 找到对应的id
            var goods_id = e.target.getAttribute("data-goods_id");
            // 2 根据id去购物车数组中找到对应的对象
            var goods = shoppingCart.find(function (value) {
                return value.goods_id === +goods_id;
            })
            // 3 修改它的状态
            goods.is_check = e.target.checked;
            // 4 调用render方法
            render();
        }
    })

})();