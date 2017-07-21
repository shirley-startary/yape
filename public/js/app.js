var codigoValidaciones =localStorage.getItem("Codigo");
var telefono = localStorage.getItem("Telefono");

var usuario = localStorage.getItem("Usuario");
var email = localStorage.getItem("Email");
var contrasena = localStorage.getItem("Password");

function cargarPagina(){
	$('.carousel.carousel-slider').carousel({fullWidth: true});
	$('select').material_select();
	$("#registrarse").click(redireccionar);
	$("#numberTelephone").keyup(validacion);
	$("#terminos").change(validacion);
	$("#registrarNumero").click(peticionCodigo);
	$("#inputCodigoVerif").keyup(validacionCodigo);
	$("#nombreUsuario").keyup(validarDatosUsuario);
	$("#email").keyup(validarDatosUsuario);
	$("#password").keyup(validarDatosUsuario);
	$("#btnCrearUsuario").click(crearUsuario);
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

	if (/^([0-9])*$/.test($valorTelefono) && 0 && $valorCheck == true) {
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
			localStorage.setItem("Codigo",response.data)
			// console.log(response);
			alert(response.data)
		});
}

function validacionCodigo() {
	var codigo = $("#inputCodigoVerif").val()
	var largoCodigo = $("#inputCodigoVerif").val().length;
	var largoCodigoAuto = codigoValidaciones.length;
	if (largoCodigo == largoCodigoAuto) {
		if (codigo != codigoValidaciones) {
			alert("Codigo Invalido!");
		} else if (codigo == codigoValidaciones) {
			location.href = "crear-usuario.html";
		}
	}
};

function validarDatosUsuario(){
	var $nombreUsuario = $("#nombreUsuario").val().trim();
	var $emailUsuario = $("#email").val().trim();
	var $contrasenaUsuario = $("#password").val().trim();

	if($nombreUsuario!== "" && $emailUsuario!== "" && $contrasenaUsuario.length >=6){
			$("#btnCrearUsuario").removeClass("disabled");

			localStorage.setItem("Usuario", $nombreUsuario);
			localStorage.setItem("Email", $emailUsuario);
			localStorage.setItem("Password", $contrasenaUsuario);
		}else{
		$("#btnCrearUsuario").addClass("disabled");
	}
}

function crearUsuario(e){
	e.preventDefault();
	var url = "http://localhost:3000/api/createUser"
	console.log(telefono);
	console.log(usuario);
	console.log(email);
	console.log(contrasena);
	$.post(url,
		{
			"phone":telefono,
      "name":usuario,
      "email":email,
      "password":contrasena
		},
		function(response){
			console.log(response);
			location.href = "pantalla5.html"
		});
}

$(document).ready(cargarPagina);
