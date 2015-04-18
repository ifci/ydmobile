(function($){
	// 切换卡效果
	$.fn.tabs = function(opts){
		var defaults = {
			hd: '.hd li',
			bd: '.bd',
			on: 'on',
			trigger : 'click'
		}, options = $.extend(defaults, opts);
		return this.each(function(){
			var t = $(this);
			var s = 0;
			var hd = $(options.hd, t);
			var bd = $(options.bd, t).children();
			var on = $("." + options.on, t);
			bd.hide().eq(on.index()).show();
			hd.click( function(){
				s = $(this).index();
				hd.removeClass(options.on);
				$(this).addClass(options.on);
				bd.hide().eq(s).show();
			});
		});
	};

	// 返回顶部
	$.fn.bTop = function(){
		this.click(function() {
			$(".main1").scrollTop(0);
		});
	};

	//弹出层效果
	window.layer = {
	    v: '0.0.1',
	    //载入模块
	    msg: function(module, callback){
	    	if($('#layer').length < 1){
				$('<div id="layer"><span>' + module + '</span></div>').appendTo('body');
				var law = $("#layer span").width()/2;
				var lah = $("#layer span").height()/2;
				$("#layer span").css({'margin-left':-law,'margin-top':-lah});
				var set = setInterval(function(){
					clearInterval(set);
					$("#layer").remove();
				},3000);
			}
			$('#layer').on('click',function(){
				$(this).remove();
			});
	    },
	    confirm: function(module, callback){
	    	$('<div>',{
	    		html: '<div class="alertTip"><p class="tips">提示：' + module + '</p><a class="sure" href="javascript:;">确定</a><a class="cancel" href="javascript:;">取消</a></div>',
	            id: 'layer'
	    	}).appendTo('body');
	    	$('#layer,.alertTip').show();
	    	$('.cancel,.sure').on('click', function(){
	    		$('#layer').remove();
	    	});
	    	$('.sure').click(callback);
	    }
	};

	// 手风琴效果
	$.fn.sfq = function(opts){
		var defaults = {
			hd: '.hd li',
			bd: '.bd',
			on: 'on',
			trigger : 'click'
		}, options = $.extend(defaults, opts);
		return this.each(function(){
			var t = $(this);
			t.children('li').first().addClass(options.on).siblings('li').removeClass(options.on);
			t.children().on('click', function(){
				$(this).addClass(options.on).siblings('li').removeClass(options.on);
			});
		});
	};
})(Zepto);

$(function(){

	$('.header_n').on('tap', function(){
		$('.header_nav').toggleClass('w0');
	});

	$('.spec').each(function(){
		$(this).find('.spec_box').first().addClass('spec_curr');
		$(this).find('.spec_box').click(function(){
			$(this).addClass('spec_curr').siblings('.spec_box').removeClass('spec_curr');
		});
	});

	$('.pdetail').tabs();
	$("#plug-btn").click(function(){
		$("#plug-phone > div").toggleClass("on");
		if($(this).is(':checked')){
			$('#plug-phone').after('<span class="plug-bg">');
		}else{
			$('.plug-bg').remove();
		}
	});
	$('.main1').delegate('.plug-bg', 'click', function(){
		$("#plug-phone > div").removeClass("on");
		$('#plug-btn').attr('checked', false).prop('checked', false);
		$(this).remove();
	});

	$('.back_top').bTop();

	$('.class_list').sfq();

	// 名庄特卖
	$('.mztm').on('tap', function(event) {
		$(this).find('.jzlist').toggle();
		if($('.jzbg').length < 1){
			$('body').append('<div class="jzbg">');
		}else{
			$('body').remove('.jzbg');
		}

		event.preventDefault();
	});/*
	$(window).on('touchstart', function(){
		$('.jzlist').hide();
	});*/

	$('body').delegate('.jzbg', 'touchstart', function(event) {
		$(this).remove();
		$('.jzlist').hide();
	});
});