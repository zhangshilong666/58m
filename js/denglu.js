$(function(){
	$('input').focus(function(){
		$('footer').hide();
	})
	$('input').focusout(function(){
		$('footer').show();
	})
	
	//表单验证
	
	$('#button').click(function(){
		var str = 'username='+$('#username').val()+'&passward='+$('#passward').val();
		console.log(str)
		$.post('denglu.php','str',function(e){
			
		})
		return false;
	})
})
