/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
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

            let customRecord = record.create({
                type: "customrecord922",
                isDynamic: true
            });

            customRecord.setValue({
                fieldId: "custrecord1407",
                value: "TheG"
            });
            customRecord.setValue({
                fieldId: "custrecord1406",
                value: "Test"
            });

            let recId = customRecord.save();
            return recId;

        }

        return { onAction };
    });
