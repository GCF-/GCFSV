<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="container">
	<c:url value="" var="security_check_action" />
	
	<form class="form-signin" role="form" action="${security_check_action}"
		method="post">
		<c:if test="${error}">
		<font color="red"></font>
		<div class="alert alert-danger text-center">Wrong username or password!</div>
		</c:if>
		<h2 class="form-signin-heading">Please sign in</h2>
		User name : <input type="text" name="username" class="form-control"
			placeholder="Username" /> Password: <input
			type="password" name="password" class="form-control"
			placeholder="Password" />
		<button class="btn btn-lg btn-primary btn-block" type="submit">Sign
			in</button>
	</form>
</div>
