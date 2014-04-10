var constants = {
		   'orderthroughput': 'orderthroughput',
		   'orderstatus': 'orderstatus',
		   'orderbasketsize': 'orderbasketsize',
		   'ordertypes': 'ordertypes',
		   'fulfillmentsystem': 'fulfillmentsystem',
		   'orderingsystem': 'orderingsystem'
		};
$(document)
		.ready(
				function() {
					var numberRowperPage = 10;
					google.load('visualization', '1',
							{
								packages : [ 'corechart', 'annotatedtimeline',
										'table' ],
								callback : initiateDefaultChart
							});
					
					function initiateDefaultChart() {

						var today = new Date();
						var time = new Date(today.getFullYear(), today
								.getMonth(), today.getDate()).getTime();

						var myDate = ('0' + (today.getMonth() + 1)).slice(-2)
								+ '/' + ('0' + today.getDate()).slice(-2) + '/'
								+ today.getFullYear();

						$('#orderthroughput-daterange, #orderstatus-daterange, #ordertypes-daterange, #orderbasketsize-daterange, #fulfillmentsystem-daterange, #orderingsystem-daterange')
								.val(myDate + " - " + myDate);

						getData(constants.orderthroughput, time, time);
						getData(constants.orderstatus, time, time);
						getData(constants.orderbasketsize, time, time);
						getData(constants.ordertypes, time, time);
						getData(constants.fulfillmentsystem, time, time);
						getData(constants.orderingsystem, time, time);

					}/* end of initiateDefaultChart */

					var originalOrderThroughputData, originalOrderStatusData, originalOrderTypeData, originalBasketSizeData, originalFulfillmentSystemData, originalOrderingSystemData = null;
					var currentOrderThroughputData, currentOrderStatusData, currentOrderTypeData, currentBasketSizeData, currentFulfillmentSystemData, currentOrderingSystemData = null;

					function getData(id, startdate, enddate) {
						reset_groupby(id,0);
						var loadingCycle = new ajaxLoader("#" + id + "_loading");
					
						$.ajax(
								{
									type : "GET",
									url : "ajaxGetData?name=" + id
											+ "&startdate=" + startdate
											+ "&enddate=" + enddate,
									dataType : "json",
									cache : false,
									async : true
								}).done(function(data) {
							if (id === constants.orderthroughput) {
								originalOrderThroughputData = data;
								currentOrderThroughputData = data;
								if(startdate.toString()==enddate.toString()){
									$('#' + id + '_min_btn').removeAttr("disabled");
									$('#' + id + '_hour_btn').removeAttr("disabled");
									$('#' + id + '_day_btn').attr("disabled", "disabled");
									$('#' + id + '_mon_btn').attr("disabled", "disabled");
								}else{
									$('#' + id + '_min_btn').attr("disabled", "disabled");
									$('#' + id + '_hour_btn').attr("disabled", "disabled");
									$('#' + id + '_day_btn').removeAttr("disabled");
									$('#' + id + '_mon_btn').removeAttr("disabled");
									reset_groupby(id,2);
								}
							} else if (id === constants.orderstatus) {
								originalOrderStatusData = data;
								currentOrderStatusData = data;
							} else if (id === constants.ordertypes) {
								originalOrderTypeData = data;
								currentOrderTypeData = data;
							} else if (id === constants.orderbasketsize) {
								originalBasketSizeData = data;
								currentBasketSizeData = data;
							} else if (id === constants.fulfillmentsystem) {
								originalFulfillmentSystemData = data;
								currentFulfillmentSystemData = data;
							} else if (id === constants.orderingsystem) {
								originalOrderingSystemData = data;
								currentOrderingSystemData = data;
							}
							
							drawDetailsofChart(id, true);
							if(loadingCycle) loadingCycle.remove();
						});
					}
					function reset_groupby(activeId,index) {
						var obj = $("#"+activeId).parent().find("button")[index];
						$(obj).siblings().removeClass('active');
						$(obj).addClass('active');
					} /* reset_groupby */
					
					function drawDetailsofChart(id, isMainpage) {

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

						if (id === constants.orderthroughput) {
							drawOrderThroughput(isMainpage, divIdforChart,
									divIdforTable, currentOrderThroughputData,
									itemNbrFormatter);
						} else if (id === constants.orderstatus) {
							drawOrderStatisticType2(isMainpage, divIdforChart,
									divIdforTable, currentOrderStatusData,
									itemNbrFormatter, id);
						} else if (id === constants.ordertypes) {
							drawOrderStatisticType2(isMainpage, divIdforChart,
									divIdforTable, currentOrderTypeData,
									itemNbrFormatter, id);
						} else if (id === constants.orderbasketsize) {
							drawOrderBasketSize(isMainpage, divIdforChart,
									divIdforTable, currentBasketSizeData,
									itemNbrFormatter);
						} else if (id === constants.fulfillmentsystem) {
							drawOrderStatisticType4(isMainpage, divIdforChart,
									divIdforTable,
									currentFulfillmentSystemData,
									itemNbrFormatter, "Fulfillment System");
						} else if (id === constants.orderingsystem) {
							drawOrderStatisticType4(isMainpage, divIdforChart,
									divIdforTable, currentOrderingSystemData,
									itemNbrFormatter, "Ordering System");

						}

					} /* End of function drawDetailsofChart */

					function drawChartsForDetailsPopup(data, chart, chartOpts,
							divIdforTable) {
						chart.draw(data, chartOpts);

						var table = new google.visualization.Table(document
								.getElementById(divIdforTable));

						table.draw(data, {
							showRowNumber : true,
							page : 'enable',
							pageSize : numberRowperPage,
							pagingButtonsConfiguration : 'auto'
						});

						// When the table is selected, update the
						// relevant chart.
						google.visualization.events.addListener(table,
								'select', function() {
									chart.setSelection(table.getSelection());
								});

						// When the chart is selected, update the table
						// visualization.
						google.visualization.events.addListener(chart,
								'select', function() {
									table.setSelection(chart.getSelection());
								});

					} /* End of drawChartsForDetailsPopup */

					function drawOrderThroughput(isMainpage, divIdforChart,
							divIdforTable, data, itemNbrFormatter) {
						if (!isValidData(data)) {
							data = google.visualization.arrayToDataTable([
									[ 'Time', 'Orders' ],
									[ 'No data available', 0 ] ]);
							var chart = new google.visualization.LineChart(
									document.getElementById(divIdforChart));
							chart.draw(data, null);
						} else {
							data = new google.visualization.DataTable(data);
							itemNbrFormatter.format(data, 1);

							if (isMainpage) {
								var annotatedtimeline = new google.visualization.AnnotatedTimeLine(
										document
												.getElementById(constants.orderthroughput));

								annotatedtimeline.draw(data, {
									'colors' : [ '#33CCCC' ],
									'dateFormat' : 'yyyy.MM.dd.hh.mm',
									'displayAnnotations' : false,
									'displayZoomButtons' : true,
									'displayDateBarSeparator' : false,
									'numberFormats' : '###,###',
									'fill' : 30,
									'scaleColumns' : [ 0, 1 ],
									'scaleType' : 'allfixed',
									'thickness' : 2,
									'wmode' : 'transparent'
								});

							} else {

								var chartOpts = {
									// curveType : 'function',
									title : 'Order Throughput - Date range: '
											+ $('#orderthroughput-daterange')
													.val(),
									lineWidth : 2,
									width : 800,
									height : 300,
									hAxis : {
										slantedText : true,
										slantedTextAngle : 30
									}
								};

								drawChartsForDetailsPopup(
										data,
										new google.visualization.LineChart(
												document
														.getElementById(divIdforChart)),
										chartOpts, divIdforTable);
							}
						}

					}/* End of drawOrderThroughput */

					/*
					 * chartID must be "orderstatus" or "ordertype"
					 */
					function drawOrderStatisticType2(isMainpage, divIdforChart,
							divIdforTable, data, itemNbrFormatter, chartID) {
						var chartname = (chartID === constants.orderstatus) ? "Order Status"
								: "Order Type";
						if (!isValidData(data)) {
							data = google.visualization.arrayToDataTable([
									[ "Time", chartname ],
									[ 'No data available', 0 ] ]);
							var chart = new google.visualization.LineChart(
									document.getElementById(divIdforChart));
							chart.draw(data, null);

						} else {
							data = new google.visualization.DataTable(data);
							for ( var columnIndex = 1; columnIndex < data
									.getNumberOfColumns(); columnIndex++) {
								itemNbrFormatter.format(data, columnIndex);
							}

							var chart = new google.visualization.ColumnChart(
									document.getElementById(divIdforChart));

							if (isMainpage) {
								chart.draw(data, {
									hAxis : {
										slantedText : true,
										slantedTextAngle : 30
									}
								});

							} else {
								var chartOpts = {
									width : 800,
									height : 400,
									title : chartname
											+ " - Date range: "
											+ $("#" + chartID + "-daterange")
													.val(),
									hAxis : {
										slantedText : true,
										slantedTextAngle : 30
									}
								};
								drawChartsForDetailsPopup(data, chart,
										chartOpts, divIdforTable);
							}
						}
					}/* End of drawOrderStatisticType2 */

					function drawOrderBasketSize(isMainpage, divIdforChart,
							divIdforTable, data, itemNbrFormatter) {
						if (!isValidData(data)) {
							data = google.visualization
									.arrayToDataTable([ [ 'Time', 'Value' ],
											[ 'No data available', 0 ] ]);
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
								colors : [ '#85578f', '#ff3333', '#49cd61', '#0072dc' ],
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

							var chart = new google.visualization.ComboChart(
									document.getElementById(divIdforChart));

							if (isMainpage) {
								chart.draw(data, options);
							} else {
								options.width = 950;
								options.height = 400;
								options.title = "Basket Size & Dollar Value - Date range: "
										+ $("#orderbasketsize-daterange").val();

								options.hAxis = {
									slantedText : true,
									slantedTextAngle : 30,
									allowContainerBoundaryTextCufoff : true
								};

								drawChartsForDetailsPopup(data, chart, options,
										divIdforTable);

							}
						}
					}// End of drawOrderBasketSize

					/*
					 * chartID: fulfillmentsystem, orderingsystem
					 */
					function drawOrderStatisticType4(isMainpage, divIdforChart,
							divIdforTable, data, itemNbrFormatter, chartID) {

						var systemname = (chartID === constants.fulfillmentsystem) ? "Fulfillment System"
								: "Ordering System";
						if (!isValidData(data)) {
							data = google.visualization.arrayToDataTable([
									[ 'Time', systemname ],
									[ 'No data available', 0 ] ]);

							var table = new google.visualization.Table(document
									.getElementById(divIdforTable));
							table.draw(data);

						} else {
							data = new google.visualization.DataTable(data);

							for ( var columnIndex = 1; columnIndex < data
									.getNumberOfColumns(); columnIndex++) {
								itemNbrFormatter.format(data, columnIndex);
							}

							var formatter = new google.visualization.PatternFormat(
									'<span class="text-primary ">{0}</span><span class="label label-danger">{1}</span> ');
							var orderColNos = [ 0 ];
							var errorColNos = [ 0 ];
							for ( var columnIndex = 1; columnIndex < data
									.getNumberOfColumns();) {
								formatter.format(data, [ columnIndex,
										columnIndex + 1 ]); // Apply
								orderColNos.push(columnIndex);
								errorColNos.push(columnIndex + 1);
								columnIndex += 2;
							}

							var tbdata = new google.visualization.DataView(data);
							tbdata.setColumns(orderColNos); // 

							var table = new google.visualization.Table(document
									.getElementById(divIdforTable));
							table.draw(tbdata, {
								allowHtml : true,
								showRowNumber : true,
								page : 'enable',
								pageSize : numberRowperPage,
								pagingButtonsConfiguration : 'auto'
							});

							if (!isMainpage) {
								var orderdata = new google.visualization.DataView(
										data);
								orderdata.setColumns(orderColNos);

								var chart = new google.visualization.ColumnChart(
										document.getElementById(divIdforChart));
								chart.draw(orderdata, {
									width : 900,
									height : 250,
									title : "Number of orders per "
											+ systemname,
									hAxis : {
										slantedText : true,
										slantedTextAngle : 30
									}
								});

								var errordata = new google.visualization.DataView(
										data);
								errordata.setColumns(errorColNos);

								var chart1 = new google.visualization.ColumnChart(
										document
												.getElementById((divIdforChart + '1')));

								chart1.draw(errordata, {
									width : 900,
									height : 250,
									title : "Number of errors/exceptions per "
											+ systemname,
									hAxis : {
										slantedText : true,
										slantedTextAngle : 30
									}
								});

								// When the table is selected, update the
								// relevant chart.
								google.visualization.events.addListener(table,
										'select', function() {
											chart.setSelection(table
													.getSelection());
											chart1.setSelection(table
													.getSelection());
										});

								// When the chart is selected, update the table
								// visualization.
								google.visualization.events.addListener(chart,
										'select', function() {
											table.setSelection(chart
													.getSelection());
										});
								google.visualization.events.addListener(chart1,
										'select', function() {
											table.setSelection(chart
													.getSelection());
										});

							}// not isMainpage
						}
					}// End of drawOrderStatisticType4
					
					function isValidData(data) {
						var rows = data["rows"];
						if(rows.length > 0) {
							return true;
						}else {
							return false;
						}
					}

					$('.icon-zoom-in.toprightHeaderIcons')
							.on(
									{
										'click' : function() {
											var obj = $(this).parents(
													".panel-heading").siblings(
													'div:last-child').children(
													'div:last-child');
											var activeId = obj.attr("id");
											if (activeId === constants.orderthroughput) {
												$('#modal-body').html(
																'<div id="divchart" class="col-sm-12 table-responsive"></div>'
																		+ '<div id="divtable" class="col-sm-12 table-responsive"></div>');
												drawDetailsofChart(constants.orderthroughput, false);
											} else if (activeId === constants.orderstatus) {
												$('#modal-body').html(
																'<div id="divchart" class="col-sm-12 table-responsive"></div>'
																		+ '<div id="divtable" class="col-sm-12 table-responsive"></div>');
												drawDetailsofChart(constants.orderstatus, false);
											} else if (activeId === constants.ordertypes) {
												$('#modal-body').html(
																'<div id="divchart" class="col-sm-12 table-responsive"></div>'
																		+ '<div id="divtable" class="col-sm-12 table-responsive"></div>');
												drawDetailsofChart(constants.ordertypes, false);
											} else if (activeId === constants.orderbasketsize) {
												$('#modal-body').html(
																'<div id="divchart" class="col-sm-12 table-responsive"></div>'
																		+ '<div id="divtable" class="col-sm-12 table-responsive"></div>');
												drawDetailsofChart(constants.orderbasketsize, false);
											} else if (activeId === constants.fulfillmentsystem) {
												$('#modal-body').html(
																'<div id="divchart" class="col-sm-12 table-responsive"></div>'
																		+ '<div id="divchart1" class="col-sm-12 table-responsive"></div>'
																		+ '<div id="divtable" class="col-sm-12 table-responsive"></div>');
												drawDetailsofChart(constants.fulfillmentsystem, false);
											} else if (activeId === constants.orderingsystem) {
												$('#modal-body').html(
																'<div id="divchart" class="col-sm-12 table-responsive"></div>'
																		+ '<div id="divchart1" class="col-sm-12 table-responsive"></div>'
																		+ '<div id="divtable" class="col-sm-12 table-responsive"></div>');
												drawDetailsofChart(constants.orderingsystem, false);
											} else {
												$('#modal-body').html(
																'<p class="text-danger">Unknown id='
																		+ obj.attr("id")
																		+ " class= "
																		+ obj.attr("class")
																		+ '</p>');
											}
											$('#myModal').modal({
												keyboard : false
											});

										}/* click */
									}); /* toprightHeaderIcons */
					$('#orderthroughput-daterange, #orderstatus-daterange, #ordertypes-daterange, #orderbasketsize-daterange, #fulfillmentsystem-daterange, #orderingsystem-daterange')
							.daterangepicker(
									{
										ranges : {
											'Today' : [ moment(), moment() ],
											'Yesterday' : [
													moment()
															.subtract('days', 1),
													moment()
															.subtract('days', 1) ],
											'Last 7 Days' : [
													moment()
															.subtract('days', 6),
													moment() ],
											'Last 30 Days' : [
													moment().subtract('days',
															29), moment() ],
											'This Month' : [
													moment().startOf('month'),
													moment().endOf('month') ],
											'Last Month' : [
													moment().subtract('month',
															1).startOf('month'),
													moment().subtract('month',
															1).endOf('month') ]
										},
										startDate : moment(),
										endDate : moment()
									},
									function(start, end) {
										refresh_reportrange($(this.element),
												start, end);
									}); /* daterangepicker */

					function refresh_reportrange(obj, startdate, enddate) {
						var activeId = obj.attr("id");
						if (activeId === "orderthroughput-daterange") {
							getData(constants.orderthroughput, startdate, enddate);
						} else if (activeId === "orderstatus-daterange") {
							getData(constants.orderstatus, startdate, enddate);
						} else if (activeId === "ordertypes-daterange") {
							getData(constants.ordertypes, startdate, enddate);
						} else if (activeId === "orderbasketsize-daterange") {
							getData(constants.orderbasketsize, startdate, enddate);
						} else if (activeId === "fulfillmentsystem-daterange") {
							getData(constants.fulfillmentsystem, startdate, enddate);
						} else if (activeId === "orderingsystem-daterange") {
							getData(constants.orderingsystem, startdate, enddate);
						}

					} /* refresh_reportrange */
					$('.coms-min, .coms-hour, .coms-day, .coms-month, .coms-quarter')
							.on(
									{
										'click' : function() {
											if (!$(this).hasClass('active')) {

												$(this).siblings().removeClass('active');
												$(this).addClass('active');

												var groupbyId = -1;

												if ($(this).hasClass('coms-min'))
													groupbyId = 1;
												else if ($(this).hasClass('coms-hour'))
													groupbyId = 2;
												else if ($(this).hasClass('coms-day'))
													groupbyId = 3;
												else if ($(this).hasClass('coms-month'))
													groupbyId = 4;
												else if ($(this).hasClass('coms-quarter'))
													groupbyId = 5;

												var id = $(this).parents('.reportSchedule')
														.siblings('div:last-child')
														.attr('id');

												if (id == constants.orderthroughput) {
													groupOrderThroughPutChart(groupbyId,id);
												} else if (id == constants.orderstatus) {
													groupOrderStatusChart(groupbyId,id);
												} else if (id == constants.ordertypes) {
													groupOrderTypesChart(groupbyId,id);
												} else if (id == constants.orderbasketsize) {
													groupOrderBasketSizesChart(groupbyId,id);
												} else if (id == constants.fulfillmentsystem) {
												} else if (id == constants.orderingsystem) {
													groupOrderingSysChart(groupbyId,id);
												}
												// 
											}/* if has active */
										}/* click */
									}); /* toprightHeaderIcons */
					function groupOrderBasketSizesChart(range,id) {
						currentBasketSizeData = JSON.parse(JSON.stringify(originalBasketSizeData));
						var keySpit = "/";
						var rows = currentBasketSizeData["rows"];
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
//									dateCOldCount["v"];
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
//									dateCOldCount["v"];
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
							rowsNew = currentBasketSizeData["rows"];
						}
						currentBasketSizeData["rows"] = rowsNew;
						drawDetailsofChart(id, true);
						
					}
					function groupOrderingSysChart(range,id) {
						currentOrderingSystemData = JSON.parse(JSON.stringify(originalOrderingSystemData));
						var keySpit = "/";
						var rows = currentOrderingSystemData["rows"];
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
						currentOrderingSystemData["rows"] = rowsNew;
						drawDetailsofChart(id, true);
					}
					function groupOrderStatusChart(range,id) {
						currentOrderStatusData = JSON.parse(JSON.stringify(originalOrderStatusData));
						var keySpit = "/";
						var rows = currentOrderStatusData["rows"];
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
						currentOrderStatusData["rows"] = rowsNew;
						drawDetailsofChart(id, true);
					}
					function groupOrderTypesChart(range,id) {
						currentOrderTypeData = JSON.parse(JSON.stringify(originalOrderTypeData));
						var keySpit = "/";
						var rows = currentOrderTypeData["rows"];
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
//									dateCOld["v"] = arrDateOld[0]+keySpit+arrDateOld[1]+keySpit+arrDateOld[2]+keySpit+arrDateOld[3];
//									var j = i+1;
//									while( j < rows.length) {
//										var elementRows = rows[j];
//										var objectC = elementRows["c"];								
//										var dateC = objectC[0];								
//										var arrDate = dateC["v"].split(keySpit);
//										if(arrDateOld[3] == arrDate[3]){
//											for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
//												var dateCOldCount = objectCOld[int2];	
//												var dateCCount = objectC[int2];	
//												dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
//											}
//											j++;
//										}else {
//											break;
//										}
//									}
//									rowsNew[indexRowsNew] = rows[i];
//									i = j;
									break;
								case 3:
//									dateCOld["v"] = arrDateOld[0]+keySpit+arrDateOld[1]+keySpit+arrDateOld[2];
//									var j = i+1;
//									while( j < rows.length) {
//										var elementRows = rows[j];
//										var objectC = elementRows["c"];								
//										var dateC = objectC[0];								
//										var arrDate = dateC["v"].split(keySpit);
//										if(arrDateOld[2] == arrDate[2]){
//											for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
//												var dateCOldCount = objectCOld[int2];	
//												var dateCCount = objectC[int2];	
//												dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
//											}
//											j++;
//										}else {
//											break;
//										}
//									}
//									rowsNew[indexRowsNew] = rows[i];
//									i = j;
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
//									var j = i+1;
//									while( j < rows.length) {
//										var elementRows = rows[j];
//										var objectC = elementRows["c"];								
//										var dateC = objectC[0];								
//										var arrDate = dateC["v"].split(keySpit);
//										
//										if(checkSixMonOfYear(arrDateOld[1]) == checkSixMonOfYear(arrDate[1])){
//											for ( var int2 = 1; int2 < objectCOld.length; int2++) { // for column dynamic
//												var dateCOldCount = objectCOld[int2];	
//												var dateCCount = objectC[int2];	
//												dateCOldCount["v"] = parseInt(dateCOldCount["v"]) + parseInt(dateCCount["v"]);
//											}
//											j++;
//										}else {
//											break;
//										}
//									}
//									dateCOld["v"] = arrDateOld[0]+((checkQuaterOfYear(arrDateOld[1]) == 1) ? " Q1,Q2" : " Q3,Q4");
//									rowsNew[indexRowsNew] = rows[i];
//									i = j;
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
						currentOrderTypeData["rows"] = rowsNew;
						drawDetailsofChart(id, true);
					}
					function groupOrderThroughPutChart(range,id) {
						currentOrderThroughputData = jQuery.extend(true, {}, originalOrderThroughputData);	
						var rows = currentOrderThroughputData["rows"];
						var rowsNew = new Array();
						if(range != 1){
							switch (range) {
								case 1:
									//min
									break;
								case 2:
									//hour
									var year,month,day=0;
									
									var currentHour = 0;
									var countHour = 0;
									var index = 0;
									for(var i=0;i<rows.length;i++){
										var elementRows = rows[i];
										var objectC = elementRows["c"];								
										var dateC = new Date(objectC[0]["v"]);
										var hour = dateC.getHours();
										
										if(i==0){
											year=dateC.getYear();
											month=dateC.getMonth();
											day=dateC.getDate();
										}
										
										if(hour != currentHour){
											if(currentHour!=0){
												addRowForOrderThroughput(rowsNew,index,new Date(year,month,day,currentHour),countHour);
												index++;
											}
											currentHour = hour;
											countHour = 0;
										}
										
										countHour += parseInt(objectC[1]["v"]);										
									}
									addRowForOrderThroughput(rowsNew,index,new Date(year,month,day,currentHour),countHour);
									currentOrderThroughputData["rows"] = rowsNew;
									break;	
								case 3:
									//day							
									break;	
								case 4:
									//1M
									var currentYear = 0;
									var currentMonth = 0;
									var countMonth = 0;
									var index = 0;
									for(var i=0;i<rows.length;i++){
										var elementRows = rows[i];
										var objectC = elementRows["c"];								
										var dateC = new Date(objectC[0]["v"]);
										var month = dateC.getMonth();
										var year = dateC.getYear();
										if(month != currentMonth || year!=currentYear){
											if(currentMonth!=0){
												addRowForOrderThroughput(rowsNew,index,new Date(currentYear,currentMonth),countMonth);
												index++;
											}
											currentMonth = month;
											currentYear = year;
											countMonth = 0;
										}
										
										countMonth += parseInt(objectC[1]["v"]);										
									}
									addRowForOrderThroughput(rowsNew,index,new Date(currentYear,currentMonth),countMonth);
									currentOrderThroughputData["rows"] = rowsNew;
									break;									
								default:
									break;
							}
						}else {
							rowsNew = rows;
						}
						
						drawDetailsofChart(id, true);
					}
					
					function addRowForOrderThroughput(rows,index,date,amount){
						var column=new Array();
						var data={"v":date};
						column[0]=data;
						data={"v":amount};
						column[1]=data;
						data={"c":column};
						rows[index] = data;
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
					function checkDataOfJson(data) {
						var rows = data["rows"];
						if(rows.length > 0) {
							return true;
						}else {
							return false;
						}
					}		

					function ajaxLoader (el, options) {
						// Becomes this.options
						var defaults = {
							bgColor 		: '#fff',
							duration		: 0,
							opacity			: 0.7,
							classOveride 	: false
						}
						this.options 	= jQuery.extend(defaults, options);
						this.container 	= $(el);
						
						this.init = function() {
							var container = this.container;
							// Delete any other loaders
							this.remove(); 
							// Create the overlay 
							var overlay = $('<div></div>').css({
									'background-color': this.options.bgColor,
									'opacity':0.7,
									'width':container.width(),
									'height':container.height(),
									'position':'absolute',
									'top':'45px'
							}).addClass('ajax_overlay');
							// add an overiding class name to set new loader style 
							if (this.options.classOveride) {
								overlay.addClass(this.options.classOveride);
							}
							// insert overlay and loader into DOM 
							container.append(
								overlay.append(
									$('<div></div>').addClass('ajax_loader')
								).fadeIn(this.options.duration)
							);
					    };
						
						this.remove = function(){
							var overlay = this.container.children(".ajax_overlay");
							if (overlay.length) {
								overlay.fadeOut(this.options.classOveride, function() {
									overlay.remove();
								});
							}	
						}

					    this.init();
					}	

				} /* FUNCTION */

		); /*-end of ready*/
