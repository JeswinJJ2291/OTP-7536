
define(
	'jjg.GrustyExt.GrustyModule'
,   [
		'jjg.GrustyExt.GrustyModule.View'
	]
,   function (
		GrustyModuleView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			// using the 'Layout' component we add a new child view inside the 'Header' existing view 
			// (there will be a DOM element with the HTML attribute data-view="Header.Logo")
			// more documentation of the Extensibility API in
			// https://system.netsuite.com/help/helpcenter/en_US/APIs/SuiteCommerce/Extensibility/Frontend/index.html
			
			/** @type {LayoutComponent} */
			var layout = container.getComponent('Layout');
			var environment_component = container.getComponent('Environment');

			let environment_footerwarningsave,environment_logo;
			if(environment_component){
				environment_footerwarningsave = environment_component.getConfig("footer");
				environment_logo = environment_component.getConfig("header").logoUrl;
				console.log(environment_logo);
			}else{
				console.error("Environment component is not available");
			}
			
			if(layout)
			{
				layout.addChildView('Footer', function() { 
					return new GrustyModuleView({ container: container });
				});
				
			}

		}
	};
});
