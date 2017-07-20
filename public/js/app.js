
function cargarPagina(){
	$('.carousel.carousel-slider').carousel({fullWidth: true});
	$("#registrarse").click(redireccionar);
	$("#numberTelephone").keyup(validacion);
	$("#terminos").change(validacion);
	$("#registrarNumero").click(peticionCodigo);
}

function redireccionar(){
	location.href= "views/registro.html";
	// console.log("hola");
}


function validacion(){
	// console.log($(this).val().length);
	var $valorTelefono = $("#numberTelephone").val();
	var $longitudTelefono = $valorTelefono.length;
	var $valorCheck = $("#terminos").is(":checked");

	if (/^([0-9])*$/.test($valorTelefono) && $longitudTelefono == 10 && $valorCheck == true) {
		$("#registrarNumero").removeClass("disabled");
		// peticionCodigo(url,$valorTelefono,$valorCheck);
	}else {
		$("#registrarNumero").addClass("disabled");
	}
}

function peticionCodigo(e){
	e.preventDefault();
	var url = "http://localhost:3000/api/registerNumber";
	var $valorTelefono = $("#numberTelephone").val();
	$.post(url,{
		"phone":$valorTelefono,
		"terms":true
	},
	function(response){
		location.href="codigo.html";
		alert("Su codigo de Validación es: "+response.data.code);
	})
}

$(document).ready(cargarPagina);
