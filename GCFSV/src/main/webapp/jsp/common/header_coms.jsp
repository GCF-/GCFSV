<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="navbar navbar-static-top navbar-default">
			<div class="navbar-header">
				<a class="navbar-brand" href="#"><i class="icon-home"></i> GCF</a>
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target=".navbar-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
			</div>
			<div class="navbar-collapse collapse">
				<ul class="nav navbar-nav">

					<li class="active"><a data-toggle="dropdown"
						class="dropdown-toggle js-activated" href="javascript:;"> <i
							class="icon-desktop"></i> Monitoring <b class="caret"></b>
					</a>

						<ul class="dropdown-menu">
							<li><a href="/GCF/api/monitor/orderStatistics">&nbsp;Order statistics</a></li>
							<li><a href="/GCF/api/monitor/individualOrdStat">&nbsp;Individual order statistics</a></li>
							<li><a href="#">&nbsp;Order Search</a></li>
						</ul></li>

					<li class="dropdown"><a data-toggle="dropdown"
						class="dropdown-toggle js-activated" href="/GCF/api/alert/alerting" onclick="javascript:location.href='/GCF/api/alert/alerting'"><i
							class="icon-warning-sign"></i> Alerting </a></li>

					<li class="dropdown"><a data-toggle="dropdown"
						class="dropdown-toggle js-activated" href="javascript:;"><i
							class="icon-globe"></i> Customer Support <b class="caret"></b> </a>

						<ul class="dropdown-menu">
							<li><a href="#">Customer Search</a></li>
							<li><a href="#">Customer Information</a></li>
							<li><a href="#">Review Order</a></li>

						</ul></li>
					<li class="dropdown"><a data-toggle="dropdown"
						class="dropdown-toggle js-activated" href="javascript:;"><i
							class="icon-certificate"></i> GCF Administrative UI <b
							class="caret"></b> </a>

						<ul class="dropdown-menu">
							<li><a href="/GCF/api/admin/codeTables">Enterprise Event Model</a></li>
							<li><a href="#">GCF Logs</a></li>
							<li><a href="#">Order Replay</a></li>
							<li class="dropdown-submenu"><a href="#">More options</a>
								<ul class="dropdown-menu">
									<li><a href="#">Second level</a></li>
									<li class="dropdown-submenu"><a href="avascript:;">More..</a>
										<ul class="dropdown-menu">
											<li><a href="#">Third level</a></li>
											<li><a href="#">Third level</a></li>
										</ul></li>
								</ul></li>
						</ul></li>

				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown"><a href="javscript:;"
						class="dropdown-toggle js-activated" data-toggle="dropdown"><i
							class="icon-cogs"></i> Settings <b class="caret"></b></a>

						<ul class="dropdown-menu">
							<li><a href="javascript:;"><i class="icon-cog"></i>
									Account Settings</a></li>
							<li><a href="javascript:;"><i class="icon-lock"></i>
									Privacy Settings</a></li>
							<li class="divider"></li>
							<li><a href="javascript:;"><i class="icon-question-sign"></i>
									Help</a></li>
						</ul></li>

					<li class="dropdown"><a href="javscript:;"
						class="dropdown-toggle js-activated" data-toggle="dropdown"><i
							class="icon-user-md"></i>
							<security:authentication property="principal.displayName" />
							<b class="caret"></b></a>

						<ul class="dropdown-menu">
							<li><a href="javascript:;"><i class="icon-user"></i> My
									Profile</a></li>
							<li><a href="javascript:;"><i class="icon-group"></i> My
									Groups</a></li>
							<li class="divider"></li>
							<li><a href="<c:url value='/j_spring_security_logout' />"><i class="icon-off"></i>
									Logout</a></li>
						</ul></li>
				</ul>
			</div>
			<!--/.nav-collapse -->

			<div class="collapse navbar-collapse pull-right"></div>
			<!-- /.nav-collapse -->

		</div>
		<!-- /.navbar -->