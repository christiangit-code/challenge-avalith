 // Write on keyup event of keyword input element
$(document).ready(function()
{
	$("#campoBusqueda").keyup(function()
 	{
 		me = this;
 		// Show only matching TR, hide rest of them
 		$.each($("#mytable tbody tr"), function() 
 		{
 			if($(this).text().toLowerCase().indexOf($(me).val().toLowerCase()) === -1)
 				$(this).hide();
 			else
 				$(this).show();
 		});
	});

	// $("#nombreContacto").blur(function(){
 //    		$(this).css("background-color", "#FFFFCC");
	// });

	/*$("#apellidoContacto").blur(function(){
    		$(this).css("background-color", "#FFFFCC");
	});*/

	// $("#mailContacto").blur(function(){
 //    		$(this).css("background-color", "#FFFFCC");
	// });

	// $("#fechaNacContacto").blur(function(){
 //    		$(this).css("background-color", "#FFFFCC");
	// });

	// $("#idPaisContacto").blur(function(){
 //    		$(this).css("background-color", "#FFFFCC");
	// });

	// $("#tlfContacto").blur(function(){
 //    		$(this).css("background-color", "#FFFFCC");
	// });

	/*$(function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#paisContacto" ).autocomplete({
      source: availableTags
    });
  } );*/

});

function validarCampoBlur(id)
{
	// var idObjForm = Array('nombreContacto', 'apellidoContacto', 'mailContacto', 'fechaNacContacto', 'idPaisContacto', 'tlfContacto');

	var elem = document.getElementById(id);
	
	if(id == 'nombreContacto' || id == 'apellidoContacto' || id== "fechaNacContacto")
	{
		var valor = elem.value;

		if(valor == null || valor.length == 0 || /^\s+$/.test(valor))
		{
			asignarValido(elem, false);

		} else {

			asignarValido(elem, true);
		}

	} else if(id == 'mailContacto')
	{
		var valor = elem.value;

		if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test(valor))) 
		{
			asignarValido(elem, false);

		} else {

			asignarValido(elem, true);
		}

	} else if(id == 'idPaisContacto')
	{
		var valor = elem.value;

		if(valor == null || valor.length == 0 || /^\s+$/.test(valor))
		{
			asignarValido(elem, false);

		} else {

			asignarValido(elem, true);
		}

	} else if(id == 'tlfContacto')
	{
		var valor = elem.value;

		if(valor == null || valor.length == 0 || /^\s+$/.test(valor))
		{
			asignarValido(elem, false);

		} else {

			asignarValido(elem, true);
		}
	}

}

function asignarValido(obj, valor)
{
	if(valor == true)
	{
		obj.style.backgroundColor = "";

	} else {

		obj.style.backgroundColor = "#FFFFCC";
		toastr.warning("*Campo Obligatorio ("+obj.placeholder+")");
	}
}

