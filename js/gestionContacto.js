var idRegistroActivo = null; 


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
	
	if(id == 'nombreContacto' || id == 'usuarioContacto' || id== "fechaNacContacto")
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

function armarTabla()
{
	
	var cuerpoTablaBusqueda = document.getElementById('cuerpoTablaContacto');

	var registros = JSON.parse(this.responseText);

	for (var i = 0; i < registros.length; i++)
    {
    	fila = crearObjeto('tr',{'id':'contacto'+registros[i].id,},null,null);

		columnaNombre = crearObjeto('td',{},registros[i].name,fila);
		columnaUsuario = crearObjeto('td',{},registros[i].username,fila);

		columnaMail = crearObjeto('td',{},registros[i].email,fila);
		columnaSitioWeb = crearObjeto('td',{},registros[i].website,fila);
		columnaCodigoPostal = crearObjeto('td',{},registros[i].address.zipcode,fila);
		columnaTlf = crearObjeto('td',{},registros[i].phone,fila);

		columnaEliminar = crearObjeto('button', {'id': 'botonEliminar'+registros[i].id, 'onClick': 'asignarRegistroEliminar(\'contacto'+registros[i].id+'\')', 'type': 'button', 'class': 'btn btn-outline-dark', 'data-toggle':"modal", 'data-target': "#exampleModal"}, 'Eliminar', fila);
		
		asociaHijo(fila, cuerpoTablaBusqueda);
		
    }
}

function consultarConatcto()
{
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", armarTabla);
	oReq.open("GET", "https://jsonplaceholder.typicode.com/users");
	oReq.send();

}
/*
function eliminarContacto(idFila)
{
	eliminaHijo(document.getElementById(idFila));
}*/

function asignarRegistroEliminar(idFila)
{
	idRegistroActivo = idFila;
}

function verificaRegistroAEliminar()
{
	if(idRegistroActivo != null)
	{
		eliminaHijo(document.getElementById(idRegistroActivo));
	}
}
//-------------------
function crearObjeto(tipo,propiedades,texto,nodoPadre)
{
	var objHtml = xCreateElement(tipo);
	
	for (pr in propiedades)
	{
		objHtml.setAttribute(pr, propiedades[pr]);
		
	}
	
	if(texto != null)
	{
		
		var objTexto = document.createTextNode(texto);
        xAppendChild(objHtml,objTexto);
	}
	
	if(nodoPadre != null)
	{
		xAppendChild(nodoPadre,objHtml);
		//return;
		
	} else {
		
		return objHtml;
	}

}

function asociaHijo(obj,nodoPadre)
{
	xAppendChild(nodoPadre,obj);
	
}

function eliminaHijo(objHtml)
{
	while(objHtml.firstChild)
	{
	
		objHtml.removeChild(objHtml.firstChild);
	}
	
}

function insertarTexto(objHtml,texto)
{
	var objTtexto = document.createTextNode(texto);
	xAppendChild(objHtml,objTtexto);

	
}

/*function agregarAtributo(objHtml,propiedades)
{
	 if (!xDef(objHtml) || !xDef(propiedades) || (typeof propiedades != 'object')) return;

        for (pr in propiedades)
        {
			objHtml.setAttribute(pr, propiedades[pr]);
            
        }
}*/

/*function eliminarNodo(id)
{
	var nodoEliminar = xGetElementById(id);
	
	if(nodoEliminar != null)
	{
		nodoEliminar.parentNode.removeChild(nodoEliminar);
	}
}
*/
function xCreateElement(sTag)
{
  if (document.createElement) return document.createElement(sTag);
  else return null;
}

function xAppendChild(oParent, oChild)
{
  if (oParent.appendChild) return oParent.appendChild(oChild);
  else return null;
}