//window.onload = function (){
	//loadData(0);
	//loadData(keyword, pageNum);
//}

var keyword = $('#keyword').val();
var sortC = 0;
$("input[name='sortC']").click(function(){
    sortC = $(this).val();
});
$(".item-list-tool ul").on("click","li",function(){
	$(".item-list-tool ul li").removeClass("active");
	$(this).addClass("active");
})

var categoryId = 0;
$("input[name='category']").click(function(){
    categoryId = $(this).val();
});

$(".search-nav-container ul").on("click","li",function(){
	$(".search-nav-container ul li").removeClass("search-nav-container-li-active");
	$(this).addClass("search-nav-container-li-active");
})

var dateStart = document.getElementById("from").value;
var dateEnd = document.getElementById("to").value;
var priceStart = document.getElementById("priceStart").value;
var priceEnd = document.getElementById("priceEnd").value;
var sizeStart = document.getElementById("sizeStart").value;
var sizeEnd = document.getElementById("sizeEnd").value;
//var dateStart = "";
//var dateEnd = "";
//var priceStart = "";
//var priceEnd = "";
//var sizeStart = "";
//var sizeEnd = "";
//var sortC = $("input[name='sortC']:checked").val();
//var sort = document.getElementsByName("sortC");
//if(sortC=undefined){
	//sortC=0;
//}
//var sortC = 0;
//$('input[type=radio]').change(function(){

//})
/*
function test(soctC){
var obj = document.getElementsByName("soctC");
    for(var i=0; i<obj.length; i ++){
        if(obj[i].checked){
            alert(obj[i].value);
        }
    }
}
/*
/*for(var i=0; i<sort.length; i++){
	if(sort[i].checked){
		sortC = sort[i].val();
	}
}
check1 = document.form1.sortC_1.checked;
check2 = document.form1.sortC_2.checked;
check3 = document.form1.sortC_3.checked;
if (check1 == true) {
  sortC=1;
}
else if (check2 == true) {
  sortC=2;
}
else if (check3 == true) {
  sortC=3;
}*/
//$(function(){
	$('#kSearch').on('click', function(){
		var dateStart = document.getElementById("from").value;
		var dateEnd = document.getElementById("to").value;
		var priceStart = document.getElementById("priceStart").value;
		var priceEnd = document.getElementById("priceEnd").value;
		var sizeStart = document.getElementById("sizeStart").value;
		var sizeEnd = document.getElementById("sizeEnd").value;

		loadData(0, sortC, keyword, categoryId, dateStart, dateEnd, priceStart, priceEnd, sizeStart, sizeEnd);
	})
//})


function loadData(pageNum, sortC, keyword, categoryId, dateStart, dateEnd, priceStart, priceEnd, sizeStart, sizeEnd) {
	$.ajax({
		url: "http://localhost:7000/api/cdSearch?page=" + pageNum + 
		"&sortC="+ sortC +
		"&keyword="+ keyword +
		"&prodCategoryId="+ categoryId +
		"&dateStart="+ dateStart +
		"&dateEnd="+ dateEnd +
		"&priceStart="+ priceStart +
		"&priceEnd="+ priceEnd +
		"&sizeStart="+ sizeStart +
		"&sizeEnd="+ sizeEnd,
		type: "get",
		dataType: 'json',
		success: function (res) {
			paginatFactory(res, pageNum);
		}, error: function (res) {
			console.log(res);
		}
	})
}
/*
function loadData(pageNum) {
	$.ajax({
		url: "http://localhost:7000/api/cdSearch?page=" + pageNum,
		type: "get",
		dataType: 'json',
		success: function (res) {
			paginatFactory(res, pageNum);
		}, error: function (res) {
			console.log(res);
		}
	})
}
*/
function paginatFactory(res, pageNum) { 
	var html = "";    //html变量存储要展示的内容，下面循环不在赘述。
	for (var i = 0; i < res.pageContent.length; i++) {
		//var category = res.data[i].category === 0 ? "设计文章" : res.data[i].category === 1 ? "前端文章" : "旅游杂计";
		var img = "http://localhost:7070/uploadProdPics/" + res.pageContent[i].productPicture.replace(/ /g, "%20");
		//var mydiv = document.createElement("div");
		//mydiv.innerHTML =
		html += 
		//class='pro-img'
		//"<div class='item-show-img'>"+
			"<div class='item-row'>"+
			"<div class='item-show-info'>"+
				"<div style='width: 200px; height: 300px; display: table-cell; text-align:center; vertical-align:middle;'>" +
					"<img src="+img+" style='cursor: pointer; width: 100%; margin-top: 10px; margin-left: 10px;'>"+
				"</div>"+
				"<div class='item-show-price'>"+
					"<span>"+
						"<i class='fa fa-rmb text-danger'></i>"+
						"<span class='seckill-price text-danger'>"+res.pageContent[i].productPrice+"</span>"+
					"</span>"+
				"</div>"+
				"<div class='item-show-detail'>"+
					"<span>"+res.pageContent[i].productName+"</span>"+
				"</div>"+
				"<div class='item-show-num'>"+
					"已售"+
					"<span>"+res.pageContent[i].productSaleVolume+"</span>份"+
				"</div>"+
				"<div class='item-show-seller'>"+
					"<span>"+res.pageContent[i].productCategoryName+"</span>"+
				"</div>"+
			"</div>"
		    "</div>";
			$("#product").html(html);
	}
	//$('#product').html(html);    //请在body中加一个id为//articlelist的table标签来查看效果。

	var totalHtml = "";
	totalHtml += "全部结果 > "+
				"<span class='host-location-text'>"+res.total+"</span>"+
				" 条"
	$('#total').html(totalHtml);

	//这里就是分页核心了，为了更好查看效果，请在刚才id为articlelist表格后创建一个class为paginate的ul标签。
//disabled设置页码不能点击，如果当前页是第一页，«按钮不能点
	var pageHtml = "<li " + (pageNum ? 0 : "disabled") + " data-pageid='" + pageNum + "'>«</li>";
//pageTotal来设置分页显示数量，如果>=6的话，最多显示6条，否则你懂得
	var pageTotal = res.totalPages >= 6 ? 6 : res.totalPages;
	var currentId = pageNum+1;
//由于是两种样式，所以根据当前页来更改
	if (currentId < 6) {
		for (var j = 1; j <= pageTotal; j++) {
			pageHtml += "            <li " + (currentId === j ? "disabled" : "") + " data-pageid='" + j + "'>" + j + "</li>";
		}
	} else {
//如果大于6，会加上...并且1、2页都在左侧留着
		for (var j = 1; j <= pageTotal; j++) {
//小于3的话 1、2页码一直存在
			if (j < 3) {
				pageHtml += "            <li " + (currentId === j ? "disabled" : "") + " data-pageid='" + j + "'>" + j + "</li>";
			}
//等于3，加上...
			if (j === 3) {
				pageHtml += "<li disabled class='jump'>...</li>";
			}
//如果当前页大于三。页码需要根据当前页来渲染。
			if (currentId > 3) {
//当前页-1，如果当前页是7，左边显示7-1=6
				if (j === 4) {
					if (currentId === res.totalPages) {
						pageHtml += "<li data-pageid='" + (currentId - 2) + "'>" + (currentId - 2) + "</li>";
					}
					pageHtml += "<li data-pageid='" + (currentId - 1) + "'>" + (currentId - 1) + "</li>";
				}
//当前页，注意disabled，不能在点击，
				if (j === 5) {
					pageHtml += "<li disabled data-pageid='" + currentId + "'>" + currentId + "</li>";
				}
//这里当前页+1，你应该懂了。
				if (j === 6 && currentId < res.totalPages) {
					pageHtml += "<li data-pageid='" + (currentId + 1) + "'>" + (currentId + 1) + "</li>";
				}
			}
//这里如果当前页小于总页数的倒数第二页，...就显示。否则后面每页数了就不显示。
			if (j === 6 && currentId < (res.totalPages - 1)) {
				pageHtml += "<li disabled class='jump'>...</li>";
			}
		}
	}
//这里判断是不是最后一页，是就disabled
	pageHtml += "            <li " + (currentId >= res.totalPages ? "disabled" : "") + " data-pageid='" + currentId+1 + "'>»</li>";
//这里就是页面直接跳转了。
	pageHtml += "<li class='jump' disabled>共" + res.totalPages + "页, 到第<input class='entrance' value='" + currentId + "' type='text'>页</li><li data-total='" + res.totalPages + "' class='confirm'>确定</li>"
//最后渲染
	$('.paginate').html(pageHtml);
}


loadData(0, sortC, keyword, categoryId, dateStart, dateEnd, priceStart, priceEnd, sizeStart, sizeEnd);// 初始化 页面第一次渲染时，相当于获取第一页的数据，所以这里传1

/*
$(document).on('click', '.paginate li:not([disabled])', function () {
	alert("!")
});*/

$(document).on('click', '.paginate li:not([disabled])', function () {
//confirm 判断点击的是确定还是页码
	if ($(this).hasClass('confirm')) {
		//是确定，要获取输入的是第几页。
		var page = parseInt($('.entrance').val());
		if (page <= 0 || page > $(this).data('total') || isNaN(page)) {
			layer.msg('请输入正确的页码！');
		} else {
		//符合正确页数后调用ajax方法。
			loadData(page-1, sortC, keyword, categoryId, dateStart, dateEnd, priceStart, priceEnd, sizeStart, sizeEnd);
		}
	} else {
		//这里就是点击页码后的调用。
		var pageId = $(this).data('pageid');
		loadData(pageId-1, sortC, keyword, categoryId, dateStart, dateEnd, priceStart, priceEnd, sizeStart, sizeEnd);
	}
});
/*
function paging(res, pageNum) {
	for (var i = 0; i < res.pageContent.length; i++) {
		var productId = i;
		var img = "http://localhost:7070//" + res.pageContent[i].productPicture;
		var productTag = res.pageContent[i].productCategoryName;
		var productInfo = res.pageContent[i].productName;
		var productPrice = res.pageContent[i].productPrice;
		var mydiv = document.createElement("div");
		mydiv.innerHTML =
			"<div  id = " + productId + " style='cursor: pointer; width: 150px; height: 260px; background-color: #bcb6b6; margin-top: 100px; margin-left: 100px; float: left;'>" +
			"<img id = " + productId + "  src='" + img + "' class='pro-img' />" +
			"<p  id = " + productId + " class = 'price'>" + productTag + "</p>" +
			"<p  id = " + productId + "  class = 'price' > " + productInfo + "</p>" +
			"<p  id = " + productId + " class = 'price'> <span>" + productPrice + "</span>元</p>" +
			"</div>";
		$("#product").append(mydiv);
	}
	document.querySelector(".product").addEventListener("click", function (event) {
		var id = event.target.id;
		if (!sessionStorage.getItem('userName')) {
			alert("您还未登录,即将跳转到登录页面!");
			window.location.href = 'UserLogin.html';
		}
		else window.location = "productDetails/product'" + id + "'.html";

	});
}*/

//当鼠标放在导航条上时
//在地址上
$('.location,.city').hover(
	function() {
		var locatOffset = $('.location').offset();
		$('.city').show();
		$('.city').css('left', locatOffset.left + "px");
		$('.city').css('top', (locatOffset.top+35) + "px");
		$('.location').addClass("nav-pull-down-action");
	},
	function(){
		$('.city').hide();
		$('.location').removeClass("nav-pull-down-action");
	}
);

//在我的商城上
$('.my-shop,.my-shop-panel').hover(
	function(){
		var locatOffset = $('.my-shop').offset();
		$('.my-shop-panel').show();
		$('.my-shop-panel').css('left', locatOffset.left + "px");
		$('.my-shop-panel').css('top', (locatOffset.top+35) + "px");
		$('.my-shop').addClass("nav-pull-down-action");
		$('.my-shop').children('a').css("border-left", "1px solid #fff");
	},
	function(){
		$('.my-shop-panel').hide();
		$('.my-shop').children('a').css("border-left", "1px solid #ccc");
		$('.my-shop').removeClass("nav-pull-down-action");
	});

//幻灯片
var nowKey = 1;
$('.carousel_img[name=1]').show();
$('.icon i[name=1]').css("color", "#f00");
objTime = setInterval(Carousel,2500);


// 幻灯片
function Carousel() {
	var forKey = 1;
	nowKey++;
	//便利img标签
	$('.carousel_img').each(function(){
		//如果已显示
		if (!$(this).is(":hidden") && (nowKey-1) == forKey) {
			if (nowKey == 6) {
				nowKey = 1;
				$('.carousel_img[name=1]').fadeIn(800);
				console.log(nowKey);
			}else{
				$(this).next('img').fadeIn(800);
			}
			$(this).fadeOut(800);
		}
		forKey++;
	});
	//下面红点跟着幻灯片动
	if (nowKey == 1) {
		$(".icon i[name=1]").css("color", "#f00");
		$(".icon i[name=5]").css("color", "#fff");
	}else{
		$(".icon i[name="+nowKey+"]").css("color", "#f00");
		$(".icon i[name="+(nowKey-1)+"]").css("color", "#fff");
	}
}

//鼠标放在幻灯片上面暂停播放
$('.slide').hover(
	function(){
		clearInterval(objTime);
		$('.prevNext').show();
	},
	function(){
		objTime = setInterval(Carousel,2500);
		$('.prevNext').hide();
	}
);

//点击幻灯片的小圆点
$('.icon i').hover(function(){
		//先消失
		tempKey = parseInt($(this).attr("name"));
		$(".icon i[name="+nowKey+"]").css("color", "#fff");
		//如果选中的和上一个不一样时
		if (tempKey != nowKey)
			$(".carousel_img[name="+nowKey+"]").fadeOut(800);
		nowKey =tempKey; 
		//再出现
		$(this).css("color", "#f00");
		$(".carousel_img[name="+nowKey+"]").fadeIn(800);
		console.log(nowKey);
	},function(){});

//点击上一张下一张
function PrevNextClick(flag){
	if (flag == 1){
		if (nowKey>1) {
			$(".icon i[name="+nowKey+"]").css("color", "#fff");
			$(".carousel_img[name="+nowKey+"]").fadeOut(800);
			nowKey--;
		}
	}
	else if (flag == 2){
		if (nowKey<5) {
			$(".icon i[name="+nowKey+"]").css("color", "#fff");
			$(".carousel_img[name="+nowKey+"]").fadeOut(800);
			nowKey++;
		}
	}
	$(".icon i[name="+nowKey+"]").css("color", "#f00");
	$(".carousel_img[name="+nowKey+"]").fadeIn(800);
}


//显示商品详细信息
var navIndex = -1;
$('.nav-side li,.detail-item-panel').hover(
	function(){
		var slideOffset = $('.nav-side').offset();
		navIndex = $('.nav-side li').index($(this));
		if (navIndex%2) {
			$('.panel-1').show();
		}else{
			$('.panel-2').show();
		}
		
		$('.detail-item-panel').css("top",slideOffset.top + "px");
		$('.detail-item-panel').css("left",(slideOffset.left + 200) + "px");
	},function(){
		if (navIndex%2) {
			$('.panel-1').hide();
		}else{
			$('.panel-2').hide();
		}
	});


//倒计时
function countDowm(){
	var seconds = parseInt($('.count-down-seconds').html());
	if (seconds == 0) {
		var minute = parseInt($('.count-down-minute').html());
		minute = minute - 1;
		if (minute < 10) {
			$('.count-down-minute').html('0' + minute);
		}else{
			$('.count-down-minute').html(minute);
		}
		$('.count-down-seconds').html('59');
	}else{
		seconds = seconds - 1;
		if (seconds < 10) {
			$('.count-down-seconds').html('0' + seconds);
		}else{
			$('.count-down-seconds').html(seconds);
		}
	}
}
setInterval(countDowm,1000);


//鼠标经过限时秒杀商品时向上移动
$('.seckill-item').hover(
	function(){
		$(this).children('.seckill-item-img').children('img').animate({
			'margin-top':'0px'
		},380);
	},
	function(){
		$(this).children('.seckill-item-img').children('img').animate({
			'margin-top':'8px'
		},380);
	});


//鼠标滑动商品向左滑
$('.item-big-img,.item-content-bottom-img').hover(
	function(){
		$(this).children('img').animate({
			'margin-left':'-8px'
		},380);
	},
	function(){
		$(this).children('img').animate({
			'margin-left':'0px'
		},380);
	});
//鼠标放在四个框商品时图片向左滑
$('.item-four-detail').hover(
	function(){
		$(this).children('.item-four-detail-img').children('img').animate({
			'margin-left':'-8px'
		},380);
	},
	function(){
		$(this).children('.item-four-detail-img').children('img').animate({
			'margin-left':'0px'
		},380);
	});

$('.item-row').click(function(){
	window.location = 'item_detail.html';
})
