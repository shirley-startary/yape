var codigoValidaciones =localStorage.getItem("Codigo");
var telefono = localStorage.getItem("Telefono");

function cargarPagina(){
	$('.carousel.carousel-slider').carousel({fullWidth: true});
	$("#registrarse").click(redireccionar);
	$("#numberTelephone").keyup(validacion);
	$("#terminos").change(validacion);
	$("#registrarNumero").click(peticionCodigo);
	$("#inputCodigoVerif").keyup(validacionCodigo);
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
	localStorage.setItem("Telefono", $valorTelefono );
	$.post(url,{
		"phone":$valorTelefono,
		"terms":true
		},
		function(response){
			location.href="codigo.html";
			var $codigoApi=response.data.code;
			localStorage.setItem("Codigo",$codigoApi)
			// console.log($codigoApi);
			alert("Su codigo de Validación es: "+response.data.code);
		});
}

function reenviarCodigo(){
	var url = "http://localhost:3000/api/resendCode";
	$.post(url,{
		"phone":telefono
		},
		function(response){
			console.log(response);
		});
}

function validacionCodigo() {
	var codigo = $("#inputCodigoVerif").val()
	var largoCodigo = $("#inputCodigoVerif").val().length;
	if (largoCodigo == 6) {
		if (codigo != codigoValidaciones) {
			alert("Codigo Invalido!");
		} else if (codigo == codigoValidaciones) {
			location.href = "pantalla4.html";
		}
	}
};

$(document).ready(cargarPagina);
