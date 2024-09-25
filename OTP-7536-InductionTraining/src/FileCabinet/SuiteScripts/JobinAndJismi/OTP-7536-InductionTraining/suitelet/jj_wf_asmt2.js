/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/email', 'N/record', 'N/runtime'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 */
    (email, record, runtime) => {
        /**
         * Defines the WorkflowAction script trigger point.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.workflowId - Internal ID of workflow which triggered this action
         * @param {string} scriptContext.type - Event type
         * @param {Form} scriptContext.form - Current form that the script uses to interact with the record
         * @since 2016.1
         */
        const onAction = (scriptContext) => {

            let newRecord = scriptContext.newRecord;
            let oldRecord = scriptContext.oldRecord;

            let newCreditLimit = newRecord.getValue({
                fieldId: 'creditlimit'});
            let oldCreditLimit = oldRecord.getValue({
                fieldId: 'creditlimit'});
            let salesRepId = newRecord.getValue({
                fieldId: 'salesrep'});

            if (newCreditLimit !== oldCreditLimit) {
                newRecord.setValue({
                    fieldId: 'custentity29', 
                    value: 'Credit Limit Updated'
                });

                if (newCreditLimit > 50000) {
                    newRecord.setValue({
                        fieldId: 'custentity30',
                        value: true});

                    }
            }

        }

        return {onAction};
    });
