function cargarPagina(){
  pedirNuevoCodigo();
}
function pedirNuevoCodigo(){
  $("#mostrarNumeroTelefono").text(localStorage.getItem("Telefono"));
  setInterval(function(){
    reenviarCodigo();
  },21000);
}
$(document).ready(cargarPagina);
