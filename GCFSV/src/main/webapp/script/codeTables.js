$(document).ready(function() {
	var loadingCycle = null;
	var currentTable = null;
	var currentTableLabel = null;
	var currentColumns = null;
	var currentData = null;
	var currentType = null;
	var currentModal = null;
	
	$("#leftMenu li a").click(function(event) {
		$("#leftMenu li").removeClass("active");
		$(this).parent().addClass("active");
		
		$("#tableTitle").html(" Detail "+  $(this).html());
		var tableName = $(this).attr('id');
		var columns =  window[tableName + "_columns"]; 
		createDataTable(tableName, columns);
		currentTable = tableName;
		currentColumns = columns;
		currentTableLabel = $(this).html();
	});
	
	function createDataTable(tableName, aoColumns){
		loadingCycle = new ajaxLoader("#wrap");
		$("#bodyDetail").html('<table cellpadding="0" cellspacing="0" border="0" class="table table-hover table-striped table-bordered" id="cdTableDataTable"></table>');
		
		$('#cdTableDataTable').dataTable({
		 "sAjaxSource": 'getCodeTable',
	     "bFilter": false,
	     "bSort": false,
	     "bAutoWidth": true,
	     "bPaginate": false,
	     "aoColumns": aoColumns,
	     "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
	         $('td:eq('+ (aoColumns.length - 1) +')', nRow).html( '<i id="'+ aData[0] +'" class="icon-edit"></i><i id="'+ aData[0] +'" class="icon-remove"></i><input id="dataIndex" type="hidden" value="'+iDisplayIndex+'">');
	      },
	     "fnServerParams": function ( aoData ) {
	    	 aoData.push({"name": "tableName", "value": tableName});
	      },
	      "fnServerData": function ( sSource, aoData, fnCallback, oSettings ) {
	          oSettings.jqXHR = $.ajax( {
	            "dataType": 'json',
	            "type": "GET",
	            "url": sSource,
	            "data": aoData,
	            "success": [fnCallback, fnCallbackSelectorButton]
	          } );
	      }   
		});
			
		$.extend( $.fn.dataTableExt.oStdClasses, {
		    "sWrapper": "dataTables_wrapper form-inline"
		} );
	}
	
	function fnCallbackSelectorButton(json){
		if(loadingCycle)	
			loadingCycle.remove();
		$("#rowIconAction").attr("style","display: block;");
		currentData = json.aaData;
		$(".icon-edit").click(function(event) {
			 if(currentColumns != null && currentColumns.length > 0){
				 currentType = "Edit";
				 loadFormByTyp(currentType, $(this).attr('id'));
			 }
		});
		
		$(".icon-remove").click(function(event) {
			currentType = "Delete";
			var id = $(this).attr('id');
			//var rowData = findDataById(id);
			var columnObj = currentColumns[0];
			var formHtml = "Are you sure you want to delete this record?";
			formHtml += '<input type="hidden" id="'+ columnObj.sName +'" value="'+ id +'"/> ';
			$("#bodyDelete").html(formHtml);
			currentModal = "#dialogDelete";
			$('#dialogDelete').modal({
				  keyboard: false,
				  show:true
			});
		});
	}
	
	function loadFormByTyp(currentType, id){
		 $("#titleEdit").html(currentType + " " + currentTableLabel);
		 var formHtml = '';
		 var columnObj = null;
		 var rowData = findDataById(id);
		 var data = '';
		 for(var i=0; i < currentColumns.length; i++){
			 columnObj = currentColumns[i];
			 if(columnObj.sTitle == 'Action')
				continue;
			 data = (rowData != null && rowData[i] != null) ? rowData[i] : '';
			 formHtml += createFormGroup(columnObj.sTitle, columnObj.sName, columnObj.sConstraint, columnObj.sDataLength, data);
		 }
		 formHtml = createFormHorizontal(formHtml);
		 $("#bodyEdit").html(formHtml);
		 currentModal = '#dialogEdit';
		 $('#dialogEdit').modal({
			  keyboard: false,
			  show:true
		});
	}
	
	function createFormGroup(label, inputId, constraint, dataLength, data){
		var ret = '<div class="form-group">';
		ret += '	<label for="'+inputId+'" class="col-lg-3 control-label">'+label+'</label>';
		ret += '	<div class="col-lg-9">';
		if(constraint == 'P' && data != ''){
			ret += '	<p class="form-control-static">'+data+'</p><input type="hidden" id="'+inputId+'" value="'+data+'"/> ';
		}else{
			ret += '	<input type="text" class="form-control" id="'+inputId+'" placeholder="'+label+'" maxlength="'+dataLength+'" value="'+data+'" />';
		}
		ret += '	</div>';
		ret += '</div>';
		return ret;
	}
	
	function createFormHorizontal(content){
		var ret = '<form class="form-horizontal" role="form">';
		ret += content;
		ret += '</form>';
		return ret;
	}
	
	function findDataById(dataId){
		var dataRet = null;
		if(dataId != null && dataId != '' && currentData != null && currentData.length){
			for(var i=0; i < currentData.length; i++){
				if(dataId == currentData[i][0]){
					dataRet = currentData[i];
					break;
				}
			}
		}
		return dataRet;
	}
	
	$("#btnSaveEdit").click(function(event) {
		sendDataByBody("bodyEdit");
	});
	
	$("#btnYesDelete").click(function(event) {
		sendDataByBody("bodyDelete");
	});
	
	function sendDataByBody(body){
		loadingCycle = new ajaxLoader("#wrap");
		$(currentModal).modal("hide");
		var arrElement = getArrElementForm(body);
		var arrValue = getArrElementValueForm(body);
		$.ajax( {
	            "type": "POST",
	            "url": "saveCodeTable",
	            "data": "tableName=" + currentTable + "&type="+currentType+ "&fields="+arrElement+"&values=" + arrValue,
	            "success": saveSuccess
	         } );
	}
	
	$("#btnAddCdTbl").click(function(event) {
		currentType = "Add";
		loadFormByTyp(currentType, '');
	});
	
	
	function getArrElementForm(body){
		var arrRet = new Array();
		$("#"+body+" input").each(function(index) {
			arrRet[index] = $(this).attr('id');
		});
		return arrRet;
	}
	
	function getArrElementValueForm(body){
		var arrRet = new Array();
		$("#"+body+" input").each(function(index) {
			arrRet[index] = $(this).val();
		});
		return arrRet;
	}
	
	function saveSuccess(data){
		if(loadingCycle)
			loadingCycle.remove();
		$(currentModal).modal("hide");
		if(parseInt(data) == 1){
			createDataTable(currentTable, currentColumns);
		}else{
			alert('Operation failed.');
		}
	}
}); // end of $(document).ready(function()