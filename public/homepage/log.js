$(document).ready(function(){
    $("#log_in").click(function(){		
        $('#overlay, #login-block').show();
    });
    
    $('#overlay').click(function(){
        $('#overlay, #login-block').hide();
    });
    
     $("#Register").click(function(){		
     $('#overlay, #regis-block').show();
    });
    
    $('#overlay').click(function(){
        $('#overlay, #regis-block').hide();
    });
    
    
    
    
    var height = $('body').css('height');
    $('#overlay').css('height', height);

	$("#login__btn").click(function(e){
		e.preventDefault();
		account = $("#login_usr").val();
		pw = $("#login_pw").val();
		console.log("pw ="+pw+"\naccount ="+account);
		$.getJSON('do', {
			page: 'homepage',
			action: 'login', 
			account: account,
			pw:pw 
		}, function(r){
			console.log(r);
		});
	});
	$("#regis_btn").click(function(e){
		e.preventDefault();
		account = $("#regis_usr").val();
		pw = $("#regis_pw").val();
		console.log("pw ="+pw+"\naccount ="+account);
		$.getJSON('do', {
			page: 'homepage',
			action: 'register', 
			account: account,
			pw:pw 
		}, function(r){
			console.log(r);
		});
		
		
	});
});
