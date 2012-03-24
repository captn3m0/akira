$(document).ready(function(){
	$.config = {
		home_site_root :"http://192.168.208.247/"
	};
	$.support.cors = true;
});
$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
});
