var $form  = $('#formulario'),
	$titulo = $('#titulo'),
	$url = $('#link'),
	$primerPost = $('.item').first(),
	$lista = $("#contenido"),
	$aside = $('aside');

var estadoAside = $aside.css('display');
var LASTFM_API_KEY = '42f75f939105d2110d6a0daf27db431c';

if (sessionStorage.getItem('titulo')) {
	$titulo.val(sessionStorage.getItem('titulo'));
	$url.val(sessionStorage.getItem('url'));
}

var id = setInterval(function(){
	sessionStorage.setItem('titulo', $titulo.val());
	sessionStorage.setItem('url', $url.val());
}, 1000);

function mostrarOcultarFormulario(){
	$form.slideToggle();
	$lista.slideToggle();
	
	// Worst fix ever!
	// Any suggestions are welcome.
	if (estadoAside === 'block') {
		$aside.slideToggle();
	}
}

function tomarDatosSpotify(clone, track) {
	// Tomamos el nombre del album desde Spotify
	var url = 'http://ws.spotify.com/lookup/1/.json?uri=' + track;
	var artist, album;

	$.ajax({
		url: url,
		success: function(data){
			album = data.track.album.name;
			artist = data.track.artists[0].name;
			tomarPortadaLastFM(clone, album, artist);
		}
	});
}

function tomarPortadaLastFM(clone, album, artist) {
	var img;

	$.ajax({
		data: {
			artist: artist,
			album: album,
			api_key: LASTFM_API_KEY,
			format: 'json',
			method: 'album.getinfo'
		},
		url: 'http://ws.audioscrobbler.com/2.0/',
		success: function(data) {
			img = data.album.image[3]['#text'];
			clone.find('.imagen_item img').attr('src', img);
		}
	});

}

function agregarPost(e){
	e.preventDefault();
	e.stopPropagation();
	var titulo = $titulo.val(),
		url = $url.val(),
		clone = $primerPost.clone();

	if (url.indexOf('spotify:track:') == 0) {
		clone.find('.titulo_item a').text('');
		clone.prepend("<iframe src='https://embed.spotify.com/?uri=" + url + "' width='250' height='80' frameborder='0' allowtransparency='true'></iframe>");

		tomarDatosSpotify(clone, url);
	} else {
		clone.find('.titulo_item a')
			.text(titulo)
			.attr('href', url);
		
	}
	clone.hide();

	$lista.prepend(clone)
	mostrarOcultarFormulario();
	$titulo.val('');
	$url.val('');
	clone.show();
	clone.addClass('nuevo');
	setTimeout(function() {
		clone.removeClass('nuevo');
	}, 1000);

}


$('nav').on('click', function(){ console.log("Soy un nav y me hicieron click");})
$('nav ul').on('click', function(){ console.log("Soy un ul y me hicieron click");})

$('#publicar_nav a').click( mostrarOcultarFormulario );
$('#formulario').on('submit', agregarPost)