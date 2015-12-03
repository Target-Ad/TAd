$('.select').click(function(){
    if($(this).attr('selected'))
        $(this).removeAttr('selected');
    else if( 5 > $('.select[selected]').length)
        $(this).attr('selected','');
});