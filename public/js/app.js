$(document).ready(function(){
0
	cargarPagina()
	$('.carousel.carousel-slider').carousel({fullWidth: true});
});

function cargarPagina(){
	$("#registrarse").on("click",redireccionar);
}



function redireccionar(){
	location.href= "views/registro.html";
	// console.log("hola");
}
