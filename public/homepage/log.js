$(document).ready(function(){
	AdArray=[];
	period = 0;
	$('#userpage').hide();
	$('#btn_main').hide();
	$("#mypage").hide();
	var isLog = Cookies.get('login_success');
	if(isLog == "confirm"){
		
		$("#welcome_usr").css("color","#006030").css("font-size","150%");
		$("#log_in").hide();
		$("#log_out").show();
		$("#Register").hide();
		$("#Upload").show();
		$("#mypage").show();
	}
	else{
	Cookies.set('login_success','failed');
    $("#log_out").hide();
	$("#Upload").hide();
    }
	$("#Upload").click(function(){
		$('#overlay, #upload-block').show();
		$('#overlay2, #mypage-block').hide();
	});
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
			rough = r.response[i].discription.substring(0, 20);
			console.log(rough);
			appendcontent = "<div class=\"col-sm-4 col-lg-4 col-md-4\"><div class=\"thumbnail\" id=\"thumbnail-"+i+"\"><div id=\"image-container-"+i+"\" class = \"Ad-image\"><img id=\"Ad-image-"+i+"\" src='./postAdImage/"+r.response[i].imag+".jpg'alt=\"\"/></div><div class=\"caption\" id=\"more_content-"+i+"\"><div class=\"topic\"><p id = \"Ad-topic-"+i+"\">"+r.response[i].topic+"</p></div><div><span id=\"clock-start-"+i+"\"></span></div><div><span id=\"clock-end-"+i+"\"></span></div><div class=\"contents\"><p id =\"Ad-content-"+i+"\">"+r.response[i].discription.substring(0, 20)+".... read more"+"</p></div></div><button id =\""+i+"\" class = \"discard\">discard</button><button id =\""+i+"\"class = \"collect\">keep</button></div></div> "; 
			AdArray[i] = r.response[i]._id;
			$("#box").append(appendcontent);
			$("#clock-end-"+i).hide();
			$('#clock-start-'+i).countdown(r.response[i].period[0].start)
			.on('update.countdown', function(event) {
				var format = '%H:%M:%S';
				if(event.offset.days > 0) {
					format = '%-d day%!d ' + format;
				}
				if(event.offset.weeks > 0) {
					format = '%-w week%!w ' + format;
				}
				$(this).html(event.strftime(format));
			})
			.on('finish.countdown', function(event) {
				$('#clock-end-'+i).show();
				$('#clock-start-'+i).hide();
				$(this).html("Already Expired")
				.parent().addClass('disabled');
			});
			$('#clock-end-'+i).countdown(r.response[i].period[0].end)
			.on('update.countdown', function(event) {
				var format = '%H:%M:%S';
				if(event.offset.days > 0) {
					format = '%-d day%!d ' + format;
				}
				if(event.offset.weeks > 0) {
					format = '%-w week%!w ' + format;
				}
				$(this).html(event.strftime(format));
			})
			.on('finish.countdown', function(event) {
				$(this).html("Already Expired")
				.parent().addClass('disabled');
			});
			thebody = "<div id=\"content-block-img-"+i+"\" class=\"contents-display\"><img id=\"Ad-image-"+i+"\" src='./postAdImage/"+r.response[i].imag+".jpg'alt=\"\"/></div><div id=\"content-block-right-"+i+"\" class=\"contents-display-right\"><div class=\"caption\"><div class=\"topic\"><p id = \"Ad-topic-"+i+"\">"+r.response[i].topic+"</p></div><div class=\"contents\"><p id =\"Ad-content-block-"+i+"\">"+r.response[i].discription+"</p></div></div><div class=\"row\" style=\"padding-top:15px;\"><div class=\"col-md-12\" ><div class=\"comment-container\" ><div class=\"col-md-1\" style=\"width: 50px;\"><img src=\"images/1.png\" /></div><div class=\"col-md-10\"><b>Syuan</b></div><div class=\"col-md-10\" style=\"background-color: #fff; height: 25px;\">It's so good. I can buy what I want !</div></div></div><div class=\"col-md-12\" ><div class=\"col-md-1\" style=\"width: 40px;\"><img src=\"images/1.png\" /></div><div class=\"col-md-11\"><input type=\"text\" class=\"form-control col-md-4\" placeholder=\"please leave a message\"></div></div></div></div>";
			$("#thebody").append(thebody);
			
			$("#more_content-"+i).click(function(){
				var id =  $(this).attr('id');
				id = id.split('-');
				$('#overlay, #content-block-img-'+id[1]).show();
				$('#overlay, #content-block-right-'+id[1]).show();

			});
		}
		console.log(AdArray);
		$(".collect").click(function(e){
			var id = $(this).attr("id");
			console.log(id);
			var data;
			console.log(AdArray);
			data = {
				page: 'homepage',
				action: 'askForNewAd',
				type: 'keep',
				Ad_id: AdArray[id]
			};
			if (Cookies.get('login_success' === 'confirm')) {
			  data.account = Cookies.get('name');
			  data.usr_id = Cookies.get('_id');
			  }
			console.log(data);
			$.getJSON('do', data, 
			function(r){
				$("#image-container-"+id).remove();
				$("#Ad-image-"+id).remove();
				$("<div id=\"image-container-"+id+"\" class = \"Ad-image\"><img id=\"Ad-image-"+id+"\" src='./postAdImage/"+r.imag+".jpg'alt=\"\"/></div>").insertBefore("#more_content-"+id);
				$("#Ad-topic-"+id).text(r.topic);
				$("#Ad-content-"+id).text(r.discription);
				AdArray[id] = r._id;
			});
		});
		$(".discard").click(function(e){
			var id = $(this).attr("id");
			console.log(id);
			console.log(AdArray);
			var data;
			data = {
				page: 'homepage',
				action: 'askForNewAd',
				type: 'discard',
				Ad_id: AdArray[id]
			};
			if (Cookies.get('login_success' === 'confirm')) {
			  data.account = Cookies.get('name');
			  data.usr_id = Cookies.get('_id');
			  }
			console.log(data);
			$.getJSON('do', data, 
			function(r){
				$("#image-container-"+id).remove();
				$("#Ad-image-"+id).remove();
				$("<div id=\"image-container-"+id+"\" class = \"Ad-image\"><img id=\"Ad-image-"+id+"\" src='./postAdImage/"+r.imag+".jpg'alt=\"\"/></div>").insertBefore("#more_content-"+id);
				$("#Ad-topic-"+id).text(r.topic);
				$("#Ad-content-"+id).text(r.discription);
				AdArray[id] = r._id;
			});
		});

	});
	$('#ad-owner').hide();
	$('#ad-owner').attr('value', Cookies.get("_id"));
	$('#uploadForm').submit(function() {
		period = 0;
		$(this).ajaxSubmit({

			error: function(xhr) {
				status('Error: ' + xhr.status);
			},

			success: function(response) {
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
				console.log(r);
				var name = account;
				console.log("pw confirm stage");
				$('#overlay, #login-block').hide();
				$(".navbar-fixed-top").append("<div class=\"ui label\" id = \"welcome-div\"><i class=\"user icon\"></i><span id=\"welcome_usr\">welcome  "+name+"</span></div>");
				$("#welcome_usr").css("color","#006030").css("font-size","150%");
				Cookies.set('login_success','confirm',{expires:15, path:'/'});
				Cookies.set('name',name,{expires:15, path:'/'});
				Cookies.set('_id', r._id, {expires:15, path:'/'});
				$("#Register").hide();
				$("#log_out").show();
				$("#log_in").hide();
				$("#Upload").show();
				$("#mypage").show();
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
		$('#mypage').hide();
		$('#userpage').hide();
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
					if(r.picture.data.url){
						$("#welcome-div").append("<img src=\""+r.picture.data.url+"\"/>");
					}
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
	$("#time-plus").click(function(){
		$("#period-"+period).append("<div id = \"period-"+(period+1)+"\" class=\"period\"><input class= \"from\" id=\"datetimepicker1\" type=\"text\" name=\"start_time\">~ <input class=\"end\" id=\"datetimepicker2\" type=\"text\" name=\"end_time\"></div>");
		period++;
	});

});
