$('.select').click(function(){
    if($(this).attr('selected'))
        $(this).removeAttr('selected');
    else if( 5 > $('.select[selected]').length)
        $(this).attr('selected','');
});


  $('#POST').hide();


$("#mypage").click(function(){		
        $('#mainpage').hide();
        $('#mypage').hide();
        $('#userpage').show();
        $('#btn_main').show();
    });	


$("#btn_main").click(function(){		
        $('#mainpage').show();
        $('#mypage').show();
        $('#userpage').hide();
        $('#btn_main').hide();
    });	



$("#li_pos").click(function(){		
        $('#POST').show();
        $('#COLLECTION').hide();

    });	

$("#li_col").click(function(){		
        $('#POST').hide();
        $('#COLLECTION').show();

    });	


$("#username").append("<p>"+Cookies.get('name')+"</p>");
