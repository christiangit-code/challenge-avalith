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