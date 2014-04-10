
var appName = "/gcf";

$(document).ready(function() {
	bannerHover();
	bannerItemDrag();
	$.gcfDragDrop();
//	$(dbContainerIdSelecteor).resize(function(){
//	$('#cart').css('height', $(this).height());
//});
	
	if($.readCookie('filterSttCd')){
		var sttKey = $.readCookie('filterSttCd');
		if(sttKey != 'all'){
			$('#dashboard-banner').removeClass('banner-selected');
			$('#group-' + sttKey).addClass(sttKey + '-item-selected');
		}
	}
});

$.gcfDragDrop = function(){
	init();	
};


function showLoadingBar(element){
	var loading = '<div id="loading-bar"></div>';
//	var loading = '<div id="loading-bar">'
//		+ '<div class="progress progress-striped active">'
//		+ '<div class="progress-bar"  role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div></div>';
//	
	var loadingObj = $($.parseHTML(loading));
	
	$(loadingObj).css({
		'position': 'absolute',
		'width': '100%',
		'height': '100%',
		'background': 'url(' + appName + '/image/spinner_squares_circle.gif) center no-repeat #fff',
		'opacity': '0.8',
		'top': 0,
		'left': 0
	});
	
	$(element).append(loadingObj);
}

function destroyLoadingBar(){
	$(document).find('#loading-bar').remove();
}

/************************************************************************************************************
Banner
************************************************************************************************************/

function bannerHover(){
	var isSelected = false;
	var grpId = "";
	var clsName = "";
	var clsNameIco = "";
	var bnItemName = "";

	$('#dashboard-banner .item-cnt').hover(function(){
			grpId = $(this).attr('id') + "";
			var array = grpId.split("-");
			bnItemName = array[array.length - 1];
			clsNameIco = "fa-selected-" + bnItemName;
			clsName = bnItemName + "-item-selected";
			
			var classes = $(this).attr('class').split(" ");
			isSelected = ($.inArray(clsName, classes) != -1);
			
			if(grpId != "group-all"){
				$(this).find('i').addClass(clsNameIco);
			}else{
				isSelected = ($.inArray('banner-selected', $('#dashboard-banner').attr('class').split(" ")) != -1);
			}
		},
	
		function(){	// mouseleave
			grpId = $(this).attr('id') + "";
			var array = grpId.split("-");
			bnItemName = array[array.length - 1];
			clsNameIco = "fa-selected-" + bnItemName;
			clsName = bnItemName + "-item-selected";
			
			if(grpId != "group-all"){
				if(!isSelected){
					$(this).find('i').removeClass(clsNameIco);
				}
			}
		}
	)	// end Hover
	.on('click', function(){
		if(isBannerDragStarted) {
			isBannerDragStarted = false;
			return;
		}
		grpId = $(this).attr('id') + "";
		
		if(grpId == "group-all"){
			if(!isSelected){
				$('#dashboard-banner').addClass('banner-selected');
				// remove style previous selected item
				$('#dashboard-banner').find('.open-item-selected, .wip-item-selected, .rfshp-item-selected, .shipd-item-selected')
				.removeClass('open-item-selected')
				.removeClass('wip-item-selected')
				.removeClass('rfshp-item-selected')
				.removeClass('shipd-item-selected');
			}
		}else{
			$('#dashboard-banner').removeClass('banner-selected');
			// remove style previous selected item
			$('#dashboard-banner').find('.open-item-selected, .wip-item-selected, .rfshp-item-selected, .shipd-item-selected')
			.removeClass('open-item-selected')
			.removeClass('wip-item-selected')
			.removeClass('rfshp-item-selected')
			.removeClass('shipd-item-selected');
			$(this).addClass(clsName);
		}
		
		// filter data to show by order status code
		var statusCd = grpId.substring(grpId.lastIndexOf("-") + 1);
		$.post(loc + "/filterBySttCd", {"orderStatusCd": statusCd}, function(jsonObj, textStatus, jqXHR){

			// create or update cookie
			if($.readCookie('filterSttCd')){
				if(statusCd == 'all'){
					$.eraseCookie('filterSttCd');
				}else{
					$.createCookie('filterSttCd', statusCd);
				}
			}else{
				$.createCookie('filterSttCd', statusCd, 1);
			}
			
			window.location.reload(true);
//			$.each(json, function(idx, ohm){
				// get message: dashboard.item.block.html.li.in.dbcontent
//				var elmHtml = $.getHtmlTemplateByKey('dashboard.item.block.html.li.in.dbcontent', ohm);
				
//				$('ul#drag-content').empty();
//				$('ul#drag-content').append(elmHtml);
				
//			});
				
		})
		.fail(function(jqXHR, textStatus, errorThrown){
			alert("Cannot filter order.");
		});
	});
};


function bannerItemDrag(){
	var zIdx = 11000;
	
	$('#dashboard-banner .banner-item, #dashboard-banner #group-all').drag("init",function(){
//		console.log("Banner drag init");
		$(this).addClass('banner-item-draggable');
//		if($(this).is('.banner-item-draggable')) return $('.banner-item-draggable');
	})
	.drag("start", function(){
		isBannerDragStarted = true;
		//$(this).css('zIndex', zIdx++);
//		console.log("DRAG start:");
		
		return $(this).clone().css({
			"opacity": '.75', 
			'cursor':'move', 
			'position':'absolute',
			'zIndex': zIdx++
			}).appendTo(this.parentNode);
	})
	.drag(function( ev, dd ){
		//$(this).offset({top: dd.offsetY, left: dd.offsetX});		// for Revert Drag Mode
		$(dd.proxy).offset({
			top: dd.offsetY,
			left: dd.offsetX
		});
		
//		console.log('dragging');
	})
	.drag("end", function(ev, dd){
//		console.log("DRAG End");
		isBannerDragStarted = false;
		$(this).removeClass('banner-item-draggable');
		$(this).css({'top':'auto', 'left':'auto'});
//		$(this).animate({
//			top: dd.offsetY,
//			left: dd.offsetX
//		}, 420 );
		$(dd.proxy).remove();
	});
}



/************************************************************************************************************
*
* Global variables for Basket session.
*
************************************************************************************************************/
var dbContainerIdSelecteor = "#db-content";
var ordersSelectedArray = [];
var itemInBasket = [];
var droppedDOM_Id = "";
var isDroppedToCart = false;
var isDragging = false;
var loc = "";


init = function(){
	loc = window.location.protocol + "//" + window.location.host + appName;
	multiSelectedDrag();
	multiSelectedDrop();
	documentListenDrapEvent();
	initDataWorkingBasket();
};


isExistItem = function(item, array){
	return ($.inArray(item, array) != -1);
};


/** Start drag & Drop function */
multiSelectedDrag = function (){
	var zIdx = 10000;
	var firstChild = null;
	var orderId = "";
	
	$(dbContainerIdSelecteor + ' li').on('mouseup', function(e){
		if(isExistItem(orderId, ordersSelectedArray)){
			if(!isDragging){
				firstChild.removeClass('db-block-selected');
				$(this).removeClass('item-draggable');
				$(this).removeAttr('style');
			}
			
			// remove order out of [orderSelectedArray] array
			if(!isDragging && isExistItem(orderId, ordersSelectedArray)){
				ordersSelectedArray.splice($.inArray(orderId,ordersSelectedArray), 1);
			}
		}else{
			ordersSelectedArray.push(orderId);
			// revert position item to original
			$(this).offset({
				top: $(this).offset().top - 1,
				left:$(this).offset().left - 1
			});
		}
		
		if(($(firstChild).attr('class') + "").indexOf('db-block-selected') != -1){
			$(this).css({'left':'auto', 'top':'auto'});
		}
		
	})
	.drag("init",function(){
		firstChild = $(this).children().first();
		orderId = "" + $(this).attr('id');
		orderId = orderId.substring(orderId.lastIndexOf('-') + 1);
		orderId = parseInt(orderId);
		$(this).offset({
			top: $(this).offset().top + 1,
			left:$(this).offset().left + 1
		});
		
		if($(firstChild).attr('class').indexOf('db-block-selected') == -1){
			firstChild.addClass('db-block-selected');
			$(this).addClass('item-draggable');
			$(this).css('border-color', '#0066cc');
		}
		
		if ( $( this ).is('.item-draggable') )
			return $('.item-draggable');
	})
	.drag("start", function(){
		$(this).css({'zIndex':zIdx++, 'cursor':'move'});
		isDragging = true;
	})
	.drag(function( ev, dd ){
		$(this).offset({top: dd.offsetY, left: dd.offsetX});
	})
	.drag("end", function(ev, dd){
//		console.log("drag end:");
		if($(dd.drop).attr('id') != 'cart'){
			isDragging = false;
		}
		$(this).css('cursor','pointer');
	});
};

multiSelectedDrop = function (){
	$.drop({ multi: true });
	
	$('#cart').drop("start", function(){
		$(this).css('background-color', '#ECB');
//		console.log("Drop start");
	})	
	.drop(function( ev, dd ){
//		console.log("Dropped");
		isDroppedToCart = true;
		hideOrderSelected();
		$.each(ordersSelectedArray, function(idx, val){

			if(!isExistItem(val, itemInBasket)){
				itemInBasket.push(val);
			}
			
			// remove style selected items
			$($(dbContainerIdSelecteor + ' li#item-' + val).removeClass('item-draggable')
			.children()[0]).removeClass('db-block-selected');
		});
		
		//destDOM.append($(dd.drag.outerHTML).css('display', ''));
		
	})
	.drop("end",function(ev, dd){
		$(this).css('background-color', '');
		
		if(isDroppedToCart){
			isDroppedToCart = false;
			var cls = $(dd.drag).attr('class');
			var groupId = "";
			if(cls && cls.indexOf('banner') != -1){
				groupId = $($(dd.drag).children()[0]).attr('id');
			}
			updateBasketSession(ordersSelectedArray, groupId);
			// empty array
			ordersSelectedArray.length = 0;
		}
		
//		console.log("----------------");
		//printAllPropertiesObject(dd.drag);	// has data dragged
//		printAllPropertiesObject(dd.drop);
//		console.log("Drop End:");
	});
};

/**
 * Hide orders selected from dashboard container.
 */
hideOrderSelected  = function (){
	for(var i = 0; i < ordersSelectedArray.length; i++){
		$(dbContainerIdSelecteor).find('#item-' + ordersSelectedArray[i])
			.css('top', 'auto')
			.css('left', 'auto')
			.css('display', 'none');
	}
};

/**
 * Show orders selected from dashboard container.
 */
showOrderSelected = function (){
	for(var i = 0; i < ordersSelectedArray.length; i++){
		$(dbContainerIdSelecteor).find('#item-' + ordersSelectedArray[i])
			.css('top', 'auto')
			.css('left', 'auto');
	}
};

documentListenDrapEvent = function (){
	$(document).on('mouseup', function(e){
		droppedDOM_Id = e.target.id + "";
		if(droppedDOM_Id != "cart"){
			showOrderSelected();
			//$(this).getElementById('item-' + droppedDOM_Id).css({'left':'auto', 'top':'auto'});
		}
	});
};


/* End Drag function */

function printAllPropertiesObject(obj){
	$.each(obj, function(i, val){
		console.log("Prop.Name= " + i + " | Prop.Value=" + val);
		
	});
}


/** load data for CART (BASKET) */
function updateBasketSession(orderIdArr, groupId){
	var myData = orderIdArr.toString();
	var statusCd = "";
	if(groupId != ""){
		statusCd = groupId.split('-')[1];
	}
	
	showLoadingBar('#cart');
	
	$.ajax({
		url: loc + '/updateBasketSession',
		type: 'GET',
		contentType: 'application/json',
//		traditional: true,
//		dataType: 'json',
		data: {
			"orderIds": myData,
			"statusCd": statusCd
		},
		async: true,
		cache: false
	})
	.done(function(orderObjInBasket){
		printOrderItemFromJSON(orderObjInBasket);
		
		// remove elements updated in UI
		var json = $.parseJSON(orderObjInBasket);
		$.each(json, function(idx, ohm){
			$('#db-content').find('#item-' + ohm.gcfOrdId).remove();
		});
		
		// close loading bar
		destroyLoadingBar();
	})
	.fail(function(){
		destroyLoadingBar();
		//console.log("Cannot update selected order into BASKET.");
	});
}


function initDataWorkingBasket(){
	itemInBasket.length = 0;
	showLoadingBar('#cart');
	$('#cart').show(function(e){
		var req = $.ajax({
			url: loc + '/updateBasketSession',
			type: 'GET',
			contentType: 'application/json',
			data: {
				"orderIds": '',
				"statusCd": ''
			},
			async: true,
			cache: false
		});
		
		req.done(function(orderBasketSessionObj){
			printOrderItemFromJSON(orderBasketSessionObj);
			destroyLoadingBar();
		});
		
		req.fail(function(){
			destroyLoadingBar();
			alert("Cannot load data from basket session.");
		});
	});
}


function printOrderItemFromJSON(jsonObj){
	var json = $.parseJSON(jsonObj);
	if(json){
		// itemInBasket include orderId
		// draw order items
		$.each(json, function(idx, ohm){
			var id = parseInt(ohm.gcfOrdId);
			if(!isExistItem(id, itemInBasket)){
				itemInBasket.push(id);
			}
			
			var elmHtml = getHtmlTempltForOrderItem('dashboard.item.block.html.li.in.basket', ohm, 'BSKT');
			$('ul#cart-content').append(elmHtml);
			
		});
		
		$('#orderCount').html(itemInBasket.length);
	}
}


// listening event for DELETE ORDER button on BASKET
function ordrItemMouseover(obj){
//	printAllPropertiesObject(obj);
	var orderId = $(obj).attr('id') + "";
	orderId = orderId.replace("basket-", "");
//	$(obj).find('.close').show();
	//console.log("orderId=" + orderId);
//	var elm = $(document).find('#basket-' + orderId);
//	if(elm){
		$(obj).mousemove(function(){
			$(this).find('.close').show();
		}).mouseleave(function(){
			$(this).find('.close').hide();
			
		});
//	}
}


/**
 * Delete selected order from basket.
 * @param e javascript event
 * @param orderId orderId for delete
 */
function deleteOrderInBasket(orderId){
	$.post(loc + "/deleteOrderInBasket", {'orderId': orderId}, function(dataFromServer, textStatus, jqXHR){
		var json = $.parseJSON(dataFromServer);
		if(json){
			// remove current list of orderId in BASKET
			itemInBasket.splice($.inArray(json.gcfOrdId, itemInBasket), 1);
			$('#orderCount').html(itemInBasket.length);
			
			$(document).find('#basket-' + json.gcfOrdId).remove();
			
			// add removed item into dashboar content if not filtered !!!
			var sttKey = $.readCookie('filterSttCd');
			if(sttKey == null || sttKey == json.orderStatusModel.orderSttCd.toLowerCase()){
				var elmHtml = getHtmlTempltForOrderItem('dashboard.item.block.html.li.in.dbcontent', json, 'DBCNT');
				$('#drag-content').append(elmHtml);
				$.gcfDragDrop();
			}
		}
	})
	.fail(function(jqXHR, textStatus, errorThrown){
		alert("Cannot delete selected order.");
	});
	
}


/**
 *	Utilities function 
 * */

function getContactNmFromContactModel(contactMdl){
	var name = "";
	if (contactMdl) {
	    var fstNm = contactMdl.contcFrstNm;
	    var lstNm = contactMdl.contcLstNm;
	    if (fstNm == '') {
	    	name = lstNm;
	    } else {
	    	name = fstNm + ", " + lstNm;
	    }
	}
	
	return name;
}


/**
 * Setting for jQuery.i18n plugin
 */

/**
 * get HTML string for an order item.
 * @param keyName key in properties file
 * @param orderHeaderModel orderHeaderModel
 * @param _container is dashboard content(key: DBCNT) or basket(key: BSKT).
 * @returns HTML formatted
 */
function getHtmlTempltForOrderItem(keyName, orderHeaderModel, _container){
	var str = "";
	jQuery.i18n.properties({
	    name:'html-templates', 
	    path: appName + '/resources/sources/', 
	    mode:'both',
	    language: '',
	    callback: function() {
	    // Accessing a value with placeholders through the map
	    	if(_container){
	    		if(_container == 'BSKT'){
	    			str = jQuery.i18n.prop(keyName, 
	    					orderHeaderModel.gcfOrdId, 
	    					orderHeaderModel.gcfOrdId, 
	    					orderHeaderModel.gcfOrdId, 
	    					orderHeaderModel.orderStatusModel.orderSttCd.toLowerCase(),
	    					orderHeaderModel.orderStatusModel.orderSttDes,
	    					getContactNmFromContactModel(orderHeaderModel.orderContactModel),
	    					orderHeaderModel.gcfOrdId,	/*different*/
	    					orderHeaderModel.cre8Ts,
	    					orderHeaderModel.scheduleShippingDate);
	    			
	    		}else if(_container == 'DBCNT'){
	    			str = jQuery.i18n.prop(keyName, 
	    					orderHeaderModel.gcfOrdId, 
	    					orderHeaderModel.gcfOrdId, 
	    					orderHeaderModel.gcfOrdId, 
	    					orderHeaderModel.orderStatusModel.orderSttCd.toLowerCase(),
	    					orderHeaderModel.orderStatusModel.orderSttDes,
	    					getContactNmFromContactModel(orderHeaderModel.orderContactModel),
	    					orderHeaderModel.cre8Ts,
	    					orderHeaderModel.scheduleShippingDate);
	    		}
	    	}else{
	    		// annother case
	    	}
	    }
	});
	
	return str;
};

