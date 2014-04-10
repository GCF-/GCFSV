$(document).ready(function() {
	// hightlighted current page on main menu
	mainMenuHightlighted();
	
	$('#dashboardFilter').focusin(function(){
		$(this).removeAttr('style');
	}).focusout(function(){
		$(this).css({
			'border': 'none',
			'-webkit-box-shadow': 'none',
			'box-shadow': 'none'
		});
	});
	
	//$('#dashboardFilter').focus();
//	$(dbContainerIdSelecteor).resize(function(){
//		$('#cart').css('height', $(this).height());
//	});
	
});

// menu, banner on page
var isBannerDragStarted = false;
/**
 * hightlighted current page on main menu
 */
function mainMenuHightlighted(){
	$('.gcf-menu li').each(function() {
		var href = $(this).find('a').attr('href');
	    if (window.location.pathname.indexOf(href) >= 0) {
			$(this).addClass('menu-selected');
		}
	});
}













