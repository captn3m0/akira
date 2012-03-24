$(document).ready(function(){
	$.support.cors = true;
	$.ajaxPrefilter(function(options,orig){
		localStorage.setItem('session','6fe2b9f12c9c1e75477674ff0365f8698734a36b');
		var session = localStorage.getItem('session')
		if(session)
			$.extend(options.data,{"session":session});
		options.url = "http://192.168.208.247/"+options.url;
	});
});
$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
});

