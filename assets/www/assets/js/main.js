$('#start_button').click(function(){
	console.log('button clicked');
	$(this).fadeOut();$('#stop_button').fadeIn();
	});

$('#peopleli').click( function() {
	$.getJSON('users', function(data) {
		console.log ("done");
		html='';
		for (i in data)
		{
			html+='<li><div class="name">'+data[i].name+'</div><div class="number">'+data[i].number+'</div><div class="car">'+data[i].car+'</div><div class="distance">'+data[i].distance+' miles</div><div class="image"><img src='+data[i].pic+'></div></li>';
		}
		$('#gallery').html(html);
	});
});

$('#hofli').click( function() {

	$.getJSON('users', function(data) {

		console.log('done');
		html='';
		rank=1;
		for (i in data)
		{
			html+='<li><div class="rank">'+rank+'</div><div class="name">'+data[i].name+'</div><div class="number">'+data[i].number+'</div><div class="car">'+data[i].car+'</div><div class="distance">'+data[i].distance+' miles</div><div class="image"><img src='+data[i].pic+'></div></li>';
		}
		$('#hof').html(html);
	});
});

$('#submit').click(function(e){
	$.post('/login',{email:$('#email').val(),password:$('#password').val()},function(session){
		if(session.length==41)
			localStorage.setItem('session',session);
		else
			alert("Wrong password");
		document.location.reload();
	});
	e.preventDefault();
});
