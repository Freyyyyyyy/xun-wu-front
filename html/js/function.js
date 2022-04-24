{
    if (sessionStorage.getItem('userName')) {
    $("#login").html("<li><a id = 'login' href='#'>你好</a><span>|</span></li>");
    $("#signup").html("<li><a id = 'signup' href='#'>" + sessionStorage.getItem('userName') + "</a><span>|</span></li>");
    document.getElementById('close').style.display = "block";
}

document.getElementById('close').addEventListener('click', function () {
    alert('账号已退出');
    window.location.href = 'index2试验.html';
    sessionStorage.removeItem('userName');
    $("#login").html("<li><a id = 'login' href= 'UserLogin.html'>登录</a></li>");
    $("#signup").html("<li><a id = 'signup' href= 'UserSignUp.html'>注册</a></li>");
    document.getElementById('close').style.display = "none";
});
}

// 跳转功能
{
    // 我的订单
    document.getElementById('myOrder').addEventListener('click', function () {
        window.location = "myOrder.html";
    })

    // 商品发布
    document.getElementById('upload').addEventListener('click', function () {
        window.location = "upload.html";
    })
    // 购物车跳转
    document.getElementById('shoppingCart').addEventListener('click', function () {
        window.location = "shoppingCart.html";
    })

}
