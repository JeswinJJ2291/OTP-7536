/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * Close sales orders in NetSuite that were created over 4 days ago, but only if they contain an item named 'KITKAT'.
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {

        function createSearch(){

            let  = search.create({
                type: search.Type.SALES_ORDER,
                title: 'Sales Order Search JJ',
                id: 'customsearch_jj_so_search',
                columns: ['entity', 'subsidiary', 'name', 'currency'],
                filters: [
                    ['mainline', 'is', 'T'],
                    'and', ['subsidiary.name', 'contains', 'CAD']
                ]
            });

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
