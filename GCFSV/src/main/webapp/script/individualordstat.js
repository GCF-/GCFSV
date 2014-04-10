var ord = null;
var ordDetailVOs = null;
var oTable;
var itemEdit = null;
$(document).ready(function () {
	$('.carousel').carousel({
		interval: false
	});
	$('.carousel').hover(function () {   
		  $(this).carousel('pause') ;
	});
	
    /* Init the table */
     $('#dynamic').html( '<table cellpadding="0" cellspacing="0" width ="100%" border="0" class="display" id="orderDetailTable"></table>' );
    oTable = $('#orderDetailTable').dataTable({
		"bPaginate": false,
        "bLengthChange": false,
        "bFilter": false,
        "bSort": false,
        "bInfo": false,
        "bAutoWidth": false,
        "aaData": ordDetailVOs,
//		"sAjaxSource": '/COMS/resources/sources/arrays.txt',
//		"sAjaxDataProp": "ordDetailVOs",
        "bAutoWidth": false,
        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
            /* Append the grade to the default row class name */
            $('td:eq(11)', nRow).html( '<i class=\"icon-comment\"></i> <i class=\"icon-zoom-in\" ></i> <i class=\"icon-remove-sign\"></i>');
//            $('td:eq(11)', nRow).html( '<i class=\"icon-info-sign\" ></i>');
            $('td:eq(10)', nRow).html("$"+ Number(aData.totRetlAmt - aData.totDiscAmt + aData.totTaxAmt).toFixed(2));
            $('td:eq(4)', nRow).html( "$"+aData.unitReailAmt);
            $('td:eq(6)', nRow).html( "$"+aData.totRetlAmt);
            $('td:eq(7)', nRow).html( "$"+aData.totDiscAmt);
            $('td:eq(8)', nRow).html( "$");
            $('td:eq(9)', nRow).html( "$"+aData.totTaxAmt);
        },
        "oLanguage": {
        	"sEmptyTable": "No data available !"
        },
//        "oTableTools": {
//            "sRowSelect": "single"
//        },        
        "aoColumns": [
                      { "sTitle": "Item Type", "sClass": "center", "sWidth": "10%" ,
                    	"mData": "ordDtlEntyTypCd" },
                      { "sTitle": "Item", "sClass": "center", "sWidth": "10%" , 
                    	"mData": "ordDtlKey" }, 
                	  { "sTitle": "Description", "sClass": "center", "sWidth": "10%" , 
                    	"mData": "custShpngId" },
                	  { "sTitle": "Status", "sClass": "center", "sWidth": "5%" , 
                    	"mData": "ordDtlStatDes" },
                      { "sTitle": "Unit Price", "sClass": "center", "sWidth": "5%" , 
                        "mData": "unitReailAmt" },
	                  { "sTitle": "Quantity", "sClass": "center", "sWidth": "5%" , 
	                    "mData": "ordQty" },
                      { "sTitle": "Total Retail", "sClass": "center", "sWidth": "5%" , 
	                    "mData": "totRetlAmt" },
                      { "sTitle": "Discount",  "sClass": "center", "sWidth": "5%" ,
                    	"mData": "totDiscAmt"},
                	  { "sTitle": "Shipping",  "sClass": "center", "sWidth": "5%" ,
                    	"mData": "custShpngId"},
                      { "sTitle": "Tax",  "sClass": "center", "sWidth": "5%" ,
                    	"mData": "totTaxAmt"},
                      { "sTitle": "Amount Paid", "sClass": "center", "sWidth": "10%" ,
                    	"mData": "custShpngId"},                     
//                      { "sTitle": "Note",  "sClass": "center", "sWidth": "5%" ,
//                        "mData": "custShpngId"}, 
                      { "sTitle": "Action",  "sClass": "center", "sWidth": "5%" ,
                    	"mData": "custShpngId"},
                  ]
	});
//    $('#orderDetailTable').dataTable();
//	     Set some properties for table 
    /* Add a click handler to the rows - this could be used as a callback */
    $('#orderDetailTable tbody').on( 'click', 'tr', function () {
    	 if ( $(this).hasClass('row_selected') ) {
             $(this).removeClass('row_selected');
         }
         else {
//             oTable.$('tr.row_selected').removeClass('row_selected');
             $(this).addClass('row_selected');
         }
    });
    
	$('#orderDetailTable tbody').on('click', 'td i.icon-zoom-in', function () {
//		$('#modalAddNew').modal({
//			  keyboard: false,
//			  show:true
//		});
//		itemEdit = oTable.fnGetData($(this).parent("td").parent("tr")[0]);
//		 //get the 'scope' from angular for the div (ng-controller="RentCtrl"'s scope)
//	    var scope = angular.element('form').scope();
//	    scope.item = itemEdit;
//	    //tell angular something changed, do dirty checks again
//	    scope.$apply();
	    window.location.href = "/COMS/api/monitor/lineItemDetail";
	});
	$('#orderDetailTable tbody').on('click', 'td i.icon-comment', function () {
		var itemSelected = oTable.fnGetData($(this).parent("td").parent("tr")[0]);
		var scope = angular.element('form').scope();
		$.ajax({type : "GET",
					url : "ajaxGetData?ordId=" + itemSelected.ordId
							+ "&ordDtlEntyTypCd=" + itemSelected.ordDtlEntyTypCd
							+ "&ordDtlKey=" + itemSelected.ordDtlKey
							+ "&ordDtlSeqNbr=" + itemSelected.ordDtlSeqNbr,
					dataType : "json",
					cache : false,
					async : true
				}).done(function(data) {
				for ( var int = 0; int < scope.ord.ordDetailVOs.length; int++) {
					if(scope.ord.ordDetailVOs[int].ordId == itemSelected.ordId &&
							scope.ord.ordDetailVOs[int].ordDtlEntyTypCd == itemSelected.ordDtlEntyTypCd &&
							scope.ord.ordDetailVOs[int].ordDtlKey == itemSelected.ordDtlKey &&
							scope.ord.ordDetailVOs[int].ordDtlSeqNbr == itemSelected.ordDtlSeqNbr) {
						scope.ord.ordDetailVOs[int].orderDtlCmtVOs = data;
						break;
					}
				}
					
		});
	    scope.$apply();
	});
	$("#icon-check").click(function(){
		if($(this).hasClass('icon-check')){
			$(this).addClass("icon-check-empty");
			$(this).removeClass("icon-check");
			oTable.$('tr').removeClass('row_selected');
		}else {
			$(this).toggleClass("icon-check");
			$(this).removeClass("icon-check-empty");
			oTable.$('tr').addClass('row_selected');
		}
	});
	$("#icon-delete").click(function(){
		$('#myModal').modal({
			  keyboard: false,
			  show:true
		});
	});
	$("#icon-add").click(function(){
		$('#modalAddNew').modal({
			  keyboard: false,
			  show:true
		});
	    var scope = angular.element('form').scope();
	    scope.item = null;
	    //tell angular something changed, do dirty checks again
	    scope.$apply();
	});
	
	var dataRowDelete = null;
	$('#orderDetailTable tbody').on('click', 'td i.icon-remove-sign', function () {
//		get data row match object java
		dataRowDelete = oTable.fnGetData($(this).parent("td").parent("tr")[0]);
		$('#myModal').modal({
			  keyboard: false,
			  show:true
		});
//		dataRowDelete =  $(this).parent("td").parent("tr")[0];
	});
	function deleteRow(dataRow){
//		oTable.fnDeleteRow(dataRow);
		for ( var int = 0; int < ordDetailVOs.length; int++) {
			var ordDetailVO = ordDetailVOs[int];
			if(dataRow.ordDtlEntyTypCd == ordDetailVO.ordDtlEntyTypCd &&
				dataRow.ordDtlKey == ordDetailVO.ordDtlKey &&
				dataRow.ordDtlSeqNbr == ordDetailVO.ordDtlSeqNbr){
				ordDetailVOs.splice(int,1);
				break;
			}
		}
		
	}
	function deleteRows(){
		var anSelected = fnGetSelected( oTable );
			for ( var int = 0; int < anSelected.length; int++) {
				var ordDetailVO = oTable.fnGetData(anSelected[int]);
				var index = findObjecInArray(ordDetailVOs,ordDetailVO);
				if(index >-1) {
					ordDetailVOs.splice(index,1);
				}
			}
	}
	function findObjecInArray(arr,obj){
		for ( var int = 0; int < arr.length; int++) {
			var ordDetailVO = arr[int];
			if(obj.ordDtlEntyTypCd == ordDetailVO.ordDtlEntyTypCd &&
					obj.ordDtlKey == ordDetailVO.ordDtlKey &&
					obj.ordDtlSeqNbr == ordDetailVO.ordDtlSeqNbr){
					return int;
			}
		}
		return -1;
	}
	$('#confirmFalse').click(function(){
        $('#myModal').modal('hide');
        return false;
    });
    $('#confirmTrue').click(function(){
    	if(dataRowDelete != null){
    		deleteRow(dataRowDelete);
    		refreshDataTable(ordDetailVOs);
    	}else {
    		deleteRows();
    		refreshDataTable(ordDetailVOs);
    	}
    	 $('#myModal').modal('hide');
    	dataRowDelete = null;
        return true;
    });
    /* Get the rows which are currently selected */
    function fnGetSelected( oTableLocal )
    {
    	var aReturn = new Array();
    	var aTrs = oTableLocal.fnGetNodes();
    	
    	for ( var i=0 ; i<aTrs.length ; i++ )
    	{
    		if ( $(aTrs[i]).hasClass('row_selected') )
    		{
    			aReturn.push( aTrs[i] );
    		}
    	}
    	return aReturn;
    }
    $("#orddtl").click(function(e) {
    	$("#funcAction").show();
    });
    $("#orddtlTrx, #orddtlCom, #orddtlHis").click(function(e) {
    	$("#funcAction").hide();
    }); 
    
    
	setEditPanel('order-info','ajaxUpdateOrderInformation','','');
	setEditPanel('cust-info','ajaxUpdateCustInformation','applyPhone2Text','copyPhone2Model');
	loadAllCountriesFromWS();
	$("#edit-input-cust-info-country").change(function(e) {
    	loadStatesByCountryFromWS();
    }); 
	//hide edit button
	$('.toprightHeaderIcons.icon-edit').hide();	
	
}); //end of $(document).ready(function() 
function refreshDataTable(data){
	oTable.fnClearTable();
	oTable.fnAddData(data);
}
var ordIdDispatch = 0;
function individualOrderCtrl($scope,$http) {
    $scope.ord = ord;
	$scope.getModelData = function(){
		return $scope.ord;
    };
    $scope.searchOrder = function(){
    	var loadingCycle = startLoading(window);
		
		//hide edit button and go to status normal
		$('.toprightHeaderIcons icon-edit').hide();
		resetAllStatusNormal();
		
    	var ordId = $("#inputOrderNumber").val();
        //turn off processing indicator
        $http({method: 'POST', url: 'ajaxGetOrdById?ordId=' + ordId}).success(function(data, status, headers, config) {
	        // this callback will be called asynchronously
	        // when the response is available
        		console.log(data);
	        	 $scope.ord = data;
	        	 ordIdDispatch = data.orderInforVO.ordId;
	        	 if($scope.ord.billInforVOs.length > 0) {
	        		 $scope.billActive = $scope.ord.billInforVOs[0];
	        		 if($scope.ord.billInforVOs.length > 1) {
	        			 $scope.billList = $scope.ord.billInforVOs.splice(0, 1);
	        			 $("#leftCarouselId").show();
	        		 }else {
	        			 $("#rightCarouselId").hide();
	        		 }
	        		 
	        	 }
	        	 ordDetailVOs = $scope.ord.ordDetailVOs;
	        	 refreshDataTable(ordDetailVOs);
				 //show edit button
				 $('.toprightHeaderIcons.icon-edit').show();
				 
	        	 if(loadingCycle) stopLoading(loadingCycle);
	        }).error(function(data, status, headers, config) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
	        	if(loadingCycle) stopLoading(loadingCycle);
        });
//	    if you use $.ajax({}); of jquery in angular please addition $scope.$apply(function(){}) and enjoy
    };
    $scope.addCurrency = function(data) {
    	if(data != null) return "$"+data;
    	return "";
    };
    $scope.saveOrderItem = function(){
//    	alert("xxxxxxxx"+$scope.item.totNetAmt);
    	
    };
    $scope.getOrderCmts = function(){
    	if($scope.ord != null && $scope.ord.orderCmtVOs.length == 0) {
			var loadingCycle = startLoading("#tabTableId");
            $http({method: 'GET', url: 'ajaxGetOrdComments?ordId=' + ordIdDispatch}).success(function(data, status, headers, config) {
            	 $scope.ord.orderCmtVOs = data;
            	if(loadingCycle) stopLoading(loadingCycle);
            }).error(function(data, status, headers, config) {
            	if(loadingCycle) stopLoading(loadingCycle);
            });
    	}
    };
    $scope.getStatHistory = function(){
    	if($scope.ord != null && $scope.ord.orderStatHistVOs.length == 0) {
			var loadingCycle = startLoading("#tabTableId");
            $http({method: 'GET', url: 'ajaxGetStatHistory?ordId=' + ordIdDispatch}).success(function(data, status, headers, config) {
            	 $scope.ord.orderStatHistVOs = data;
            	if(loadingCycle) stopLoading(loadingCycle);
            }).error(function(data, status, headers, config) {
            	if(loadingCycle) stopLoading(loadingCycle);
            });
    	}
    };
    $scope.item = itemEdit;
    $("#inputOrderNumber").bind('keypress', function(e) {
    	if(e.keyCode==13){
    		 e.preventDefault();
    		 $scope.$apply(function (){
    			 $scope.searchOrder();
    		 });
    	}
    });
}

function loadAllCountriesFromWS(){
	$('#edit-input-cust-info-country').find('option').remove();
	$.ajax(
		{
			type : "GET",
			url : 'http://api.geonames.org/countryInfoJSON?username=' + geoname_id
		}).done(function(data) {
			var lst = data['geonames'];
			for(var i=0;i<lst.length;i++){
				if(lst[i]['countryName']!=''){
					if(lst[i]['countryCode']=='US'){
						$('#edit-input-cust-info-country').append($("<option></option>")
										.attr("alt",lst[i]['geonameId'])
										.attr("value",lst[i]['countryCode'])
										.attr("selected","true")
										.text(lst[i]['countryName']));

					}else{
						$('#edit-input-cust-info-country').append($("<option></option>")
										.attr("alt",lst[i]['geonameId'])
										.attr("value",lst[i]['countryCode'])
										.text(lst[i]['countryName']));
					}
				}
			}
			loadStatesByCountryFromWS();
		}
	);	
}

function loadStatesByCountryFromWS(){
	$('#edit-input-cust-info-stAbb').find('option').remove();
	$.ajax(
		{
			type : "GET",
			url : 'http://api.geonames.org/childrenJSON?geonameId=' + $("#edit-input-cust-info-country option:selected").attr('alt') + '&username='+geoname_id
		}).done(function(data) {
			var lst = data['geonames'];
			for(var i=0;i<lst.length;i++){
				if(lst[i]['name']!=''){
					$('#edit-input-cust-info-stAbb').append($("<option></option>")
									.attr("value",lst[i]['adminCode1'])
									.text(lst[i]['name']));
				}
			}
		}
	);	
}
function resetAllStatusNormal(){
	revertStatusChangeTextForm('order-info');
	normalStatusChangeButton('order-info');
	revertStatusChangeTextForm('cust-info');
	normalStatusChangeButton('cust-info');
}

function applyPhone2Text(){
	var phnCntryCd=$("[id^=input-cust-info-phnCntryCd]");
	$.each( phnCntryCd, function() {		
		var key = this.id.substring("input-cust-info-phnCntryCd".length);
		var data = "(" + $("#input-cust-info-phnCntryCd" + key).val() + ") " + $("#input-cust-info-phnAreaCd" + key).val() + "-" + $("#input-cust-info-phnNbr" + key).val()+ "-" + $("#input-cust-info-phnExtnNbr" + key).val();
		$("#edit-input-cust-info-phnNbr" + key).mask("(999) 999-9999-99999");
		$("#edit-input-cust-info-phnNbr" + key).val(data);
	});
}

function copyPhone2Model(){
	var phnCntryCd=$("[id^=input-cust-info-phnCntryCd]");
	$.each( phnCntryCd, function() {		
		var key = this.id.substring("input-cust-info-phnCntryCd".length);
		var data = $("#edit-input-cust-info-phnNbr" + key).val();
		$("#input-cust-info-phnCntryCd" + key).val(data.substring(1,4));
		$("#input-cust-info-phnAreaCd" + key).val(data.substring(6,9));
		$("#input-cust-info-phnNbr" + key).val(data.substring(10,14));
		$("#input-cust-info-phnExtnNbr" + key).val(data.substring(15));
		
		$("#input-cust-info-phnCntryCd" + key).trigger('input');
		$("#input-cust-info-phnAreaCd" + key).trigger('input');
		$("#input-cust-info-phnNbr" + key).trigger('input');
		$("#input-cust-info-phnExtnNbr" + key).trigger('input');
		
		if($("#input-cust-info-phnExtnNbr" + key).val()!='')
			$("#phoneExt" + key).show();
		else
			$("#phoneExt" + key).hide();
	});	
}