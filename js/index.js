window.onload = function ()
{
    let username = document.getElementById("username");
    if(!sessionStorage.getItem("username"))
        username.innerText = "未登录状态";
    else
        username.innerText = "欢迎光临:" + sessionStorage.getItem("username");

    let close = document.getElementById("close");
    close.onclick = function ()
    {
        username.innerText = "未登录状态";
        sessionStorage.removeItem("username");
    };

    //未登录者不能进入购物车,订单界面
    document.getElementById("shoppingCart").onclick = function ()
    {
        if(!sessionStorage.getItem("username"))
        {
            alert("您还未登录,即将跳转到登录页面!");
            window.location.href = 'login.html';
        }
        else
        {
            window.location.href = 'shoppingCart.html';
        }
    };
    document.getElementById("myOrder").onclick = function ()
    {
        if(!sessionStorage.getItem("username"))
        {
            alert("您还未登录,即将跳转到登录页面!");
            window.location.href = 'login.html';
        }
        else
        {
            window.location.href = 'myOrder.html';
        }
    };
}
