$(function(){
	var geo = navigator.geolocation;
	var opciones = {}

	function geo_error() {
		console.log("No se donde estas carajoooo");
	}

	function geo_exito(posicion) {
		var lat  = posicion.coords.latitude;
		var lon  = posicion.coords.longitude;
		var mapa = new Image();
		mapa.src = "http://maps.googleapis.com/maps/api/staticmap?maptype=hybrid&zoom=15&size=280x200&sensor=false&center="+lat+","+lon + "&markers=color:blue%7Clabel:C%7C" + lat + "," + lon + "&scale=1" + "&style=element" ;

		$('#geo').append(mapa);
		$("#geo img").addClass('mapita');
		$(".mapita").css('width', "100%");

		obtenerGeoInformacion(lat, lon);
	}

	geo.getCurrentPosition(geo_exito, geo_error, opciones);
});