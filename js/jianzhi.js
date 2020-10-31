$(function(){
		//获取标签
		//最大的轮播模块 , 这里变量名称里面的$其实就是一个普通的字符
		var $banner = $('#banner');
		//获取图片的父级ul
		var $banner_ul = $('#banner ul');
		//按钮的大块
		var $btn = $('.banner-btn');
		//获取按钮的a标签
		var $btn_a = $btn.find('a');

		//定义一些可能会使用到的变量
		//定时器
		var timer =  null;
		//正在展示的图片的下标，正在展示第几张图片
		var page = 1;
		//运动的方向
		var btnClass = null;  // direction 方向

		//获取每一个li的宽度。也就是获取banner的宽度 。 轮播图的宽度
		var v_width = $banner.width();
		//ul的宽度根据li的个数决定
		//获取li的个数，也就是有多少个图片
		var page_count = $banner_ul.find('li').length;
		//设置ul的宽度
		$banner_ul.width(v_width*page_count); //jquery设置元素的宽度的方法

		//操作小圆点---
		var banner_cir = '<li class="selected"><a href="javascript:;"></a></li>';
		for(var i=0;i<page_count-1;i++){
			//这里只是一个所有小圆点拼接起来的字符串，还没有添加到页面中
			banner_cir += '<li ><a href="javascript:;"></a></li>'
		}
		//将所有的小圆点添加到页面中
		$('.banner-circle').append(banner_cir);
		//计算移动多少距离可以使得所有的小圆点居中
		var banner_left = $('.banner-circle').width() * 0.5 ;
		//通过margin-left设置所有的小圆圈居中
		$('.banner-circle').css('marginLeft',banner_left*-1);


		//obj 让谁动
		//dir 向哪个方向运动
		function move(dir){
			//让不在运动的物体才能够响应运动
			if(!$banner_ul.is(':animated')){ // 取反正在运动 就是不在运动
				//判断进行运动的方向
				if(dir == 'prevBtn'){
					//需要单独处理第一张变成第五张的情况
					if(page==1){
						$banner_ul.animate({
							'left': (page_count-1)*v_width * -1
						})
						//重置page，正在展示的是最后一页
						page = page_count;
						//让小点跟随移动
						cirMove();
					}else{
						//其他情况比较规律，每一次都是过一个图片的距离
						$banner_ul.animate({
							"left" : $banner_ul.position().left + v_width
						});
						page--;
						cirMove();
					}
				}else{
					//处理最后一张的特殊情况
					if(page == page_count){
						$banner_ul.animate({
							left:0
						});
						page = 1;
						cirMove();
					}else{
						$banner_ul.animate({
							"left":$banner_ul.position().left - v_width
						});
						page++;
						cirMove();
					}
				}
			}
		}

		function cirMove(){
			//给和当前展示页面下标相同的小圆圈添加激活状态其实就是添加了一个类。顺便把其他兄弟圆圈的激活状态去掉。
			$('.banner-circle li').eq(page-1).addClass('selected').siblings().removeClass('selected');
		}

		//鼠标移入移出   链式操作
		$banner.mouseover(function(){
			//清除定时器
			clearInterval(timer);
		}).mouseout(function(){  //链式操作
			clearInterval(move,2000)
			timer = setInterval(move,2000);
		}).trigger('mouseout');  //一进来就触发一次鼠标移出效果，让页面直接动起来

		//动起来
		// timer = setInterval(move,1000);

		//左右按钮的鼠标移入移出以及点击
		$btn_a.mouseover(function(){
			$(this).animate({
				"opacity":0.6   //jquery已经帮我们考虑了兼容
			},"fast")
		}).mouseleave(function(){
			$(this).animate({
				"opacity":0.3
			},"fast");
		}).click(function(){
			btnClass = $(this).attr('class');
			clearInterval(timer);
			timer = setInterval(move(btnClass),2000);
		});

		//点击小圆圈 这些小圆圈都是动态添加的
		// $('.banner-circle li').click(function() {
		// 	console.log(1)
		// });

		//事件动态绑定机制
		$('.banner-circle li').on('click',function(){
			//获取要展示的图片的编号
			var index = $('.banner-circle li').index(this);
			//让banner动起来
			$banner_ul.animate({
				left: index * v_width * -1
			}, 'slow');
			page = index + 1;
			cirMove();
		})
	});