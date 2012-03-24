	var interval;
	var i=0;
	var coordinate= new Array();
	x="";
	y="";

	function startLocating(){
		initialize();
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
				this.batch(coordinate,function(){console.log('coordinates stored');} //work on it ====>important
				)});
			}
		else {ajaxPost();
		calculateDistances()}}
	}

	function ajaxPost(){
		console.log('ajax request sent');
		$.ajax({
		url: 'journey/ping',
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

	
	$.ajax({
	//url:'/journey/list/?session=6fe2b9f12c9c1e75477674ff0365f8698734a36b',
	url:'/journey/list/',
	type:'POST',
	success:function(data){console.log(data);}
	});
	
	

});


      var map;
      var geocoder;
      var bounds = new google.maps.LatLngBounds();
      var markersArray = [];

      
      var origin = new google.maps.LatLng(o1, o2);
      var destination = new google.maps.LatLng(d1, d2);


      var destinationIcon = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000";
      var originIcon = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000";

      function initialize() {
        var opts = {
          center: new google.maps.LatLng(29.964354, 78.173543),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map'), opts);
        geocoder = new google.maps.Geocoder();
      }

      function calculateDistances() {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          }, callback);
      }

      function callback(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          alert('Error was: ' + status);
        } else {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          var outputDiv = document.getElementById('outputDiv');
          outputDiv.innerHTML = '';
          deleteOverlays();

          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            addMarker(origins[i], false);
            for (var j = 0; j < results.length; j++) {
              addMarker(destinations[j], true);
              outputDiv.innerHTML += origins[i] + " to " + destinations[j]
                  + ": " + results[j].distance.text + " in "
                  + results[j].duration.text + "<br />";
            }
          }
        }
      }

      function addMarker(location, isDestination) {
        var icon;
        if (isDestination) {
          icon = destinationIcon;
        } else {
          icon = originIcon;
        }
        geocoder.geocode({'address': location}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            bounds.extend(results[0].geometry.location);
            map.fitBounds(bounds);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: icon
            });
            markersArray.push(marker);
          } else {
            alert("Geocode was not successful for the following reason: "
              + status);
          }
        });
      }

      function deleteOverlays() {
        if (markersArray) {
          for (i in markersArray) {
            markersArray[i].setMap(null);
          }
          markersArray.length = 0;
        }
      }