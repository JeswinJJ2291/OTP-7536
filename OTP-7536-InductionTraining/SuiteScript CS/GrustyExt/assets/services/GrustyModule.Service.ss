
function service(request, response)
{
	'use strict';
	try 
	{
		require('jjg.GrustyExt.GrustyModule.ServiceController').handle(request, response);
	} 
	catch(ex)
	{
		console.log('jjg.GrustyExt.GrustyModule.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}