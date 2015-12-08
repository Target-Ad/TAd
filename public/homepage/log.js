$(document).ready(function(){
	var isLog = Cookies.get('login_success');
	if(isLog == "confirm"){
		$(".navbar-fixed-top").append("<div class=\"ui label\" id = \"welcome-div\"><i class=\"user icon\"></i><span id=\"welcome_usr\">welcome  "+Cookies.get('name')+"</span></div>");
		$("#welcome_usr").css("color","#006030").css("font-size","150%");
		$("#log_in").hide();
		$("#log_out").show();
		$("#Register").hide();
		$("#Upload").show();
		$("#mypage").show();
	}
	else{
    $("#log_out").hide();
	$("#Upload").hide();
	$("#mypage").hide();
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
	
	$("#mypage").click(function(){		
        $('#overlay2, #mypage-block').show();
    });		
    var height = $('body').css('height');
    $('#overlay2').css('height', height);
    
	$('#overlay2').click(function(){
        $('#overlay2, #mypage-block').hide();
    });
	   
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
    /*ask database for initial ad to post*/
	var appendcontent; 
	$.getJSON('do', {
		page: 'homepage',
		action: 'getInitialData',
		name: Cookies.get('name')
	}, function(r){
		console.log(r);
		for(var i =0; i<6;i++){
			appendcontent = "<div class=\"col-sm-4 col-lg-4 col-md-4\"><div class=\"thumbnail\"><img id=\"Ad-image-"+i+"\" src='./postAdImage/"+r.response[i].imag+".jpg'alt=\"\"/><div class=\"caption\"><div class=\"topic\"><p id = \"Ad-topic-"+i+"\">"+r.response[i].topic+"</p></div><div class=\"contents\"><p id =\"Ad-content-"+i+"\">"+r.response[i].content+"</p></div></div><button id =\""+i+"\" class = \"discard\">discard</button><button id =\""+i+"\"class = \"collect\">keep</button></div></div> "; 
			$("#box").append(appendcontent);
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

	
	//在前端頁面處理仍有一些邏輯問題要解決 設法區別再拿到code之後重新整理得狀況
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
	
	var logic = function( currentDateTime ){
    // 'this' is jquery object datetimepicker
    if( currentDateTime.getDay()==6 ){
    this.setOptions({
      minTime:'11:00'
    });
    }else
    this.setOptions({
      minTime:'8:00'
    });
    };
    $('#datetimepicker1').datetimepicker({
    onChangeDateTime:logic,
    onShow:logic
    });
	$('#datetimepicker2').datetimepicker({
    onChangeDateTime:logic,
    onShow:logic
    });

});
