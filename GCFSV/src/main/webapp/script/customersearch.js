$(document).ready(function() {
	
	function createDataTable(){
		
		$('#customerSearchList').dataTable({
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
	
	
});