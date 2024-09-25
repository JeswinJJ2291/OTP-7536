/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
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

            if(scriptContext.type === scriptContext.UserEventType.CREATE){
                let newRecord = scriptContext.newRecord;
                let transactionType = newRecord.type;
    
                if(transactionType === record.Type.SALES_ORDER){
                    let customerId = newRecord.getValue({
                        fieldId: "entity"
                    });
                    try{
                        let CustomeRec = record.load({
                            type: record.Type.CUSTOMER,
                            id: customerId,
                            isDynamic: true
                        });
                        CustomeRec.setValue({
                            fieldId: 'custentitycustentity_sales_order_created',
                            value: true
                        });
                        CustomeRec.save();
    
                        log.debug('Customer checkbox updated', 'Customer ID: ' + customerId);
    
                    }catch(e){
                        log.error("Error: ", e.message);  
                    }
                } else if(transactionType === record.Type.PURCHASE_ORDER){
                    let vendorId = newRecord.getValue({
                        fieldId: "entity"
                    });
                    try{
                        let vendoRec = record.load({
                            type : record.Type.VENDOR,
                            id : vendorId,
                            isDynamic : true
                        });
                        vendoRec.setValue({
                            fieldId:"custentitycustentity_purchase_order_crea",
                            value: true
                        });
                        vendoRec.save();
    
                        log.debug("Vendor Checkbox Updated", "Vendor Id: " + vendorId);
    
                    }catch(e){
                        log.error("Error: ", e.message); 
                    }
                }
            }    
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

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
