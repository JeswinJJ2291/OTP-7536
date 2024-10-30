// Model.js
// -----------------------
// @module Case
define("jjg.GrustyExt.GrustyModule.SS2Model", ["Backbone", "Utils"], function(
    Backbone,
    Utils
) {
    "use strict";

    // @class Case.Fields.Model @extends Backbone.Model
    return Backbone.Model.extend({
        //@property {String} urlRoot
        urlRoot: Utils.getAbsoluteUrl(
            getExtensionAssetsPath(
                "Modules/GrustyModule/SuiteScript2/GrustyModule.Service.ss"
            ),
            true
        )
});
});
