$(document).ready(function(){
	var isLog = Cookies.get('login_success');
	if(isLog == "confirm"){
		$(".navbar-fixed-top").append("<div class=\"ui label\" id = \"welcome-div\"><i class=\"user icon\"></i><span id=\"welcome_usr\">welcome  "+Cookies.get('name')+"</span></div>");
		$("#welcome_usr").css("color","#006030").css("font-size","150%");
		$("#log_in").hide();
		$("#log_out").show();
		$("#Register").hide();
		$("#Upload").show();
	}
	else{
	Cookies.set('login_success','failed');
    $("#log_out").hide();
	$("#Upload").hide();
    }
	$("#Upload").click(function(){ $('#overlay, #upload-block').show();});
    $('#overlay').click(function(){
        $('#overlay, #upload-block').hide();
    });
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
	
	$('#overlay').click(function(){
		for(var i =0; i<6;i++)
		{
			$('#overlay, #content-block-img-'+i).hide();
			$('#overlay, #content-block-right-'+i).hide();
		}
    });
    /*ask database for initial ad to post*/
	var appendcontent; 
	var thebody; 
	$.getJSON('do', {
		page: 'homepage',
		action: 'getInitialData',
		name: Cookies.get('name')
	}, function(r){
		console.log(r);
		for(var i =0; i<6;i++){
			appendcontent = "<div class=\"col-sm-4 col-lg-4 col-md-4\"><div class=\"thumbnail\"><img id=\"Ad-image-"+i+"\" src='./postAdImage/"+r.response[i].imag+".jpg'alt=\"\"/><div class=\"caption\" id=\"more_content-"+i+"\"><div class=\"topic\"><p id = \"Ad-topic-"+i+"\">"+r.response[i].topic+"</p></div><div class=\"contents\"><p id =\"Ad-content-"+i+"\">"+r.response[i].content+"</p></div></div><button id =\""+i+"\" class = \"discard\">discard</button><button id =\""+i+"\"class = \"collect\">keep</button></div></div> "; 
			$("#box").append(appendcontent);
			
			thebody = "<div id=\"content-block-img-"+i+"\" class=\"contents-display\"><img id=\"Ad-image-"+i+"\" src='./postAdImage/"+r.response[i].imag+".jpg'alt=\"\"/></div><div id=\"content-block-right-"+i+"\" class=\"contents-display-right\"><div class=\"caption\"><div class=\"topic\"><p id = \"Ad-topic-"+i+"\">"+r.response[i].topic+"</p></div><div class=\"contents\"><p id =\"Ad-content-block-"+i+"\">"+r.response[i].content+"</p></div></div><div class=\"row\" style=\"padding-top:15px;\"><div class=\"col-md-12\" ><div class=\"comment-container\" ><div class=\"col-md-1\" style=\"width: 50px;\"><img src=\"images/1.png\" /></div><div class=\"col-md-10\"><b>Syuan</b></div><div class=\"col-md-10\" style=\"background-color: #fff; height: 25px;\">It's so good. I can buy what I want !</div></div></div><div class=\"col-md-12\" ><div class=\"col-md-1\" style=\"width: 40px;\"><img src=\"images/1.png\" /></div><div class=\"col-md-11\"><input type=\"text\" class=\"form-control col-md-4\" placeholder=\"please leave a message\"></div></div></div></div>";
			$("#thebody").append(thebody);
			
			$("#more_content-"+i).click(function(){
				var id =  $(this).attr('id');
				id = id.split('-');
				$('#overlay, #content-block-img-'+id[1]).show();
				$('#overlay, #content-block-right-'+id[1]).show();

			});
		}
		$(".discard").click(function(e){
			var id = $(this).attr("id");
			console.log(id);
			var data;
			data = {
				page: 'homepage',
				action: 'askForNewAd',
				type: 'discard'
			};
			if (Cookies.get('login_success' === 'confirm')) {
			  data.user = Cookies.get('name');
			  }

			$.getJSON('do', data, 
			function(r){
				$("#Ad-image-"+id).attr("src", "./postAdImage/"+r.imag+".jpg");
				$("#Ad-topic-"+id).text(r.topic);
				$("#Ad-content-"+id).text(r.content);
			});
		});

	});
	$('#uploadForm').submit(function() {
		$("#status").empty().text("File is uploading...");
		$(this).ajaxSubmit({

			error: function(xhr) {
				status('Error: ' + xhr.status);
			},

			success: function(response) {
				$("#status").empty().text(response);
				console.log(response);
			}
		});
		/**
		$.getJSON('do', serialForm, 
		function(r){
			console.log("Ad is uploaded");
		});
		**/
		//Very important line, it disable the page refresh.
		return false;
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
				$(".navbar-fixed-top").append("<div class=\"ui label\" id = \"welcome-div\"><i class=\"user icon\"></i><span id=\"welcome_usr\">welcome  "+name+"</span></div>");
				$("#welcome_usr").css("color","#006030").css("font-size","150%");
				Cookies.set('login_success','confirm',{expires:15, path:'/'});
				Cookies.set('name',name,{expires:15, path:'/'});
				$("#Register").hide();
				$("#log_out").show();
				$("#log_in").hide();
				$("#Upload").show();
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
		$("#Upload").hide();
	});
	$("#regis_btn").click(function(e){
		e.preventDefault();
		account = $("#regis_usr").val();
		pw = $("#regis_pw").val();
		repw = $("#regis_pw_re").val();
		mail = $('#regis_mail').val();
        type = $('.select[selected]')
        if (!account || !pw || !repw || 3 > type.length || 5 < type.length)
            return alert('error');
        arr = [];
        for (i = 0; i < type.length; i++) 
            arr.push(($(type[i]).attr('id')).replace('type_',''));

		if(repw === pw){
			console.log("pw ="+pw+"\naccount ="+account);
			$('#overlay, #regis-block').hide();
			$.getJSON('do', {
				page: 'homepage',
				action: 'register', 
				account: account,
				pw:pw,
			}, function(r){
				console.log(r);
			});
		}
		else{
			alert("check your password again");
		}
		
	});

	//處理回傳資料格式+存入DB
	function fb_login(){
		console.log(Cookies.get('login_success'));
		var pattern, code, data;
		pattern = new RegExp("code=(.*)");
		isGetCode = pattern.exec(location.href);
		if (isGetCode) {
			if(Cookies.get('login_success')!="confirm"){
				console.log('login failed');
				$.getJSON('do', {
					page: 'homepage',
					action: 'getFbUsrData',
					code: isGetCode[1]
				}, function(r){
					console.log(r);
					console.log(r.name);
					$(".navbar-fixed-top").append("<div class=\"ui label\" id = \"welcome-div\"><i class=\"user icon\"></i><span id=\"welcome_usr\">welcome  "+r.name+"</span></div>");
					$("#welcome_usr").css("color","#006030").css("font-size","150%");
					Cookies.set('login_success','confirm',{expires:15, path:'/'});
					Cookies.set('name',r.name,{expires:15, path:'/'});
					$("#Register").hide();
					$("#log_out").show();
					$("#log_in").hide();
					$("#Upload").show();
				});
			}
			else{
				location.href = "http://luffy.ee.ncku.edu.tw:8451/homepage/homepage.html";
			}
		} else {
			return $('#fb-login').click(function(){
			      location.href = 'https://www.facebook.com/dialog/oauth?client_id=910359615717780&redirect_uri=http://luffy.ee.ncku.edu.tw:8451/homepage/homepage.html';
			});
			}
	} fb_login();

});
