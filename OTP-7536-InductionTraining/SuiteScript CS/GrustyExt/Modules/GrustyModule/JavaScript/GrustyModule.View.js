// @module jjg.GrustyExt.GrustyModule
define('jjg.GrustyExt.GrustyModule.View'
,	[
	'jjg_grustyext_grustymodule.tpl'
	
	,	'jjg.GrustyExt.GrustyModule.SS2Model'
	
	,	'Backbone'
    ]
, function (
	jjg_grustyext_grustymodule_tpl
	
	,	GrustyModuleSS2Model
	
	,	Backbone
)
{
    'use strict';

	// @class jjg.GrustyExt.GrustyModule.View @extends Backbone.View
	return Backbone.View.extend({

		template: jjg_grustyext_grustymodule_tpl

	,	initialize: function (options) {

			/*  Uncomment to test backend communication with an example service
				(you'll need to deploy and activate the extension first)
			*/

			// this.model = new GrustyModuleModel();
			// var self = this;
         	// this.model.fetch().done(function(result) {
			// 	self.message = result.message;
			// 	self.render();
      		// });
		}

	,	events: {
		}

	,	bindings: {
		}

	, 	childViews: {

		}

		//@method getContext @return jjg.GrustyExt.GrustyModule.View.Context
	,	getContext: function getContext()
		{
			//@class jjg.GrustyExt.GrustyModule.View.Context
			this.message = this.message || 'Hello World!!'
			return {
				message: this.message
			};
		}
	});
});
