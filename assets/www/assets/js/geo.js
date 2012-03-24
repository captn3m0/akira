$(document).ready(function(){
	var interval;
	var i=0;
	var coordinate= new Array();
	x="";
	y="";

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
			x=coordinate.length();
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
	
		var y=coordinate.length;
	  }

	if (x!=y){
	
	checkConnection = function (){
        var networkState = navigator.network.connection.type;

    /*    var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';*/
		if(networkState=="Connection.NONE"){
			var coord = LawnChair(function(){
				this.batch(coordinate,function(){console.log('coordinates stored');} //work on it
				)});
			}
		else ajaxPost();}
	}
	
	
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
	
});
	




  
  