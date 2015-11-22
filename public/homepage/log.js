$(document).ready(function(){
	var isLog = Cookies.get('login_success');
	if(isLog == "confirm"){
		$(".navbar-fixed-top").append("<div class=\"ui label\" id = \"welcome-div\"><i class=\"user icon\"></i><span id=\"welcome_usr\">welcome"+Cookies.get('name')+"</span></div>");
		$("#welcome_usr").css("color","#006030").css("font-size","150%");
		$("#log_in").hide();
		$("#log_out").show();
		$("#Register").hide();
	}
	else{
    $("#log_out").hide();
    }
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
				var name = account;
				console.log("pw confirm stage");
				$('#overlay, #login-block').hide();
				$(".navbar-fixed-top").append("<div class=\"ui label\" id = \"welcome-div\"><i class=\"user icon\"></i><span id=\"welcome_usr\">welcome"+name+"</span></div>");
				$("#welcome_usr").css("color","#006030").css("font-size","150%");
				Cookies.set('login_success','confirm',{expires:15, path:'/'});
				Cookies.set('name',name,{expires:15, path:'/'});
				$("#Register").hide();
				$("#log_out").show();
				$("#log_in").hide();
			}		
			console.log(r);
		});
	});
	$("#log_out").click(function(){
		Cookies.set('login_success', 'failed');
		$("#welcome-div").remove();
		$("#Register").show();
		$("#log_in").show();
		$("#log_out").hide();
	});
	$("#regis_btn").click(function(e){
		e.preventDefault();
		account = $("#regis_usr").val();
		pw = $("#regis_pw").val();
		repw = $("#regis_pw_re").val();
		if(repw === pw){
			console.log("pw ="+pw+"\naccount ="+account);
			$('#overlay, #regis-block').hide();
			$.getJSON('do', {
				page: 'homepage',
				action: 'register', 
				account: account,
				pw:pw,
				postAd:[]
			}, function(r){
				console.log(r);
			});
		}
		else{
			alert("check your password again");
		}
		
	});


	function google_login(){
		var pattern, code, data;
		pattern = new RegExp("code=(.*)");
		isGetCode = pattern.exec(location.href);
		if (isGetCode) {
			if(Cookies.get('login_success')!="confirm"){
				$('#google-login').click(function(){
				$.getJSON('do', {
					page: 'homepage',
					action: 'getUsrData',
					code: isGetCode[1]
				}, function(r){
					console.log(r);
					$(".navbar-fixed-top").append("<div class=\"ui label\" id = \"welcome-div\"><i class=\"user icon\"></i><span id=\"welcome_usr\">welcome"+r.name+"</span></div>");
					$("#welcome_usr").css("color","#006030").css("font-size","150%");
					Cookies.set('login_success','confirm',{expires:15, path:'/'});
					Cookies.set('name',r.name,{expires:15, path:'/'});
					$("#Register").hide();
					$("#log_out").show();
					$("#log_in").hide();
				});
				});
			}
			else{
				location.href = "http://luffy.ee.ncku.edu.tw:8451/homepage/homepage.html";
			}
		} else {
			return $('#google-login').click(function(){
				$.getJSON('do', {
					page: 'homepage',
					action: 'getAuthUrl', 
				}, function(r){
					console.log("response get from server =\n"+r)
					location.href = r;
				});
			
			});
			}
	} google_login();
	

});
