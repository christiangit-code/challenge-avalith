var variableGestionGlobal = {

	idRegistroActivo: null,
	idSigRegistro: 0,

 	setIdRegistroActivo: function(idRegistro) 
 	{
    	this.idRegistroActivo = idRegistro;
  	},

  	getIdRegistroActivo: function() 
 	{
    	return this.idRegistroActivo;
  	},

	getIdSigRegistro: function() 
 	{
    	return this.idSigRegistro;
  	},

  	setIdSigtRegistro: function(valor) 
 	{
    	if(typeof(valor) != 'undefined')
		{
			this.idSigRegistro = parseInt(valor);

		} else {

			this.idSigRegistro ++;
		}
  	},
};

function Contacto(id, name, username, email, phone, website, zipcode, fechaNacContacto, idPaisContacto)
{

	this.id = id;
	this.name = name
	this.username = username
	this.email = email;
	this.fechaNacContacto = fechaNacContacto;
	this.idPaisContacto = idPaisContacto;
	this.phone = phone;
	this.website = website;
	this.address = {

		zipcode: zipcode,
	}
};


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
});

function validarFormulario()
{
	var idObjForm = Array('nombreContacto', 'usuarioContacto', 'mailContacto', 'fechaNacContacto', 'idPaisContacto', 'tlfContacto');
	var retorno = null;
	var idError = null;
	var cuerpoTablaBusqueda = document.getElementById('cuerpoTablaContacto');
	var usuarioEncontrado = false;
	var resp = null;

	var promesaValidar = new Promise(function(resolve, reject) { 

		for (var i = 0; i < idObjForm.length; i++)
		{
			if(idObjForm[i] == 'usuarioContacto')
			{

				var elem = document.getElementById(idObjForm[i]);


				$("#mytable tbody tr").find('td:eq(1)').each(function () {
				 
					//obtenemos el valor de la celda
				 	valorCelda = $(this).text();
				 	console.log(valorCelda, elem.value)
				 	if(elem.value.toLowerCase() == valorCelda.toLowerCase())
				 	{
				 		usuarioEncontrado = true;
				 		
				 	}
				});
			}

			resp = validarCampoBlur(idObjForm[i], 'general');
			if(resp == false)
			{
				idError = idObjForm[i];
				break;
			}
		}

		if(usuarioEncontrado == true)
		{
			reject('usuarioEncontrado');
		}

		if(resp == true)
		{
			resolve(resp);

		} else if(resp == false) {

			reject(resp);

		}

	});

	promesaValidar.then(function(value) {

		var datosRegistrar = Array();

		for (var i = 0; i < idObjForm.length; i++)
		{

			datosRegistrar[i] = document.getElementById(idObjForm[i]).value;
		}

		objRegistro = new Contacto(variableGestionGlobal.getIdSigRegistro(),datosRegistrar[0], datosRegistrar[1], 
			datosRegistrar[2], datosRegistrar[5], 'www.ejemplo.com', '6101', datosRegistrar[3], datosRegistrar[4]);

		addContacto(objRegistro, cuerpoTablaBusqueda);
		variableGestionGlobal.setIdSigtRegistro();

		toastr.success('Contacto Agregado');
		document.getElementById('formContacto').reset();

	}).catch(function(value) {


		if(value == false)
		{
	 		toastr.error('Debe llenar el campo '+document.getElementById(idError).placeholder);

	 	} else {

	 		toastr.error('Nombre de Usuario ya registrado');
	 	}
	});

}

function validarCampoBlur(id, llamado)
{
	
	var retorno = false;
	var elem = document.getElementById(id);

	if(typeof(llamado) == 'undefined')
	{
		var llamado = null;

	} 
	
	if(id == 'nombreContacto' || id == 'usuarioContacto' || id == "fechaNacContacto")
	{
		var valor = elem.value;

		if(valor == null || valor.length == 0 || /^\s+$/.test(valor))
		{
			retorno = asignarValido(elem, false, llamado);

		} else {

			retorno = asignarValido(elem, true, llamado);
		}

	} else if(id == 'mailContacto')
	{
		var valor = elem.value;

		if(!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test(valor))) 
		{
			retorno = asignarValido(elem, false, llamado);

		} else {

			retorno = asignarValido(elem, true, llamado);
		}

	} else if(id == 'idPaisContacto')
	{
		var valor = elem.value;

		if(valor == null || valor.length == 0 || /^\s+$/.test(valor))
		{
			retorno = asignarValido(elem, false, llamado);

		} else {

			retorno = asignarValido(elem, true, llamado);
		}

	} else if(id == 'tlfContacto')
	{
		var valor = elem.value;

		if(valor == null || valor.length == 0 || /^\s+$/.test(valor))
		{
			asignarValido(elem, false, llamado);

		} else {

			retorno = asignarValido(elem, true, llamado);
		}
	}

	return retorno;

}

function asignarValido(obj, valor, llamado)
{
	var retorno = false;

	if(valor == true)
	{
		if(llamado != null)
		{
			retorno = true;

		} else {

			obj.style.backgroundColor = "";
		}

	} else {

		if(llamado != null)
		{
			retorno = false;
			
		} else {

			obj.style.backgroundColor = "#FFFFCC";
			toastr.warning("*Campo Obligatorio ("+obj.placeholder+")");
		}
	
	}

	return retorno;
}

function armarTabla()
{
	
	var cuerpoTablaBusqueda = document.getElementById('cuerpoTablaContacto');

	var registros = JSON.parse(this.responseText);

	variableGestionGlobal.setIdSigtRegistro(registros.length+1);

	for (var i = 0; i < registros.length; i++)
    {

    	addContacto(registros[i], cuerpoTablaBusqueda);
		
    }
}

function addContacto(objRegistro, cuerpoTablaBusqueda)
{
	fila = crearObjeto('tr',{'id':'contacto'+objRegistro.id}, null, null);

	columnaNombre = crearObjeto('td', {}, objRegistro.name, fila);
	columnaUsuario = crearObjeto('td', {}, objRegistro.username, fila);
	columnaMail = crearObjeto('td', {}, objRegistro.email, fila);
	columnaSitioWeb = crearObjeto('td', {}, objRegistro.website, fila);
	columnaCodigoPostal = crearObjeto('td', {}, objRegistro.address.zipcode, fila);
	columnaTlf = crearObjeto('td', {}, objRegistro.phone,fila);

	columnaEliminar = crearObjeto('button', {'id': 'botonEliminar'+objRegistro.id, 'onClick': 'asignarRegistroEliminar(\'contacto'+objRegistro.id+'\')', 'type': 'button', 'class': 'btn btn-outline-dark', 'data-toggle':"modal", 'data-target': "#exampleModal"}, 'Eliminar', fila);
	
	asociaHijo(fila, cuerpoTablaBusqueda);
}

function consultarConatcto()
{
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", armarTabla);
	oReq.open("GET", "https://jsonplaceholder.typicode.com/users");
	oReq.send();

}

function armarComboPais()
{
	
	var dataList = document.getElementById('paisContacto');

	var registros = JSON.parse(this.responseText);

	for (var i = 0; i < registros.length; i++)
    {
    	crearObjeto('option',{'id':'pais'+registros[i].numericCode, 'value': registros[i].name}, null, dataList);
    }
}

function consultarPais()
{
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", armarComboPais);
	oReq.open("GET", "https://restcountries.eu/rest/v2/all");
	oReq.send();

}

function asignarRegistroEliminar(idFila)
{

	variableGestionGlobal.setIdRegistroActivo(idFila);
}

function verificaRegistroAEliminar()
{
	if(variableGestionGlobal.getIdRegistroActivo() != null)
	{
		
		eliminaHijo(document.getElementById(variableGestionGlobal.getIdRegistroActivo()));
		
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