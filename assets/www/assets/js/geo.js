$(document).ready(function(){
	var interval;
	var i=0;
	var coordinate= new Array();


	function startLocating(){
		getLocation();
		interval=setInterval(getLocation, 300000)}

	function getLocation(){
		console.log('geolocation called');
	 // Wait for PhoneGap to load
		//
		document.addEventListener("deviceready", onDeviceReady, false);

		// PhoneGap is ready

		function onDeviceReady() {
			var x=coordinate.length();
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}

		// onSuccess Geolocation

		function onSuccess(position) {
		i++;
			//var element = document.getElementById('geolocation');
			// element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
								// 'Longitude: '          + position.coords.longitude             + '<br />' +
								// 'Altitude: '           + position.coords.altitude              + '<br />' +
								// 'Accuracy: '           + position.coords.accuracy              + '<br />' +
								// 'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
								// 'Heading: '            + position.coords.heading               + '<br />' +
								// 'Speed: '              + position.coords.speed                 + '<br />' +
								// 'Timestamp: '          + new Date(position.timestamp)          + '<br />';


			coordinate[i]=position.coords;
		}
		// onError Callback receives a PositionError object
		//
		function onError(error) {
			alert('code: '    + error.code    + '\n' +
				  'message: ' + error.message + '\n');
		}
	
		var y=coordinate.length();
	  }

	if (x!=y){ajaxPost;}
	
	function ajaxPost(){
		console.log('ajax request sent');
		$.ajax({
		url: $.config.home_site_root+'',
		type: 'POST',
		data:JSON.stringify(coordinate),
		success:function(){
			alert("Request = success.");
		},
		error:function(){
			alert("ERR");
		}
	});
	}
	
	function distTravel(){};

	function stopLocating(){clearInterval(interval);}
}