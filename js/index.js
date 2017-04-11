// 预加载
var imgs = $("body img");
var $loading = $("#loading");
var $loadingH2 = $("#loading>h2");
var $swiperWrap = $(".swiper-container")

//百分比
var percent = 0;
// 用来表示已经加载了多少张图片
var num = 0;

for (var i = 0; i < imgs.length; i++) {
	// 创建图片对象
	var img = new Image();
	// 赋予地址
	img.src = imgs[i].src;
	// 当图片加载完后触发方法
	img.onload = function () {
		//计算加载了多少张
		num++;
		//计算百分比
		percent = parseInt((num / imgs.length) * 100);
		//改变loading的高
		$loadingH2.text(percent + "%");
		
		//判断是否已经加载所有的图片
		if(percent>=100){
			$loading.hide();
			$swiperWrap.show();
			// 初始化 Swiper
			var swiper = new Swiper('.swiper-container', {
			    //方向：垂直
			    direction: 'vertical',
			    //动画
			    onInit: function(swiper){           //Swiper2.x的初始化是onFirstInit
			        swiperAnimateCache(swiper);     //隐藏动画元素 
			        swiperAnimate(swiper);          //初始化完成开始动画
			    },
			    onSlideChangeEnd: function(swiper){
				    swiperAnimate(swiper);          //每个slide切换结束时也运行当前slide动画

				    // 移除第四个link  每个slide切换结束时也运行自定义动画
				 	$("link").eq(3).remove();
				    switch(swiper.activeIndex){
				    	case 3:
				    		var $link="<link rel='stylesheet' type='text/css' href='css/fontAnim.css'>";
				    		$("head").append($link);
				    		break;
				    	case 4:
				    		var $link="<link rel='stylesheet' type='text/css' href='css/fiveAnim.css'>";
				    		$("head").append($link);
				    		break;
				    	case 6:
				    		var $link="<link rel='stylesheet' type='text/css' href='css/sevenAnim.css'>";
				    		$("head").append($link);
				    		break;
				    }
			    }
			});
		}
	}		
}

// 音乐按键
var $musicBtn = $(".musicBtn");
var musicBol = false;
$musicBtn.on("touchstart",function(){
	musicBol=!musicBol;
	if (musicBol) {
		$(this).prop("src","images/music2.png");
		$(this).css("animation","111");
	}else {
		$(this).prop("src","images/music1.png");
		$(this).css("animation","music 2s linear infinite");
	}
})

// --------------第二页-------------
// 地球
var $earth = $("#earth");
// 切换第几张图片
var i = 1;
setInterval(function(){
	i++;
	if (i>47) {
		i=1;
	}
	$earth.prop("src","images/pagetwo/diqiu/"+i+".jpg");
},50)

// ---------------第四页-----------

var $fontHeads = $("#fontHead>div");
var $fontHeadImgs = $("#fontHead>div>img")
var $fontTab = $("#fontTab");
var $tabWrap = $("#tabWrap");

var $leftBtn = $("#leftBtn");
var $rightBtn = $("#rightBtn");

var fontIndex = 0;
// 保存原本的内容顺序
var $tabWrapHtml = $tabWrap.html();
// 用于控制动画：当动画未结束时，点击无效
var fontBol = false;

// 点击头像
$fontHeads.on("touchstart",function(){
	fontIndex = $(this).index();
	// 隐藏头像
	$fontHeadImgs.hide();
	$fontHeads.css("transform","scale(0.3)");
	// 如果点击的头像下标为最后一个
	if (fontIndex==$fontHeads.length-1) {
		// 把第一个放到最后
		var $tabImgs = $("#tabWrap>div");
		$tabImgs.eq($fontHeads.length-1).insertBefore($tabImgs.eq(0));
		var $tabImgs = $("#tabWrap>div");
		$tabImgs.eq($fontHeads.length-1).insertBefore($tabImgs.eq(0));
		$tabWrap.css("left",-100+"%");
		fontIndex=1;
	}
	else if (fontIndex==0) {
		var $tabImgs = $("#tabWrap>div");
		$tabImgs.eq($fontHeads.length-1).insertBefore($tabImgs.eq(0));
		$tabWrap.css("left",-100+"%");
		fontIndex=1;
	}
	else {
		$tabWrap.css("left",-fontIndex*100+"%")
	}

	// fontTab切换动画并显示
	$fontTab.removeClass('zoomOut');
	$fontTab.addClass('zoomIn');
	$fontTab.show();
})

// 下一张按钮
$rightBtn.on("touchstart",function(){
	if(fontBol){return};
	fontBol = true;

	$tabWrap.css({
		"left":-(fontIndex+1)*100+"%",
		"transition":"1s"
	});

	// 获取当前顺序
	var $tabImgs = $("#tabWrap>div");
	//设置延时执行
	setTimeout(function(){
		// 把第一个div放到最后
		$tabWrap.append($tabImgs.eq(0));
		// left倒回一次
		$tabWrap.css({
			"left":-fontIndex*100+"%",
			"transition":"0s"
		});
		fontBol = false;
	},1000);
}) 

// 上一张按钮	
$leftBtn.on("touchstart",function(){
	if(fontBol){return};
	fontBol = true;
	// 如果是第一张就把最后一张放到第一
	if (fontIndex==0) {
		var $tabImgs = $("#tabWrap>div");
		$tabImgs.eq($fontHeads.length-1).insertBefore($tabImgs.eq(0));
		fontIndex=1;
	}

	$tabWrap.css({
		"left":-(fontIndex-1)*100+"%",
		"transition":"1s"
	});

	var $tabImgs = $("#tabWrap>div");
	setTimeout(function(){
		$tabImgs.eq($fontHeads.length-1).insertBefore($tabImgs.eq(0));
		$tabWrap.css({
			"left":-fontIndex*100+"%",
			"transition":"0s"
		});
		fontBol = false;
	},1000);
})


// 点击关闭
var $fontCloseBtn = $("#fontCloseBtn");
$fontCloseBtn.on("touchstart",function(){
	// 显示头像
	$fontHeadImgs.show();
	$fontHeads.css("transform","");
	// fontTab切换动画
	$fontTab.removeClass('zoomIn');
	$fontTab.addClass('zoomOut');
	// 动画结束隐藏切换
	setTimeout(function(){
		// 还原顺序
		$tabWrap.html($tabWrapHtml);
        $fontTab.hide();
    },1000);	
})

// ------------------第五页-------------------

var $fivePic = $(".fivePicture>div");
var $fiveInt = $(".fiveIntroBg");
var $fiveCloseBtn = $(".fiveIntroBtn");
var $left = 0;
var $top =0;
var fiveIndex = 0;
// 点击照片
$fivePic.on("touchstart",function(){
	// 获取当前简介的left top值
	fiveIndex = $(this).index();
	$left = ($fiveInt.eq(fiveIndex).offset().left)/($(document).width())*100;
	$top = ($fiveInt.eq(fiveIndex).offset().top)/($(document).height())*100;
	// 显示简介
	$fiveInt.eq(fiveIndex).animate({
		"width": "90%",
		"height": "80%",
		"left": "5%",
		"top": "10%",
		"transform": "rotate(0deg)"
	},500,"easeOutBounce");
});

// 关闭
$fiveCloseBtn.on("touchstart",function(){
	// 隐藏
	$fiveInt.eq(fiveIndex).animate({
		"width": "0%",
		"height": "0%",
		"left": $left + "%",
		"top": $top + "%",
		"margin":"",
		"transform": "rotate(15deg)"
	},500,"easeOutBounce");
});
