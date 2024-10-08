/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * Create a schedule script for sending email to NetSuite administrator. The email should contain information regarding open invoices.
 * The email body should contain customer name and invoice document number. The email needs to be sent everyday morning 10.00 am. 
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
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

        }

        return {execute}

    });
