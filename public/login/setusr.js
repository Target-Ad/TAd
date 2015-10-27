$(document).ready(function(){
	$("#signup").click(function(e){
		e.preventDefault();
		account = $("#account").val();
		pw = $("#pw").val();
		$.getJSON('do', {
			action: 'signup', 
			account: account,
			pw:pw 
		}, function(r){
			console.log(r);
		});
	});
});
