/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, record, runtime, search) => {
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
            try{

            let newRec = scriptContext.newRecord;
            let cusId = newRec.getValue('entity');
            log.debug("Cus",cusId);

            let openOrderSearch = search.create({
                type: search.Type.SALES_ORDER,
                filters: [
                    ['entity', 'is', cusId],
                    'AND',
                    ['status', 'anyof', 'SalesOrd:B'] 
                ],
                columns: ['internalid']
            });
            let rsltCount = openOrderSearch.runPaged().count;
            log.debug("result",rsltCount);
            if (rsltCount > 5) {
                let salesRepId = newRec.getValue('salesrep');
                log.debug("sales Rep is:", salesRepId);
                let salesRepEmail = search.lookupFields({
                    type: search.Type.EMPLOYEE,
                    id: salesRepId,
                    columns: ['email']
                }).email;

                if (salesRepEmail) {
                    email.send({
                        author: runtime.getCurrentUser().id,
                        recipients: salesRepEmail,
                        subject: 'Customer has more than 5 open sales orders',
                        body: 'The customer with ID ' + cus + ' has more than 5 open sales orders.'
                        
                    });
                    log.debug("Email sent");
                }
            }

        }catch(e){
            log.debug("error: ",e.message);
        }
    }
        return {beforeLoad, beforeSubmit, afterSubmit}

    });
