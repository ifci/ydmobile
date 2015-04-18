(function($){
	$.fn.Spinner = function(opts){
		var stock = $("#stock").val();
		var defaults = {
			value:1,
			min:1,
			len:3,
			max:stock
		}, options = $.extend(defaults, opts), keyCodes = { up : 38, down : 40 };
		return this.each(function() {
			var a = $(this).find('.sub');
			var c = $(this).find('.add');
			var b = $(this).find('.buy_num');
			cv(0);	//值
			$(this).append(a).append(b).append(c);
			a.click(function(){
				cv(-1);
			});
			b.keyup(function(){
				cv(0);
			});
			c.click(function(){
				cv(+1);
			});
			b.bind('keyup paste change',function(e){
				e.keyCode==keyCodes.up&&cv(+1);
				e.keyCode==keyCodes.down&&cv(-1);
			});
			
			function cv(n){
				b.val(b.val().replace(/[^\d]/g,''));
				bv = parseInt( b.val() || options.min ) + n;
				bv >= options.min && bv <= options.max && b.val( bv );
			}
		})
	}
})(Zepto);