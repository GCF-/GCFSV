/**
 * Commons
 * @author Duyen.le
 */
var Common = (function() {
	
	var Common = function() {
		/**
		 * get application name.
		 * @author Duyen.le
		 */
		this.getAppName = function (p) {
			var s = p.split("/").reverse();
			s.splice(0, 1);
			return s.reverse().join("/");
		};
		
		this.getProjectName = function(p) {
			var s = p.split("/").reverse();
			s.splice(0, 2);
			return s.reverse().join("/");
		};
		/**
		 * support format search range number in text box.
		 * @author Duyen.le
		 */
		this.searchNumber = function(number) {
			var rs = /^(=|<(=)?|>(=)?)?\s*[0-9]+(\.[0-9]*)*$/;  // so binh thuong
//		    var rs = /^(<(=)?|>(=)?)?\s*[0-9]+[\.[0-9]*]*$/; // so thap phan.		
		    return number.match(rs);
		   
//		    return rs.test(number);
		};
		/**
		 * validate format Email.
		 * @author Duyen.le
		 */
		this.validateEmail = function (val) {
			var email = val;
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(email.length > 0){
				return filter.test(email);
			}
		};
		this.validateNumber = function(e) {
			var key;
			var keychar;
			var isShift = false;
			var isCtrl = false;
			if (window.event){
				key = window.event.keyCode;
			}		
			else if (e){
				key = e.which;
			}		
			else{
				return true;
			}	
			keychar = String.fromCharCode(key);
			if (e.ctrlKey){
				isCtrl = true;
			}		
			if (key == 16) {
				isShift = true;
			}		
			/* control keys */
			if ((key === null) || (key === 0) || (key === 8) || (key === 9) || (key === 13)|| (key === 27)){
				return true;
			}		
			/* numbers */
			else if ((("0123456789").indexOf(keychar) > -1) && !isShift){
				return true;
			}
			else if (key>=96 && key<=105) {
				return true;
			}		
			else if ((key == 99) && isCtrl){
				return true;
			}		
			else if ((key == 118) && isCtrl){
				return true;
			}		
			else if ((key == 88) && isCtrl){
				return true;
			}
			else if (key == 46){
				return true;
			}		
			else{
				return false;
			}
		};
		
		this.formatDateRange = function (str) {
			
			var filter = /^\d{2}\/\d{2}\/\d{4}?[\s][-][\s]\d{2}\/\d{2}\/\d{4}$/;
			if(str.length > 0){
				return filter.test(str);
			}
		};
		/**
		 * remove Characters in text box.
		 * @author Duyen.le
		 */
		this.htmlSpecialChar = function (str) {
			return String(str).replace(/[#~!@$*()+_:"}{,/'[&^`;?%&\\-]|[]]|[a-zA-Z]/g, '');
		};
		
		/**
		 * Create NameSpace.
		 * @author anhtran.
		 */
		this.createNameSpace = function(namespaceString) {
		    var parts = namespaceString.split('.'),
		    parent = window,
		    currentPart = '';
		 
		    for (var i = 0, length = parts.length; i < length; i++) {
		        currentPart = parts[i];
		        parent[currentPart] = parent[currentPart] || {};
		        parent = parent[currentPart];
		    }
		 
		    return parent;
		};

	};
	
	return Common;
})();
