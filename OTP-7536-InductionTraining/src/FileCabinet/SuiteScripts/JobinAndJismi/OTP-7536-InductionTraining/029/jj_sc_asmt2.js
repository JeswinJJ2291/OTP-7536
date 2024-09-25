/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, runtime, search) => {
        try{
            function createSearch(){
                let openInvoices = search.create({
                    type: search.Type.INVOICE,
                    filters: [
                        ['status', 'anyof', 'CustInvc:A']
                    ],
                    columns: ['entity', 'tranid']
                });
        
                let invoiceDetails = [];
                openInvoices.run().each(function(result) {
                    var customer = result.getValue('entity');
                    var invNum = result.getValue('tranid');
                    invoiceDetails.push('Customer: ' + customer + ', Invoice: ' + invNum);
                    return true;
                });
        
                let emailBody = invoiceDetails.join('\n');

                sendEmail(emailBody);
            }

        }catch(e){
            
            log.error("create Search Error", e.message);        

        }
        function sendEmail(emailBody){
            try{
                let auth = runtime.getCurrentUser().id-1;
                log.debug("author",auth);
                email.send({
                    author: auth,
                    recipients: 'finman070924pf@netsuite.com', 
                    subject: 'Open Invoices Report',
                    body: 'open invoices List:\n\n' + emailBody
                });
                
            }catch(e){
                log.error("sendEmail Error",e.message);
            }
        }

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

            createSearch();

        }

        return {execute}

    });
