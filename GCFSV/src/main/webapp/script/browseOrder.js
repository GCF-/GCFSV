var BrowseOrder = (function($, common) {

	var BrowseOrder = function() {

		this.formatTotalAmount = function(field) {
			$(field).val(common.htmlSpecialChar($(field).val()));
			var totalAmount = common.searchNumber($(field).val());
			if (totalAmount !== null) {
				var digit = totalAmount[totalAmount.length - 1];
				if (digit === undefined) {
					$("#totalAmount").val($("#totalAmount").val()+".00");				
				}else {
					if (digit.length === 2) {
						$("#totalAmount").val($("#totalAmount").val()+"0");
					}
					if (digit.length === 1) {
						$("#totalAmount").val($("#totalAmount").val()+"00");
					}
				}
			};			
		};
		

		this.submitData = function (location) {
			var quantityValues = common.searchNumber($("#quantity_Order").val());

			var totalAmounts = common.searchNumber($("#totalAmount").val());

			var data = $("#dataInputForm").serialize();			
			var quantityArray;
			var totalAmountArray;
			var operatorEqual = "=";
			// var data = this.prepare_data()		
			

			if(quantityValues !== null){
				var operator = quantityValues[1] ;
				
				if (operator === undefined) {
 					operator  = operatorEqual;

 					quantityArray = quantityValues[0].split(operator);

					data = data + "&quantity=" + quantityArray[0] +"&operatorQuantity="+ operator;
				} else{
					
					quantityArray = quantityValues[0].split(operator);

					data = data + "&quantity=" + quantityArray[1] +"&operatorQuantity="+ operator;	
				};				
			}
			// totalAmout
			if (totalAmounts !== null) {
				var operator = totalAmounts[1] ;

				if(operator === undefined){
					operator  = operatorEqual;

					totalAmountArray = totalAmounts[0].split(operator);
					data = data+ "&totalAmount="+ totalAmountArray[0] +"&operatorTotalAmount="+ operator;

				}else {

					totalAmountArray = totalAmounts[0].split(operator);
					data = data+ "&totalAmount="+ totalAmountArray[1] +"&operatorTotalAmount="+ operator;
				};
				
			}
			var orderStatus = $('select[id=orderStatus]').val();
			jQuery.ajax({					 
				
				type: "POST",			
				url: location+ "/ajaxBrowseOrder",
				data: data + "&orderStatus=" + orderStatus,
				success: function(res){		
					
						$('#ajaxOrderResult').html(res);
					
				},
				error: function(e){  
					console.log("errors");
				} 
			  });
		};

		this.styleOrderStatusTable =function() {
			$(".styleStatus").each(function(index){				
				var textStatus = $.trim($(this).text());
				if(textStatus.localeCompare('To Work')==0){
					$(".styleStatus").addClass ("type-open");
				} else if (textStatus.localeCompare('In Progress') ==0) {
					$(".styleStatus").addClass ("type-wip");
				} else if(textStatus.localeCompare('Ready') ==0){
					$(".styleStatus").addClass ("type-ready");
				}
				else if(textStatus.localeCompare('Shipping')==0){
					$(".styleStatus").addClass ("type-rfshp");
				} else if (textStatus.localeCompare('Close')==0){
					$(".styleStatus").addClass ("type-shipd");
				} else {

				}
			});
		};
		this.selectAllCheckbox = function(field) {
			$(field).change(function() {

			    if(this.checked) {
			    	$(".checkAllRow").each(function(index) {
			    		
			    		$(this).prop('checked', true);
			    	});
					
			    }else{

			    	$(".checkAllRow").each(function(index) {
						$(this).prop('checked', false);
			    	});
			    }
			});
		};
		this.resetValueForm = function(){
			$("#dataInputForm input").val("");			
			$('.selectpicker').selectpicker('deselectAll');
		};
		
		// new function
	};	
	return BrowseOrder;
})($, new Common());



$(document).ready(function() {	
	$('#order_daterange').daterangepicker({
		ranges: {
	         'Today': [moment(), moment()],
	         'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
	         'Last 7 Days': [moment().subtract('days', 6), moment()],
	         'Last 30 Days': [moment().subtract('days', 29), moment()],
	         'This Month': [moment().startOf('month'), moment().endOf('month')],
	         'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
	      },
	    startDate: moment().subtract('days', 29),
      	endDate: moment()
	});
	
	$('#order_daterange').on("focusout",function (event) {
		if( $(this).val() ) {
			var validDateRange = common.formatDateRange($(this).val());
			if (validDateRange) {
				if ($(this).parent().hasClass("has-error has-feedback")) {
					$(this).parent().removeClass(" has-error has-feedback");					
				};
			} else{
				$(this).parent().addClass(" has-error has-feedback");
				
			};
		};
	});
	$('#dateRange_Icon').daterangepicker({
		ranges: {
	         'Today': [moment(), moment()],
	         'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
	         'Last 7 Days': [moment().subtract('days', 6), moment()],
	         'Last 30 Days': [moment().subtract('days', 29), moment()],
	         'This Month': [moment().startOf('month'), moment().endOf('month')],
	         'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
	      },
	    startDate: moment().subtract('days', 29),
      	endDate: moment()
	});
	$('.selectpicker').selectpicker();
	$('.selectpickerShipDate').selectpicker({
		onChange: function(option, checked) {
		var values = [];
		$('.selectpickerShipDate option').each(function() {
			if ($(this).val() !== option.val()) {
				values.push($(this).val());
			}
		});
		$('.selectpickerShipDate').multiselect('deselect', values);
		}
	});


	var common = new Common();
	var browseOrderClss = new BrowseOrder();
	var location= common.getAppName(window.location.pathname);
	
	$("#order_Nbr").keydown(function(e){
		return common.validateNumber(e);
	});
	$("#order_Nbr").bind('paste', function(e) {
	     return common.validateNumber(e);
	});
	/*$("#order_Nbr").bind('paste', function(e) {
	     var text = e.event;
	     alert(text);
	})*/
		
	// Total Amount 
	$("#totalAmount").keydown(function (event) {
		$(this).val(common.htmlSpecialChar($(this).val()));
	});

	$("#totalAmount").on("focusout",function (event) {
		browseOrderClss.formatTotalAmount(this);			
	});
	// End Total Amount
	// End quantity
	$("#quantity_Order").keydown(function (event) {
		$(this).val(common.htmlSpecialChar($(this).val()));
	});

	$("#quantity_Order").on("focusout",function (event) {
		$(this).val(common.htmlSpecialChar($(this).val()));
	});
	// Total quantity
	
	//Search data
	$("#searchBt").click(function(){
		browseOrderClss.submitData(location);
	});

	// 
	$('#dataInputForm input').bind('keypress', function(event) {
		 var code = (event.keyCode ? event.keyCode : event.which);
		 if(code == 13) { 
			browseOrderClss.submitData(location);				
		 }
	});
	$("#order_daterange").keydown(function(event){
		var key;
	    if (window.event){
			key = window.event.keyCode;
		}		
		else if (event){
			key = event.which;
		}		
		else{
			return true;
		}		
		keychar = String.fromCharCode(key);

	    if (key == 46){
			return true;
		} else if (key == 8){
			return true;
		}else {
			return false;
			
		};
		if (false) {
			event.preventDefault();
		};
	    
	});

	$('.datatable').dataTable({
		"bFilter": false,  // disable search filter
		"bLengthChange": false,  // disable show entries
		"bInfo" : false,
		"bPaginate": false
		
		
	});
	$("#email").keypress(function() {
		
		if ($(this).parent().hasClass("has-error has-feedback")) {
			$(this).parent().removeClass(" has-error has-feedback");
			$("#emailValidIcon").css("display", 'none');
		};
		
	});
	$("#email").on("focusout",function (event) {	
		if( $(this).val() ) {
			var validEmail = common.validateEmail($(this).val());

			if (validEmail) {
				if ($(this).parent().hasClass("has-error has-feedback")) {
					$(this).parent().removeClass(" has-error has-feedback");
					$("#emailValidIcon").css("display", 'none');
				};
			} else{			
				$(this).parent().addClass(" has-error has-feedback");
				$("#emailValidIcon").css("display", '');
				
					$("#email").tooltip();
				
			};
		};
		
	});
	$("#phone_Nbr").mask("(999) 999-9999");
	 
 	$("#resetBt").click(function(){
 		browseOrderClss.resetValueForm();
 	});
 	$('.dropdown-toggle').dropdown();
 	
 	/*$('#loading-dialog').popup('show');
    setTimeout( "$('#loading-dialog').popup('hide');",2000 );*/


}); /*-end of ready*/


