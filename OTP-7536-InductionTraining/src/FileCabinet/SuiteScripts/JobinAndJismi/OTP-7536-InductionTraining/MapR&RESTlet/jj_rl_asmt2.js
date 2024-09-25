/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {

            try{
                let items = salesOrder(requestParams);
                return items;

            }catch(e){
            
                log.error("Error",e.message);
            }
            
            

            
            function salesOrder(requestParams){
                let salesOrderRecord = record.load({
                    type: record.Type.SALES_ORDER,
                    id: requestParams.id
                });
                let itemCount = salesOrderRecord.getLineCount({
                    sublistId: "item"
                });
                let items = [];
                let msg = "Sales order contains more than 2 items";
                

                for (let i = 0; i < itemCount; i++) {
                    let item = {
                        name: salesOrderRecord.getSublistValue({ sublistId: 'item', fieldId: 'item', line: i}),
                        quantity: salesOrderRecord.getSublistValue({ sublistId: 'item', fieldId: 'quantity', line: i }),
                        rate: salesOrderRecord.getSublistValue({ sublistId: 'item', fieldId: 'rate', line: i}),
                        amount: salesOrderRecord.getSublistValue({ sublistId: 'item', fieldId: 'amount', line: i})
                    };
                    items.push(item);
                }
                if (itemCount > 1) {
                    
                    items.unshift(msg);
                }
                

                return JSON.stringify(items);

            }

        }

        /**
         * Defines the function that is executed when a PUT request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const put = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a DELETE request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const doDelete = (requestParams) => {

        }

        return {get, put, post, delete: doDelete}

    });
