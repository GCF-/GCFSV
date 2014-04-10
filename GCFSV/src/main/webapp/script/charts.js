$(document)
		.ready(
				function() {


					google.load('visualization', '1', {
						packages : [ 'annotatedtimeline' ],
						callback : drawAnnotatedTimeline
					});
					
					google.load("visualization", "1", {
						packages : [ "corechart" ],
						callback : drawCharts
					});
					google.load('visualization', '1', {
						packages : [ 'table' ],
						callback : drawTables
					});
					function drawAnnotatedTimeline() {
						$.ajax({
							url : "ajaxGetData?name=orderthroughput",
							dataType : "json",
							async : false
						}).done(function(result) { 
							originalOrderThroughputData = result;
							rangeClickChart(1,"orderthroughput");
						});
					}			
					function drawCharts() {

						drawDetailsofChart('orderstatus', true);
						drawDetailsofChart('orderbasketsize', true);
						drawDetailsofChart('ordertypes', true);
					}
					function drawTables() {
						drawDetailsofChart('fulfillmentsystem', true);
						drawDetailsofChart('orderingsystem', true);
					}

					function drawDetailsofChart(id, isMainpage) {
//						var data = $.ajax({
//							url : "getdata?name=" + id,
//							dataType : "json",
//							async : false
//						}).responseText;
						$.ajax({
							url : "ajaxGetData?name=" + id,
							dataType : "json",
							async : false
						}).done(function(data) {
							var divIdforChart = isMainpage ? id : 'divchart';
							var divIdforTable = isMainpage ? id : 'divtable';

							// Create our data table out of JSON data loaded from
							// server.
							var itemNbrFormatter = new google.visualization.NumberFormat(
									{
										pattern : '###,###'
									});
							var currencyFormatter = new google.visualization.NumberFormat(
									{
										negativeParens : true,
										pattern : '$###,###.##'
									});
							if (id == 'orderthroughput') {
								drawOrderThroughput(isMainpage, divIdforChart,
										divIdforTable, data, itemNbrFormatter);
							} else if (id == 'orderstatus') {
								originalOrderStatusData = data;
								drawOrderStatus(isMainpage, divIdforChart,
										divIdforTable, data, itemNbrFormatter);
							} else if (id == "ordertypes") {
								originalOrderTypeData = data;
								drawOrderTypes(isMainpage, divIdforChart,
										divIdforTable, data, itemNbrFormatter);

							} else if (id == "orderbasketsize") {
								originalBasketSizeData = data;
								drawOrderBasketSize(isMainpage, divIdforChart,
										divIdforTable, data, itemNbrFormatter);

							} else if (id == "fulfillmentsystem") {
								originalFulfillmentSystemData = data;
								drawFulfillmentSystem(isMainpage, divIdforChart,
										divIdforTable, data, itemNbrFormatter);

							} else if (id == "orderingsystem") {
								originalOrderingSystemData = data;
								drawOrderingSystem(isMainpage, divIdforChart,
										divIdforTable, data, itemNbrFormatter);
							}
						});
						

					} // End of function drawDetailsofChart
					function drawOrderThroughput(isMainpage, divIdforChart,
							divIdforTable, data, itemNbrFormatter) {
						if (data.replace(/^\s+|\s+$/g, '') == ""
								|| (/^<html><head><title>/).test(data)) {
							data = google.visualization.arrayToDataTable([
									[ 'Time', 'Orders' ],
									[ 'No Data found', 0 ] ]);
							var chart = new google.visualization.LineChart(
									document.getElementById(divIdforChart));
							chart.draw(data, null);
						} else {
							data = new google.visualization.DataTable(data);
							itemNbrFormatter.format(data, 1);
							var options = {
								curveType : 'function',
								lineWidth : 2,
								hAxis : {
									slantedText : true,
									slantedTextAngle : 30
								}
							};
							if (!isMainpage) {
								options.width = 700;
							}
							var chart = new google.visualization.LineChart(
									document.getElementById(divIdforChart));
							chart.draw(data, options);

							if (!isMainpage) {
								var table = new google.visualization.Table(
										document.getElementById(divIdforTable));
								table.draw(data, {
									showRowNumber : true
								});

								// When the table is selected, update the
								// orgchart.
								google.visualization.events.addListener(table,
										'select', function() {
											chart.setSelection(table
													.getSelection());
										});

								// When the chart is selected, update the table
								// visualization.
								google.visualization.events.addListener(chart,
										'select', function() {
											table.setSelection(chart
													.getSelection());
										});

							}
						}

					}// End of drawOrderThroughput
//					function drawOrderStatus(isMainpage, divIdforChart,
//							divIdforTable, data, itemNbrFormatter) {
//						if (data.replace(/^\s+|\s+$/g, '') == ""
//								|| (/^<html><head><title>/).test(data)) {
//							data = google.visualization
//									.arrayToDataTable([
//											[ "Time", "Completed",
//													"Inprogress", "Received",
//													"Instransit", "Error" ],
//											[ 'No Data found', 0, 0, 0, 0, 0 ] ]);
//							var chart = new google.visualization.LineChart(
//									document.getElementById(divIdforChart));
//							chart.draw(data, null);
//						} else {
//							data = new google.visualization.DataTable(data);
//							itemNbrFormatter.format(data, 1);
//							itemNbrFormatter.format(data, 2);
//							itemNbrFormatter.format(data, 3);
//							itemNbrFormatter.format(data, 4);
//							itemNbrFormatter.format(data, 5);
//
//							var options = {
//								width : '100%',
//								hAxis : {
//									slantedText : true,
//									slantedTextAngle : 30
//								}
//							};
//							if (!isMainpage) {
//								options.width = 700;
//							}
//							var chart = new google.visualization.ColumnChart(
//									document.getElementById(divIdforChart));
//							chart.draw(data, options);
//							if (!isMainpage) {
//								var table = new google.visualization.Table(
//										document.getElementById(divIdforTable));
//								table.draw(data, {
//									showRowNumber : true
//								});
//
//								// When the table is selected, update the
//								// orgchart.
//								google.visualization.events.addListener(table,
//										'select', function() {
//											chart.setSelection(table
//													.getSelection());
//										});
//
//								// When the chart is selected, update the table
//								// visualization.
//								google.visualization.events.addListener(chart,
//										'select', function() {
//											table.setSelection(chart
//													.getSelection());
//										});
//
//							}
//						}
//					}// End of drawOrderStatus
//					function drawOrderTypes(isMainpage, divIdforChart,
//							divIdforTable, data, itemNbrFormatter) {
//						if ((/^<html><head><title>/).test(data)) { //data.replace(/^\s+|\s+$/g, '') == "" || 
//							data = google.visualization.arrayToDataTable([
//									[ 'Time', 'Deli', 'Bakery', 'Wine' ],
//									[ 'No Data found', 0, 0, 0 ] ]);
//							var chart = new google.visualization.LineChart(
//									document.getElementById(divIdforChart));
//							chart.draw(data, null);
//						} else {
//							data = new google.visualization.DataTable(data);
//							itemNbrFormatter.format(data, 1);
//							itemNbrFormatter.format(data, 2);
//							itemNbrFormatter.format(data, 3);
//							var options = {
//								width : '100%',
//								hAxis : {
//									slantedText : true,
//									slantedTextAngle : 30
//								}
//							};
//							if (!isMainpage) {
//								options.width = 700;
//							}
//							var chart = new google.visualization.ColumnChart(
//									document.getElementById(divIdforChart));
//							chart.draw(data, options);
//							if (!isMainpage) {
//								var table = new google.visualization.Table(
//										document.getElementById(divIdforTable));
//								table.draw(data, {
//									showRowNumber : true
//								});
//
//								// When the table is selected, update the
//								// orgchart.
//								google.visualization.events.addListener(table,
//										'select', function() {
//											chart.setSelection(table
//													.getSelection());
//										});
//
//								// When the chart is selected, update the table
//								// visualization.
//								google.visualization.events.addListener(chart,
//										'select', function() {
//											table.setSelection(chart
//													.getSelection());
//										});
//
//							}
//						}
//					}// End of drawOrderTypes
//					function drawOrderBasketSize(isMainpage, divIdforChart,
//							divIdforTable, data, itemNbrFormatter) {
//						if (data.replace(/^\s+|\s+$/g, '') == ""
//								|| (/^<html><head><title>/).test(data)) {
//							data = google.visualization.arrayToDataTable([
//									[ 'Time', 'Max', 'Min',
//											'Average Basket Size',
//											'Dollar Value' ],
//									[ 'No Data found', 0, 0, 0, 0 ] ]);
//							var chart = new google.visualization.LineChart(
//									document.getElementById(divIdforChart));
//							chart.draw(data, null);
//						} else {
//							data = new google.visualization.DataTable(data);
//							itemNbrFormatter.format(data, 1);
//							itemNbrFormatter.format(data, 2);
//							itemNbrFormatter.format(data, 3);
//
//							var currencyFormatter = new google.visualization.NumberFormat(
//									{
//										negativeParens : true,
//										pattern : '$###,###.##'
//									});
//							currencyFormatter.format(data, 4);
//
//							var options = {
//								title : 'Basket Size & Dollar Value',
//								vAxes : [ {
//									title : "Items",
//									titleTextStyle : {
//										color : '#85578f'
//									},
//									textStyle : {
//										color : '#85578f'
//									}
//
//								}, {
//									title : 'Dolar Value',
//									pointSize : 6,
//									format : '$###,###,###.00',
//									titleTextStyle : {
//										color : '#0072dc'
//									},
//									textStyle : {
//										color : '#0072dc'
//									}
//
//								} // Axis 1
//								],
//								hAxis : {
//								// slantedText : true,
//								// slantedTextAngle : 30
//								},
//								colors : [ '#85578f', '#ff3333', '#49cd61',
//										'#0072dc' ],
//
//								visibleInLegend : false,
//
//								seriesType : "steppedArea",
//
//								series : {
//									0 : {
//										type : "steppedArea",
//										areaOpacity : 0.2
//									},
//									1 : {
//										color : 'white',
//										lineWidth : 1,
//										areaOpacity : 1,
//										visibleInLegend : false
//									},
//									2 : {
//										type : "line"
//									},
//									3 : {
//										type : "line",
//										targetAxisIndex : 1
//									}
//								},
//								legend : {
//									position : 'bottom',
//									alignment : 'start'
//								}
//
//							};
//							if (!isMainpage) {
//								options.width = 1000;
//								options.height = 500;
//								options.hAxis = {
//									slantedText : true,
//									slantedTextAngle : 30,
//									allowContainerBoundaryTextCufoff : true
//								};
//
//							}
//
//							var chart = new google.visualization.ComboChart(
//									document.getElementById(divIdforChart));
//							chart.draw(data, options);
//
//							if (!isMainpage) {
//								var table = new google.visualization.Table(
//										document.getElementById(divIdforTable));
//								table.draw(data, {
//									showRowNumber : true
//								});
//
//								// When the table is selected, update the
//								// orgchart.
//								google.visualization.events.addListener(table,
//										'select', function() {
//											chart.setSelection(table
//													.getSelection());
//										});
//
//								// When the chart is selected, update the table
//								// visualization.
//								google.visualization.events.addListener(chart,
//										'select', function() {
//											table.setSelection(chart
//													.getSelection());
//										});
//
//							}
//						}
//					}// End of drawOrderBasketSize
//					function drawFulfillmentSystem(isMainpage, divIdforChart,
//							divIdforTable, data, itemNbrFormatter) {
//						if (data.replace(/^\s+|\s+$/g, '') == ""
//								|| (/^<html><head><title>/).test(data)) {
//							data = google.visualization.arrayToDataTable([
//									[ 'Time', 'In-Store', 'Ecom Dist Center',
//											'Warehouse', 'Vendor' ],
//									[ 'No Data found', 0, 0, 0, 0 ] ]);
//							var table = new google.visualization.Table(document
//									.getElementById(divIdforTable));
//							table.draw(data);
//						} else {
//							data = new google.visualization.DataTable(data);
//							// itemNbrFormatter.format(data, 1);
//							// itemNbrFormatter.format(data, 2);
//							// itemNbrFormatter.format(data, 3);
//							// itemNbrFormatter.format(data, 4);
//							var table = new google.visualization.Table(document
//									.getElementById(divIdforTable));
//							table.draw(data, {
//								showRowNumber : true
//							});
//							if (!isMainpage) {
//								drawStackedChart(data, divIdforChart);
//							}
//						}
//					}// End of drawFulfillmentSystem
//					function drawOrderingSystem(isMainpage, divIdforChart,
//							divIdforTable, data, itemNbrFormatter) {
//						if (data.replace(/^\s+|\s+$/g, '') == ""
//								|| (/^<html><head><title>/).test(data)) {
//							data = google.visualization.arrayToDataTable([
//									[ 'Time', 'HEB.com', 'SRS',
//											'In-Store/Layaway' ],
//									[ 'No Data found', 0, 0, 0 ] ]);
//							var table = new google.visualization.Table(document
//									.getElementById(divIdforTable));
//							table.draw(data);
//						} else {
//							data = new google.visualization.DataTable(data);
//							itemNbrFormatter.format(data, 1);
//							itemNbrFormatter.format(data, 2);
//							itemNbrFormatter.format(data, 3);
//							var table = new google.visualization.Table(document
//									.getElementById(divIdforTable));
//							table.draw(data, {
//								showRowNumber : true
//							});
//							if (!isMainpage) {
//								drawStackedChart(data, divIdforChart);
//							}
//						}
//					}// End of drawOrderingSystem

				}

		);
function groupOrderBasketSizesChart(range,id) {
	var clone = JSON.parse(JSON.stringify(originalBasketSizeData));
	var keySpit = "/";
	var rows = clone["rows"];
	var rowsNew = new Array();
	var indexRowsNew = 0;
	if(range != 3){
		var i = 0;
		while (i < rows.length) {
			var elementRowsOld = rows[i];
			var objectCOld = elementRowsOld["c"];	
			var dateCOld = objectCOld[0];								
			var arrDateOld = dateCOld["v"].split(keySpit);
			switch (range) {
			case 1:
				rowsNew = rows;
				break;
			case 2:
				rowsNew = rows;
				break;
			case 3:
				rowsNew = rows;
				break;
			case 4:
				//1M
				dateCOld["v"] = arrDateOld[0]+keySpit+arrDateOld[1];
				var j = i+1;
				var count = 1;	
				var max = objectCOld[1];	
				var min = objectCOld[2];	
				var average = objectCOld[3];	
				var sum = objectCOld[4];	
//				dateCOldCount["v"];
				while( j < rows.length) {
					var elementRows = rows[j];
					var objectC = elementRows["c"];								
					var dateC = objectC[0];								
					var arrDate = dateC["v"].split(keySpit);
					if(arrDateOld[0] == arrDate[0] && arrDateOld[1] == arrDate[1]){
						var maxNew = objectC[1];	
						var minNew = objectC[2];	
						var averageNew = objectC[3];	
						var sumNew = objectC[4];		
						count++;
						if(parseInt(max["v"]) < parseInt(maxNew["v"])) {
							max["v"] = maxNew["v"];
						}
						if(parseInt(min["v"]) > parseInt(minNew["v"])) {
							min["v"] = minNew["v"];
						}
						average["v"] =  parseFloat(average["v"]) + parseFloat(averageNew["v"]);
						sum["v"] =  parseFloat(sum["v"]) + parseFloat(sumNew["v"]);
						j++;
					}else {
						break;
					}
				}
				average["v"] =  parseFloat(average["v"])/count;
				rowsNew[indexRowsNew] = rows[i];
				i = j;
				break;
			case 5:
				//3M
				var j = i+1;
				var count = 1;	
				var max = objectCOld[1];	
				var min = objectCOld[2];	
				var average = objectCOld[3];	
				var sum = objectCOld[4];	
//				dateCOldCount["v"];
				while( j < rows.length) {
					var elementRows = rows[j];
					var objectC = elementRows["c"];								
					var dateC = objectC[0];								
					var arrDate = dateC["v"].split(keySpit);
					if(arrDateOld[0] == arrDate[0] && checkQuaterOfYear(arrDateOld[1]) == checkQuaterOfYear(arrDate[1])){
						var maxNew = objectC[1];	
						var minNew = objectC[2];	
						var averageNew = objectC[3];	
						var sumNew = objectC[4];		
						count++;
						if(parseInt(max["v"]) < parseInt(maxNew["v"])) {
							max["v"] = maxNew["v"];
						}
						if(parseInt(min["v"]) > parseInt(minNew["v"])) {
							min["v"] = minNew["v"];
						}
						average["v"] =  parseFloat(average["v"]) + parseFloat(averageNew["v"]);
						sum["v"] =  parseFloat(sum["v"]) + parseFloat(sumNew["v"]);
						j++;
					}else {
						break;
					}
				}
				average["v"] =  parseFloat(average["v"])/count;
				
				dateCOld["v"] = arrDateOld[0] + " Q"+checkQuaterOfYear(arrDateOld[1]);
				rowsNew[indexRowsNew] = rows[i];
				i = j;
				break;	
			case 6:
				//6M
				rowsNew = rows;
				break;	
			default:
				break;
			}
			//ex Date(2013,12,25,15,22,30); format : Date(yyyy,MM,dd,hh,mi,ss);
			indexRowsNew++;
		}
	}else {
		rowsNew = clone["rows"];
	}
	clone["rows"] = rowsNew;
	var itemNbrFormatter = new google.visualization.NumberFormat(
			{
				pattern : '###,###'
			});
	drawOrderBasketSize(true, id, id, clone, itemNbrFormatter);
}
function groupOrderStatusChart(range,id) {
	var clone = JSON.parse(JSON.stringify(originalOrderStatusData));
	var keySpit = "/";
	var rows = clone["rows"];
	var rowsNew = new Array();
	if(range != 3){
		var indexRowsNew = 0;
		var i = 0;
		while (i < rows.length) {
			var elementRowsOld = rows[i];
			var objectCOld = elementRowsOld["c"];	
			var dateCOld = objectCOld[0];								
			var arrDateOld = dateCOld["v"].split(keySpit);
			switch (range) {
			case 1:
				rowsNew = rows;
				break;
			case 2:
				rowsNew = rows;
				break;
			case 3:
				rowsNew = rows;
				break;
			case 4:
				//1M
				dateCOld["v"] = arrDateOld[0]+keySpit+arrDateOld[1];
				var j = i+1;
				while( j < rows.length) {
					var elementRows = rows[j];
					var objectC = elementRows["c"];								
					var dateC = objectC[0];								
					var arrDate = dateC["v"].split(keySpit);
					if(arrDateOld[1] == arrDate[1]){
						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
							var dateCOldCount = objectCOld[int2];	
							var dateCCount = objectC[int2];	
							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
						}
						j++;
					}else {
						break;
					}
				}
				rowsNew[indexRowsNew] = rows[i];
				i = j;
				break;	
			case 5:
				//3M
				var j = i+1;
				while( j < rows.length) {
					var elementRows = rows[j];
					var objectC = elementRows["c"];								
					var dateC = objectC[0];								
					var arrDate = dateC["v"].split(keySpit);
					
					if(checkQuaterOfYear(arrDateOld[1]) == checkQuaterOfYear(arrDate[1])){
						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
							var dateCOldCount = objectCOld[int2];	
							var dateCCount = objectC[int2];	
							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
						}
						j++;
					}else {
						break;
					}
				}
				dateCOld["v"] = arrDateOld[0] + " Q"+checkQuaterOfYear(arrDateOld[1]);
				rowsNew[indexRowsNew] = rows[i];
				i = j;
				break;	
			case 6:
				//6M
				break;	
			default:
				break;
			}
			indexRowsNew++;
		}
	}else {
		rowsNew = rows;
	}
	clone["rows"] = rowsNew;
	var itemNbrFormatter = new google.visualization.NumberFormat(
			{
				pattern : '###,###'
			});
	drawOrderStatus(true, id, id, clone, itemNbrFormatter);
}
function groupOrderTypesChart(range,id) {
	var clone = JSON.parse(JSON.stringify(originalOrderTypeData));
	var keySpit = "/";
	var rows = clone["rows"];
	var rowsNew = new Array();
	if(range != 3){
		var indexRowsNew = 0;
		var i = 0;
		while (i < rows.length) {
			var elementRowsOld = rows[i];
			var objectCOld = elementRowsOld["c"];	
			var dateCOld = objectCOld[0];								
			var arrDateOld = dateCOld["v"].split(keySpit);
			switch (range) {
			case 1:
				rowsNew = rows;
				break;
			case 2:
//				dateCOld["v"] = arrDateOld[0]+keySpit+arrDateOld[1]+keySpit+arrDateOld[2]+keySpit+arrDateOld[3];
//				var j = i+1;
//				while( j < rows.length) {
//					var elementRows = rows[j];
//					var objectC = elementRows["c"];								
//					var dateC = objectC[0];								
//					var arrDate = dateC["v"].split(keySpit);
//					if(arrDateOld[3] == arrDate[3]){
//						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
//							var dateCOldCount = objectCOld[int2];	
//							var dateCCount = objectC[int2];	
//							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
//						}
//						j++;
//					}else {
//						break;
//					}
//				}
//				rowsNew[indexRowsNew] = rows[i];
//				i = j;
				break;
			case 3:
//				dateCOld["v"] = arrDateOld[0]+keySpit+arrDateOld[1]+keySpit+arrDateOld[2];
//				var j = i+1;
//				while( j < rows.length) {
//					var elementRows = rows[j];
//					var objectC = elementRows["c"];								
//					var dateC = objectC[0];								
//					var arrDate = dateC["v"].split(keySpit);
//					if(arrDateOld[2] == arrDate[2]){
//						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
//							var dateCOldCount = objectCOld[int2];	
//							var dateCCount = objectC[int2];	
//							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
//						}
//						j++;
//					}else {
//						break;
//					}
//				}
//				rowsNew[indexRowsNew] = rows[i];
//				i = j;
				break;
			case 4:
				//1M
				dateCOld["v"] = arrDateOld[0]+keySpit+arrDateOld[1];
				var j = i+1;
				while( j < rows.length) {
					var elementRows = rows[j];
					var objectC = elementRows["c"];								
					var dateC = objectC[0];								
					var arrDate = dateC["v"].split(keySpit);
					if(arrDateOld[1] == arrDate[1]){
						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
							var dateCOldCount = objectCOld[int2];	
							var dateCCount = objectC[int2];	
							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
						}
						j++;
					}else {
						break;
					}
				}
				rowsNew[indexRowsNew] = rows[i];
				i = j;
				break;	
			case 5:
				//3M
				var j = i+1;
				while( j < rows.length) {
					var elementRows = rows[j];
					var objectC = elementRows["c"];								
					var dateC = objectC[0];								
					var arrDate = dateC["v"].split(keySpit);
					
					if(checkQuaterOfYear(arrDateOld[1]) == checkQuaterOfYear(arrDate[1])){
						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
							var dateCOldCount = objectCOld[int2];	
							var dateCCount = objectC[int2];	
							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
						}
						j++;
					}else {
						break;
					}
				}
				dateCOld["v"] = arrDateOld[0] + " Q"+checkQuaterOfYear(arrDateOld[1]);
				rowsNew[indexRowsNew] = rows[i];
				i = j;
				break;	
			case 6:
				//6M
//				var j = i+1;
//				while( j < rows.length) {
//					var elementRows = rows[j];
//					var objectC = elementRows["c"];								
//					var dateC = objectC[0];								
//					var arrDate = dateC["v"].split(keySpit);
//					
//					if(checkSixMonOfYear(arrDateOld[1]) == checkSixMonOfYear(arrDate[1])){
//						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
//							var dateCOldCount = objectCOld[int2];	
//							var dateCCount = objectC[int2];	
//							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
//						}
//						j++;
//					}else {
//						break;
//					}
//				}
//				dateCOld["v"] = arrDateOld[0]+((checkQuaterOfYear(arrDateOld[1]) == 1) ? " Q1,Q2" : " Q3,Q4");
//				rowsNew[indexRowsNew] = rows[i];
//				i = j;
				break;	
			default:
				break;
			}
			//ex Date(2013,12,25,15,22,30); format : Date(yyyy,MM,dd,hh,mi,ss);
			indexRowsNew++;
		}
	}else {
		rowsNew = rows;
	}
	clone["rows"] = rowsNew;
	var itemNbrFormatter = new google.visualization.NumberFormat(
			{
				pattern : '###,###'
			});
	drawOrderTypes(true, id, id, clone, itemNbrFormatter);
}
function groupOrderThroughPutChart(range) {
	var clone = JSON.parse(JSON.stringify(originalOrderThroughputData));
	var keySpit = ",";
	var rows = clone["rows"];
	var rowsNew = new Array();
	if(range != 1){
		var indexRowsNew = 0;
		var i = 0;
		while (i < rows.length) {
			var elementRowsOld = rows[i];
			var objectCOld = elementRowsOld["c"];	
			var dateCOld = objectCOld[0];								
			var arrDateOld = dateCOld["v"].split(keySpit);
			switch (range) {
			case 1:
				rowsNew = rows;
				break;
			case 2:
				dateCOld["v"] = arrDateOld[0]+keySpit+arrDateOld[1]+keySpit+arrDateOld[2]+keySpit+arrDateOld[3]+")";
				var j = i+1;
				while( j < rows.length) {
					var elementRows = rows[j];
					var objectC = elementRows["c"];								
					var dateC = objectC[0];								
					var arrDate = dateC["v"].split(keySpit);
					if(arrDateOld[3] == arrDate[3]){
						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
							var dateCOldCount = objectCOld[int2];	
							var dateCCount = objectC[int2];	
							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
						}
						j++;
					}else {
						break;
					}
				}
				rowsNew[indexRowsNew] = rows[i];
				i = j;
				break;
			case 3:
				dateCOld["v"] = arrDateOld[0]+keySpit+arrDateOld[1]+keySpit+arrDateOld[2]+")";
				var j = i+1;
				while( j < rows.length) {
					var elementRows = rows[j];
					var objectC = elementRows["c"];								
					var dateC = objectC[0];								
					var arrDate = dateC["v"].split(keySpit);
					if(arrDateOld[2] == arrDate[2]){
						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
							var dateCOldCount = objectCOld[int2];	
							var dateCCount = objectC[int2];	
							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
						}
						j++;
					}else {
						break;
					}
				}
				rowsNew[indexRowsNew] = rows[i];
				i = j;
				break;
			case 4:
				//1M
				dateCOld["v"] = arrDateOld[0]+keySpit+arrDateOld[1]+")";
				var j = i+1;
				while( j < rows.length) {
					var elementRows = rows[j];
					var objectC = elementRows["c"];								
					var dateC = objectC[0];								
					var arrDate = dateC["v"].split(keySpit);
					if(arrDateOld[1] == arrDate[1]){
						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
							var dateCOldCount = objectCOld[int2];	
							var dateCCount = objectC[int2];	
							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
						}
						j++;
					}else {
						break;
					}
				}
				rowsNew[indexRowsNew] = rows[i];
				i = j;
				break;	
			case 5:
				//3M
				var j = i+1;
				while( j < rows.length) {
					var elementRows = rows[j];
					var objectC = elementRows["c"];								
					var dateC = objectC[0];								
					var arrDate = dateC["v"].split(keySpit);
					
					if(checkQuaterOfYear(arrDateOld[1]) == checkQuaterOfYear(arrDate[1])){
						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
							var dateCOldCount = objectCOld[int2];	
							var dateCCount = objectC[int2];	
							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
						}
						j++;
					}else {
						break;
					}
				}
				dateCOld["v"] = arrDateOld[0] + " Q"+checkQuaterOfYear(arrDateOld[1]);
				rowsNew[indexRowsNew] = rows[i];
				i = j;
				break;	
			case 6:
				//6M
				var j = i+1;
				while( j < rows.length) {
					var elementRows = rows[j];
					var objectC = elementRows["c"];								
					var dateC = objectC[0];								
					var arrDate = dateC["v"].split(keySpit);
					
					if(checkSixMonOfYear(arrDateOld[1]) == checkSixMonOfYear(arrDate[1])){
						for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
							var dateCOldCount = objectCOld[int2];	
							var dateCCount = objectC[int2];	
							dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
						}
						j++;
					}else {
						break;
					}
				}
				dateCOld["v"] = arrDateOld[0]+((checkQuaterOfYear(arrDateOld[1]) == 1) ? " Q1,Q2" : " Q3,Q4");
				rowsNew[indexRowsNew] = rows[i];
				i = j;
				break;	
			default:
				break;
			}
			//ex Date(2013,12,25,15,22,30); format : Date(yyyy,MM,dd,hh,mi,ss);
			indexRowsNew++;
		}
	}else {
		rowsNew = rows;
	}
	clone["rows"] = rowsNew;
	var data = new google.visualization.DataTable(clone);
	var annotatedtimeline = new google.visualization.AnnotatedTimeLine(
			document.getElementById('orderthroughput'));
	annotatedtimeline.draw(data, {
		'colors' : [ '#33CCCC' ],
		'dateFormat' : 'yyyy/MM/dd',
		'displayAnnotations' : false,
		'displayZoomButtons' : false,
		'displayDateBarSeparator' : false,
		'numberFormats' : '###,###',
		'fill' : 30,
		'scaleColumns' : [ 0, 1 ],
		'scaleType' : 'allfixed',
		'thickness' : 2,
		'wmode' : 'transparent'
	});
}
function rangeClickChart(range,id) {
	if (id == "orderthroughput") {
		groupOrderThroughPutChart(range);
	} else if (id == "orderstatus") {
		groupOrderStatusChart(range,id);
	} else if (id == "ordertypes") {
		groupOrderTypesChart(range,id);
	} else if (id == "orderbasketsize") {
		groupOrderBasketSizesChart(range,id);
	} else if (id == "fulfillmentsystem") {
	} else if (id == "orderingsystem") {
	}
}
function checkQuaterOfYear(mon){
	var monTemp = parseInt(mon);
	if(monTemp == 1 || monTemp == 2 || monTemp == 3) {
		return 1;
	}else if(monTemp == 4 || monTemp == 5 || monTemp == 6) {
		return 2;
	}else if(monTemp == 7 || monTemp == 8 || monTemp == 9) {
		return 3;
	}else {
		return 4;
	}
}
function checkSixMonOfYear(mon){
	var monTemp = parseInt(mon);
	if(monTemp == 1 || monTemp == 2 || monTemp == 3 || monTemp == 4 || monTemp == 5 || monTemp == 6) {
		return 1;
	}else {
		return 2;
	}
}
function drawOrderTypes(isMainpage, divIdforChart,
		divIdforTable, data, itemNbrFormatter) {
	if (!checkDataOfJson(data)) { //data.replace(/^\s+|\s+$/g, '') == "" || 
		data = google.visualization.arrayToDataTable([
				[ 'Time', 'Deli', 'Bakery', 'Wine' ],
				[ 'No Data found', 0, 0, 0 ] ]);
		var chart = new google.visualization.LineChart(
				document.getElementById(divIdforChart));
		chart.draw(data, null);
	} else {
		data = new google.visualization.DataTable(data);
		itemNbrFormatter.format(data, 1);
		itemNbrFormatter.format(data, 2);
		itemNbrFormatter.format(data, 3);
		var options = {
			width : '100%',
			hAxis : {
				slantedText : true,
				slantedTextAngle : 30
			}
		};
		if (!isMainpage) {
			options.width = 700;
		}
		var chart = new google.visualization.ColumnChart(
				document.getElementById(divIdforChart));
		chart.draw(data, options);
		if (!isMainpage) {
			var table = new google.visualization.Table(
					document.getElementById(divIdforTable));
			table.draw(data, {
				showRowNumber : true
			});

			// When the table is selected, update the
			// orgchart.
			google.visualization.events.addListener(table,
					'select', function() {
						chart.setSelection(table
								.getSelection());
					});

			// When the chart is selected, update the table
			// visualization.
			google.visualization.events.addListener(chart,
					'select', function() {
						table.setSelection(chart
								.getSelection());
					});

		}
	}
}// End of drawOrderTypes
function drawFulfillmentSystem(isMainpage, divIdforChart,
		divIdforTable, data, itemNbrFormatter) {
	if (!checkDataOfJson(data)) {
		data = google.visualization.arrayToDataTable([
				[ 'Time', 'In-Store', 'Ecom Dist Center',
						'Warehouse', 'Vendor' ],
				[ 'No Data found', 0, 0, 0, 0 ] ]);
		var table = new google.visualization.Table(document
				.getElementById(divIdforTable));
		table.draw(data);
	} else {
		data = new google.visualization.DataTable(data);
		// itemNbrFormatter.format(data, 1);
		// itemNbrFormatter.format(data, 2);
		// itemNbrFormatter.format(data, 3);
		// itemNbrFormatter.format(data, 4);
		var table = new google.visualization.Table(document
				.getElementById(divIdforTable));
		table.draw(data, {
			showRowNumber : true
		});
		if (!isMainpage) {
			drawStackedChart(data, divIdforChart);
		}
	}
}// End of drawFulfillmentSystem
function drawOrderingSystem(isMainpage, divIdforChart,
		divIdforTable, data, itemNbrFormatter) {
	if (!checkDataOfJson(data)) {
		data = google.visualization.arrayToDataTable([
				[ 'Time', 'HEB.com', 'SRS',
						'In-Store/Layaway' ],
				[ 'No Data found', 0, 0, 0 ] ]);
		var table = new google.visualization.Table(document
				.getElementById(divIdforTable));
		table.draw(data);
	} else {
		data = new google.visualization.DataTable(data);
		itemNbrFormatter.format(data, 1);
		itemNbrFormatter.format(data, 2);
		itemNbrFormatter.format(data, 3);
		var table = new google.visualization.Table(document
				.getElementById(divIdforTable));
		table.draw(data, {
			showRowNumber : true
		});
		if (!isMainpage) {
			drawStackedChart(data, divIdforChart);
		}
	}
}// End of drawOrderingSystem
function drawOrderBasketSize(isMainpage, divIdforChart,
		divIdforTable, data, itemNbrFormatter) {
	if (!checkDataOfJson(data)) {
		data = google.visualization.arrayToDataTable([
				[ 'Time', 'Max', 'Min',
						'Average Basket Size',
						'Dollar Value' ],
				[ 'No Data found', 0, 0, 0, 0 ] ]);
		var chart = new google.visualization.LineChart(
				document.getElementById(divIdforChart));
		chart.draw(data, null);
	} else {
		data = new google.visualization.DataTable(data);
		itemNbrFormatter.format(data, 1);
		itemNbrFormatter.format(data, 2);
		itemNbrFormatter.format(data, 3);

		var currencyFormatter = new google.visualization.NumberFormat(
				{
					negativeParens : true,
					pattern : '$###,###.##'
				});
		currencyFormatter.format(data, 4);

		var options = {
			title : 'Basket Size & Dollar Value',
			vAxes : [ {
				title : "Items",
				titleTextStyle : {
					color : '#85578f'
				},
				textStyle : {
					color : '#85578f'
				}

			}, {
				title : 'Dolar Value',
				pointSize : 6,
				format : '$###,###,###.00',
				titleTextStyle : {
					color : '#0072dc'
				},
				textStyle : {
					color : '#0072dc'
				}

			} // Axis 1
			],
			hAxis : {
			// slantedText : true,
			// slantedTextAngle : 30
			},
			colors : [ '#85578f', '#ff3333', '#49cd61',
					'#0072dc' ],

			visibleInLegend : false,

			seriesType : "steppedArea",

			series : {
				0 : {
					type : "steppedArea",
					areaOpacity : 0.2
				},
				1 : {
					color : 'white',
					lineWidth : 1,
					areaOpacity : 1,
					visibleInLegend : false
				},
				2 : {
					type : "line"
				},
				3 : {
					type : "line",
					targetAxisIndex : 1
				}
			},
			legend : {
				position : 'bottom',
				alignment : 'start'
			}

		};
		if (!isMainpage) {
			options.width = 1000;
			options.height = 500;
			options.hAxis = {
				slantedText : true,
				slantedTextAngle : 30,
				allowContainerBoundaryTextCufoff : true
			};

		}

		var chart = new google.visualization.ComboChart(
				document.getElementById(divIdforChart));
		chart.draw(data, options);

		if (!isMainpage) {
			var table = new google.visualization.Table(
					document.getElementById(divIdforTable));
			table.draw(data, {
				showRowNumber : true
			});

			// When the table is selected, update the
			// orgchart.
			google.visualization.events.addListener(table,
					'select', function() {
						chart.setSelection(table
								.getSelection());
					});

			// When the chart is selected, update the table
			// visualization.
			google.visualization.events.addListener(chart,
					'select', function() {
						table.setSelection(chart
								.getSelection());
					});

		}
	}
}// End of drawOrderBasketSize
function checkDataOfJson(data) {
	var rows = data["rows"];
	if(rows.length > 0) {
		return true;
	}else {
		return false;
	}
}
function drawOrderStatus(isMainpage, divIdforChart,
		divIdforTable, data, itemNbrFormatter) {
	if (!checkDataOfJson(data)) {
		data = google.visualization
				.arrayToDataTable([
						[ "Time", "Completed",
								"Inprogress", "Received",
								"Instransit", "Error" ],
						[ 'No Data found', 0, 0, 0, 0, 0 ] ]);
		var chart = new google.visualization.LineChart(
				document.getElementById(divIdforChart));
		chart.draw(data, null);
	} else {
		data = new google.visualization.DataTable(data);
//		itemNbrFormatter.format(data, 1);
//		itemNbrFormatter.format(data, 2);
//		itemNbrFormatter.format(data, 3);
//		itemNbrFormatter.format(data, 4);
//		itemNbrFormatter.format(data, 5);

		var options = {
			width : '100%',
			hAxis : {
				slantedText : true,
				slantedTextAngle : 30
			}
		};
		if (!isMainpage) {
			options.width = 700;
		}
		var chart = new google.visualization.ColumnChart(
				document.getElementById(divIdforChart));
		chart.draw(data, options);
		if (!isMainpage) {
			var table = new google.visualization.Table(
					document.getElementById(divIdforTable));
			table.draw(data, {
				showRowNumber : true
			});

			// When the table is selected, update the
			// orgchart.
			google.visualization.events.addListener(table,
					'select', function() {
						chart.setSelection(table
								.getSelection());
					});

			// When the chart is selected, update the table
			// visualization.
			google.visualization.events.addListener(chart,
					'select', function() {
						table.setSelection(chart
								.getSelection());
					});

		}
	}
}// End of drawOrderStatus
function processGroup(i,rows,rowsNew,indexRowsNew,keySpit,arrDateOld,objectCOld,range){
	var j = i+1;
	while( j < rows.length) {
		var elementRows = rows[j];
		var objectC = elementRows["c"];								
		var dateC = objectC[0];								
		var arrDate = dateC["v"].split(keySpit);
		if(arrDateOld[range] == arrDate[range]){
			for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
				var dateCOldCount = objectCOld[int2];	
				var dateCCount = objectC[int2];	
				dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
			}
			j++;
		}else {
			rowsNew[indexRowsNew] = rows[i];
			break;
		}
	}
	i = j;
}
