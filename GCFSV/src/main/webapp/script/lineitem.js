	$(document).ready(
			function() {
				$("#orddtl_comments")
						.click(function(e) {
							$("#func_div").show();

						});
				$("#orddtl_itemtracking, #orddtl_history")
				.click(function(e) {
					$("#func_div").hide();

				});				
			});