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

            let newSalesOrder = record.create({
                type: record.Type.SALES_ORDER,
                isDynamic: true
            });

            newSalesOrder.setValue('entity', 7019);
            newSalesOrder.selectNewLine({
                sublistId: 'item'
            });

            newSalesOrder.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                value: '730'
            });
            newSalesOrder.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                value: 100
            });

            newSalesOrder.commitLine({
                sublistId: 'item'
            });

            let recordId = newSalesOrder.save({
                enableSourcing: false,
                ignoreMandatoryFields: true
            });

            log.debug('Sales Order Created', 'Record ID: ' + recordId);

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

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
