$(document).ready(function(){
	var interval;
	var i=0;
	var coordinate= new Array();


	function startLocating(){
		//getLocation();
		interval=setInterval(getLocation, 300000)}

	function getLocation(){
		console.log('geolocation called');
	 // Wait for PhoneGap to load
		//
		document.addEventListener("deviceready", onDeviceReady, false);

		// PhoneGap is ready

		function onDeviceReady() {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}

		// onSuccess Geolocation

		function onSuccess(position) {
		i++;
			var element = document.getElementById('geolocation');
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

	  }

	function stopLocating(){clearInterval(interval);}
	$.ajax({
		url: $.config.home_site_root+'tracker/stop',
		type: 'POST',
		data:JSON.stringify(coordinate),
		success:function(e){
			alert(e);
			alert("Request = success.");
		},
		error:function(){
			alert("ERR");
		}
	});

});
