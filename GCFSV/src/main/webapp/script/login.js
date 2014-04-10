$(function() {
    setTimeout(function() {
        $("#j_username").focus().select();
    }, 100);
    
    $.eraseCookie('filterSttCd');
});