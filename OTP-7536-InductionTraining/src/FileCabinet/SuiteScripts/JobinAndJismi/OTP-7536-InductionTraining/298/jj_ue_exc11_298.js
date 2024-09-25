/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/search'],
    /**
 * @param{search} search
 */
    (search) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {



        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {
            function afterSubmit(context) {
                if (context.type === context.UserEventType.CREATE) {
                    try {
                        let vendorSearch = search.create({
                            type: search.Type.VENDOR,
                            columns: [
                                'entityid',        
                                'subsidiary'      
                            ]
                        });
        
                        vendorSearch.run().each(function(result) {
                            var vendorName = result.getValue('entityid');
                            var vendorSubsidiary = result.getText('subsidiary'); 
        
                            
                            log.debug('Vendor Details', 'Name: ' + vendorName + ', Subsidiary: ' + vendorSubsidiary);
        
                            return true;
                        });
        
                    } catch (e) {
                        log.error('Error retrieving vendors', e.message);
                    }
                }
            }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
