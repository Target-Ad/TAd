$(document).ready(function(){
    $("#log_in").click(function(){		
        $('#overlay, #login-block').show();
    });
      
    var height = $('body').css('height');
    $('#overlay').css('height', height);
    
    $('#overlay').click(function(){
        $('#overlay, #login-block').hide();
    });
    
     $("#Register").click(function(){		
     $('#overlay, #regis-block').show();
    });
      
    var height = $('body').css('height');
    $('#overlay').css('height', height);
    
    $('#overlay').click(function(){
        $('#overlay, #regis-block').hide();
    });
    


	$("#login_btn").click(function(e){
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
			if(r.success === "pw confirm"){
				console.log("pw confirm stage");
				$('#overlay, #login-block').hide();
				$(".navbar-fixed-top").append("<div class=\"ui label\" ><i class=\"user icon\"></i><span id=\"welcome_usr\">welcome"+account+"</span></div>");
				$("#welcome_usr").css("color","#006030").css("font-size","150%");
			}
			console.log(r);
		});
	});
	$("#regis_btn").click(function(e){
		e.preventDefault();
		account = $("#regis_usr").val();
		pw = $("#regis_pw").val();
		repw = $("#regis_pw_re").val();
		if(repw === pw){
			console.log("pw ="+pw+"\naccount ="+account);
			$.getJSON('do', {
				page: 'homepage',
				action: 'register', 
				account: account,
				pw:pw 
			}, function(r){
				console.log(r);
			});
		}
		else{
			alert("check your password again");
		}
		
	});
});
