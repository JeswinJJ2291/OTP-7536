/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/ui/message'],
    /**
     * @param{record} record
     * @param{search} search
     * @param{message} message
     */
    function (record, search, message) {

        function depTotal(salesOrderId) {
            try {
                var depositSearch = search.create({
                    type: 'customerdeposit',
                    filters: [
                        ['salesorder', 'is', salesOrderId], 'AND',
                        ['status', 'noneof', 'cancelled']
                    ],
                    columns: ['total']
                });

                var depositTotal = 0;
                depositSearch.run().each(function (result) {
                    depositTotal += parseFloat(result.getValue({ name: 'total' }));
                    return true;
                });
                console.log(depositTotal);
                log.debug("Deposit Total: ", depositTotal);
                return depositTotal;
            } catch (e) {
                log.error("Error in deposit:", e.message);
                console.log("Error in deposit" + e.message);
            }
        }


        function salesOrderTotal(salesOrderId) {
            try {
                // Load the Sales Order record
                let salesOrder = record.load({
                    type: record.Type.SALES_ORDER,
                    id: salesOrderId
                });

                // Get the Sales Order total
                let salesOrderTotal = salesOrder.getValue({ fieldId: 'total' });
                console.log(salesOrderTotal);
                return salesOrderTotal;

            } catch (e) {
                log.error("Error in sales total:", e.message);
                console.log("Error in sales total" + e.message);
            }


        }

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {

        }

        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {

        }

        /**
         * Function to be executed when field is slaved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         *
         * @since 2015.2
         */
        function postSourcing(scriptContext) {

        }

        /**
         * Function to be executed after sublist is inserted, removed, or edited.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function sublistChanged(scriptContext) {

        }

        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        function lineInit(scriptContext) {

        }

        /**
         * Validation function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @returns {boolean} Return true if field is valid
         *
         * @since 2015.2
         */
        function validateField(scriptContext) {

        }

        /**
         * Validation function to be executed when sublist line is committed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateLine(scriptContext) {

        }

        /**
         * Validation function to be executed when sublist line is inserted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateInsert(scriptContext) {

        }

        /**
         * Validation function to be executed when record is deleted.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
        function validateDelete(scriptContext) {

        }

        /**
         * Validation function to be executed when record is saved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @returns {boolean} Return true if record is valid
         *
         * @since 2015.2
         */
        function saveRecord(scriptContext) {

            console.log("Save Record Triggered");
            try {

                let salesOrderId = scriptContext.currentRecord.getValue({ fieldId: 'createdfrom' });
                console.log(salesOrderId);
                log.debug(salesOrderId);

                if (depTotal(salesOrderId) < salesOrderTotal(salesOrderId)) {
                    // Display a message to the user
                    message.create({
                        title: "Insufficient Deposit",
                        message: "The customer deposit for this Sales Order is insufficient. Fulfillment is restricted.",
                        type: message.Type.ERROR
                    }).show();

                    return false; // Prevent save
                }

                return true; // Allow save
            } catch (e) {
                log.error("Error in main script:", e.message);
                console.log("Error in main script" + e.message);
            }

        }

        return {
            // pageInit: pageInit,
            // fieldChanged: fieldChanged,
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            saveRecord: saveRecord
        };


    });
