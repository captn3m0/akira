$('#start_button').click(function(){
	console.log('button clicked');
	$(this).fadeOut();$('#stop_button').fadeIn();
	});
	
$('#peopleli').click( function() {
	$.getJSON('http://192.168.208.247/users', function(data) {
		console.log ("done");
		htmlcode='';
		for (i in data)
		{
			htmlcode+=('<li><div class="name">'+data[i].name+'</div><div class="number">'+data[i].mobile+'</div><div class="car">'+data[i].car+'</div><div class="distance">'+data[i].distance+' miles</div><div class="image"><img src='+data[i].pic+'></div></li>');
		}
		$('#gallery').html(htmlcode);
	});
});

$('#hofli').click( function() {
	
	$.getJSON('http://192.168.208.247/users', function(data) {
		
		console.log('done');
		htmlcode='';
		rank=1;
		for (i in data)
		{
			htmlcode+='<li><div class="rank">'+rank+'</div><div class="name">'+data[i].name+'</div><div class="number">'+data[i].mobile+'</div><div class="car">'+data[i].car+'</div><div class="distance">'+data[i].distance+' miles</div><div class="image"><img src='+data[i].pic+'></div></li>';
			rank++;
		}
		$('#hof').html(htmlcode);		
	});
});



