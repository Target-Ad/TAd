$('.select').click(function(){	
    if($(this).attr('selected'))
        $(this).removeAttr('selected');
    else if( 5 > $('.select[selected]').length)
        $(this).attr('selected','');
});


  $('#POST').hide();


$("#mypage").click(function(){
	$("#title-keep").show();
		data={
			page: 'homepage',
			action: 'askForUsrInform',
			usr_id: Cookies.get('_id') 
		};
		$.getJSON('do', data, 
		function(r){
			for(var i=0; i<r.keepAd.length; i++){
				appendcontent = "<div id=\"keepAdAll-"+i+"\">";
				appendcontent = appendcontent+ "<div class=\"col-sm-4 col-lg-4 col-md-4\"><div class=\"thumbnail\" id=\"thumbnail-"+i+"\"><div id=\"image-container-"+i+"\" class = \"Ad-image\"><img id=\"Ad-image-"+i+"\" src='./postAdImage/"+r.keepAd[i].imag+".jpg'alt=\"\"/></div><div class=\"caption\" id=\"more_content-keepAd-"+i+"\"><div class=\"topic\"><p id = \"Ad-topic-"+i+"\">"+r.keepAd[i].topic+"</p></div><div><span id=\"clock-start-"+i+"\"></span></div><div><span id=\"clock-end-"+i+"\"></span></div><div class=\"contents\"><p id =\"Ad-content-"+i+"\">"+r.keepAd[i].discription.substring(0, 20)+".... read more"+"</p></div></div></div></div> "; 
				appendcontent = appendcontent+ "</div>";
				$("#user-box").append(appendcontent);
				$("#clock-end-"+i).hide();
				$('#clock-start-'+i).countdown(r.keepAd[i].period[0].start)
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
				$('#clock-end-'+i).countdown(r.keepAd[i].period[0].end)
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
				thebody = "<div id=\"content-block-img-keepAd-"+i+"\" class=\"contents-display\"><img id=\"block-Ad-image-"+i+"\" src='./postAdImage/"+r.keepAd[i].imag+".jpg'alt=\"\"/></div><div id=\"content-block-right-keepAd-"+i+"\" class=\"contents-display-right\"><div class=\"caption\"><div class=\"topic\"><p id = \"Ad-topic-"+i+"\">"+r.keepAd[i].topic+"</p></div><div class=\"shop\"><p id = \"Ad-shop-"+i+"\">"+r.keepAd[i].shop+"</p></div><div class=\"contents\"><p id =\"Ad-content-block-"+i+"\">"+r.keepAd[i].discription+"</p></div></div><div class=\"row\" style=\"padding-top:15px;\"><div class=\"col-md-12\" ><div class=\"comment-container\" ><div class=\"col-md-1\" style=\"width: 50px;\"><img src=\"images/1.png\" /></div><div class=\"col-md-10\"><b>Syuan</b></div><div class=\"col-md-10\" style=\"background-color: #fff; height: 25px;\">It's so good. I can buy what I want !</div></div></div><div class=\"col-md-12\" ><div class=\"col-md-1\" style=\"width: 40px;\"><img src=\"images/1.png\" /></div><div class=\"col-md-11\"><input type=\"text\" class=\"form-control col-md-4\" placeholder=\"please leave a message\"></div></div></div></div>";
				$("#thebody").append(thebody);
				
				$("#more_content-keepAd-"+i).click(function(){
					console.log("sdf");
					var id =  $(this).attr('id');
					id = id.split('-');
					$('#overlay, #content-block-img-keepAd-'+id[2]).show();
					$('#overlay, #content-block-right-keepAd-'+id[2]).show();

				});
				
				$('#overlay').click(function(){		
				for(var i =0; i<r.keepAd.length;i++)		
				{		
					$('#overlay, #content-block-img-keepAd-'+i).hide();		
					$('#overlay, #content-block-right-keepAd-'+i).hide();		
				}		
			});
			}	
		});
        $('#mainpage').hide();
        $('#mypage').hide();
        $('#userpage').show();
        $('#btn_main').show();
		$('#Survey').hide();//±N°Ý¨éÃö³¬
    });	


$("#btn_main").click(function(){
		$("#title-keep").hide();
		$("#title-post").hide();
        $('#mainpage').show();
        $('#mypage').show();
        $('#userpage').hide();
        $('#btn_main').hide();
		data={
			page: 'homepage',
			action: 'askForUsrInform',
			usr_id: Cookies.get('_id') 
		};
		$.getJSON('do', data, 
		function(r){
			//delete all the Ad on the user page
			for(var i=0; i<r.postAd.length; i++)
			{
				$("#postAdAll-"+i).remove();
			}
			for(var i=0; i<r.keepAd.length; i++)
			{
				$("#keepAdAll-"+i).remove();
			}
		});
    });	



$("#li_pos").click(function(){
		$("#title-keep").hide();
		$("#title-post").show();
		
		data={
			page: 'homepage',
			action: 'askForUsrInform',
			usr_id: Cookies.get('_id') 
		};
		$.getJSON('do', data, 
		function(r){
			//delete all the Ad on the user page
			for(var i=0; i<r.postAd.length; i++)
			{
				$("#postAdAll-"+i).remove();
			}
			for(var i=0; i<r.keepAd.length; i++)
			{
				$("#keepAdAll-"+i).remove();
			}
			for(var i=0; i<r.postAd.length; i++){
				
				appendcontent = "<div id=\"postAdAll-"+i+"\">";
				appendcontent = appendcontent+ "<div class=\"col-sm-4 col-lg-4 col-md-4\"><div class=\"thumbnail\" id=\"thumbnail-"+i+"\"><div id=\"image-container-"+i+"\" class = \"Ad-image\"><img id=\"Ad-image-"+i+"\" src='./postAdImage/"+r.postAd[i].imag+".jpg'alt=\"\"/></div><div class=\"caption\" id=\"more_content-postAd-"+i+"\"><div class=\"topic\"><p id = \"Ad-topic-"+i+"\">"+r.postAd[i].topic+"</p></div><div><span id=\"clock-start-"+i+"\"></span></div><div><span id=\"clock-end-"+i+"\"></span></div><div class=\"contents\"><p id =\"Ad-content-"+i+"\">"+r.postAd[i].discription.substring(0, 20)+".... read more"+"</p></div></div></div></div> "; 
				appendcontent = appendcontent+ "</div>";
				$("#user-box").append(appendcontent);
				$("#clock-end-"+i).hide();
				$('#clock-start-'+i).countdown(r.postAd[i].period[0].start)
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
				$('#clock-end-'+i).countdown(r.postAd[i].period[0].end)
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
				thebody = "<div id=\"content-block-img-postAd-"+i+"\" class=\"contents-display\"><img id=\"block-Ad-image-"+i+"\" src='./postAdImage/"+r.postAd[i].imag+".jpg'alt=\"\"/></div><div id=\"content-block-right-postAd-"+i+"\" class=\"contents-display-right\"><div class=\"caption\"><div class=\"topic\"><p id = \"Ad-topic-"+i+"\">"+r.postAd[i].topic+"</p></div><div class=\"shop\"><p id = \"Ad-shop-"+i+"\">"+r.postAd[i].shop+"</p></div><div class=\"contents\"><p id =\"Ad-content-block-"+i+"\">"+r.postAd[i].discription+"</p></div></div><div class=\"row\" style=\"padding-top:15px;\"><div class=\"col-md-12\" ><div class=\"comment-container\" ><div class=\"col-md-1\" style=\"width: 50px;\"><img src=\"images/1.png\" /></div><div class=\"col-md-10\"><b>Syuan</b></div><div class=\"col-md-10\" style=\"background-color: #fff; height: 25px;\">It's so good. I can buy what I want !</div></div></div><div class=\"col-md-12\" ><div class=\"col-md-1\" style=\"width: 40px;\"><img src=\"images/1.png\" /></div><div class=\"col-md-11\"><input type=\"text\" class=\"form-control col-md-4\" placeholder=\"please leave a message\"></div></div></div></div>";
				$("#thebody").append(thebody);
				
				$("#more_content-postAd-"+i).click(function(){
					var id =  $(this).attr('id');
					id = id.split('-');
					$('#overlay, #content-block-img-postAd-'+id[2]).show();
					$('#overlay, #content-block-right-postAd-'+id[2]).show();

				});
				
			}	
			
			$('#overlay').click(function(){		
				for(var i =0; i<r.postAd.length;i++)		
				{		
					$('#overlay, #content-block-img-postAd-'+i).hide();		
					$('#overlay, #content-block-right-postAd-'+i).hide();		
				}		
			});
		});

    });	

$("#li_col").click(function(){
		$("#title-keep").show();
		$("#title-post").hide();
		data={
			page: 'homepage',
			action: 'askForUsrInform',
			usr_id: Cookies.get('_id') 
		};
		$.getJSON('do', data, 
		function(r){
			//delete all the Ad on the user page
			for(var i=0; i<r.postAd.length; i++)
			{
				$("#postAdAll-"+i).remove();
			}
			for(var i=0; i<r.keepAd.length; i++)
			{
				$("#keepAdAll-"+i).remove();
			}
			for(var i=0; i<r.keepAd.length; i++){
				appendcontent = "<div id=\"keepAdAll-"+i+"\">";
				appendcontent = appendcontent+ "<div class=\"col-sm-4 col-lg-4 col-md-4\"><div class=\"thumbnail\" id=\"thumbnail-"+i+"\"><div id=\"image-container-"+i+"\" class = \"Ad-image\"><img id=\"Ad-image-"+i+"\" src='./postAdImage/"+r.keepAd[i].imag+".jpg'alt=\"\"/></div><div class=\"caption\" id=\"more_content-keepAd-"+i+"\"><div class=\"topic\"><p id = \"Ad-topic-"+i+"\">"+r.keepAd[i].topic+"</p></div><div><span id=\"clock-start-"+i+"\"></span></div><div><span id=\"clock-end-"+i+"\"></span></div><div class=\"contents\"><p id =\"Ad-content-"+i+"\">"+r.keepAd[i].discription.substring(0, 20)+".... read more"+"</p></div></div></div></div> "; 
				appendcontent = appendcontent+ "</div>";
				$("#user-box").append(appendcontent);
				$("#clock-end-"+i).hide();
				$('#clock-start-'+i).countdown(r.keepAd[i].period[0].start)
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
				$('#clock-end-'+i).countdown(r.keepAd[i].period[0].end)
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
				thebody = "<div id=\"content-block-img-keepAd-"+i+"\" class=\"contents-display\"><img id=\"block-Ad-image-"+i+"\" src='./postAdImage/"+r.keepAd[i].imag+".jpg'alt=\"\"/></div><div id=\"content-block-right-keepAd-"+i+"\" class=\"contents-display-right\"><div class=\"caption\"><div class=\"topic\"><p id = \"Ad-topic-"+i+"\">"+r.keepAd[i].topic+"</p></div><div class=\"contents\"><p id =\"Ad-content-block-"+i+"\">"+r.keepAd[i].discription+"</p></div></div><div class=\"row\" style=\"padding-top:15px;\"><div class=\"col-md-12\" ><div class=\"comment-container\" ><div class=\"col-md-1\" style=\"width: 50px;\"><img src=\"images/1.png\" /></div><div class=\"col-md-10\"><b>Syuan</b></div><div class=\"col-md-10\" style=\"background-color: #fff; height: 25px;\">It's so good. I can buy what I want !</div></div></div><div class=\"col-md-12\" ><div class=\"col-md-1\" style=\"width: 40px;\"><img src=\"images/1.png\" /></div><div class=\"col-md-11\"><input type=\"text\" class=\"form-control col-md-4\" placeholder=\"please leave a message\"></div></div></div></div>";
				$("#thebody").append(thebody);
				
				$("#more_content-keepAd-"+i).click(function(){
					console.log("sdf");
					var id =  $(this).attr('id');
					id = id.split('-');
					$('#overlay, #content-block-img-keepAd-'+id[2]).show();
					$('#overlay, #content-block-right-keepAd-'+id[2]).show();

				});
				
				$('#overlay').click(function(){		
				for(var i =0; i<r.keepAd.length;i++)		
				{		
					$('#overlay, #content-block-img-keepAd-'+i).hide();		
					$('#overlay, #content-block-right-keepAd-'+i).hide();		
				}		
			});
			}	
		});
		
    });	


$("#username").append("<p>"+Cookies.get('name')+"</p>");
