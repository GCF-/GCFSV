<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
                      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<title><tiles:insertAttribute name="title" /></title>

<tiles:importAttribute name="stylesInherit" />
<c:forEach items="${stylesInherit}" var="style">
	<link href="<c:url value='${style}' />" rel="stylesheet"
		type="text/css" />
</c:forEach>
<tiles:importAttribute name="styles" />
<c:forEach items="${styles}" var="style">
	<link href="<c:url value='${style}' />" rel="stylesheet"
		type="text/css" />
</c:forEach>

<tiles:importAttribute name="favicon" />
<c:forEach items="${favicon}" var="fav">
	<link href="<c:url value='${fav}' />" rel="shortcut icon"/>
</c:forEach>
</head>

<body>
	<div id="wrap">
<%-- 		<tiles:insertAttribute name="header" /> --%>
		<div id="container">
			<tiles:insertAttribute name="body" ignore="true" />
		</div>
	</div>

</body>
<tiles:importAttribute name="scriptsInherit" />
<c:forEach items="${scriptsInherit}" var="script">
	<script type="text/javascript" src="<c:url value='${script}' />"></script>
</c:forEach>
<tiles:importAttribute name="scripts"/>
<c:forEach items="${scripts}" var="script">
	<script type="text/javascript" src="<c:url value='${script}' />"></script>
</c:forEach>
</html>