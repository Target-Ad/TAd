$(document).ready(function(){
    $("#log_in").click(function(){
        $('#overlay, #login-block').show();
    });
    
    $('#overlay').click(function(){
        $('#overlay, #login-block').hide();
    });
    
    
    
    var height = $('body').css('height');
    $('#overlay').css('height', height);
});