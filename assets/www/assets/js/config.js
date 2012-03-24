$(document).ready(function(){
	var session = localStorage.getItem('session');
	if(session){
		$('#toggle').show();
		$('#login').hide();
	}

	$.support.cors = true;

	$.ajaxPrefilter(function(options,orig){

		if(session){
			console.log(orig);
			options.data = $.extend(orig.data, { session: session }),
			console.log(options);
		}
		options.url = "http://10.42.0.1/"+options.url;
	});
});
$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.mobile.allowCrossDomainPages = true;
});

