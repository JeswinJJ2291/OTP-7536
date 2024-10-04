/**
 *  client : Nil
 *
 *
 *  OTP 7933 - Restrict IF Save
 *
 *
 * ------------------------------------------------------------------------
 *
 * Author : Jobin And Jismi IT Services
 *
 * Date Created : 25 - September - 2024
 *
 * Description : This script is for displaying error message for item fulfillment if the customer deposit is below the total sales order amount. 
 *
 * REVISION HISTORY : 2.0
 *
 *
 *
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/ui/message'],
    /**
     * @param{record} record
     * @param{search} search
     * @param{message} message
     *///
    function (record, search, message) {

        /**
         * Calculates the total amount of customer deposits associated with a given sales order.
        *
         * This function searches for customer deposits linked to the specified sales order ID,
        * summing the total amounts of those deposits that are not canceled. 
         *
        * @param {number} salesOrderId - The internal ID of the sales order for which to calculate the deposit total.
        * @returns {number} The total amount of customer deposits related to the specified sales order.
        * @throws {Error} If an error occurs while retrieving the deposit total.
        */
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
        /**
        * Retrieves the total amount of a specified sales order.
        *
        * This function loads the sales order record using its internal ID and retrieves
        * the total amount from the sales order record.
        *
        * @param {number} salesOrderId - The internal ID of the sales order for which to retrieve the total.
        * @returns {number} The total amount of the specified sales order.
        * @throws {Error} If an error occurs while loading the sales order or retrieving the total.
        */
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

            saveRecord: saveRecord
        };


    });
