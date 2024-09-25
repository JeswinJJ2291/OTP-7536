/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/search'], function(search) {
    
    function checkCustomerOverdue(requestParams) {
        let overdueSearch = search.create({
            type: search.Type.INVOICE,
            filters: [
                ['entity', 'is', requestParams.customerId],
                'AND',
                ['status', 'anyof', 'CustInvc:A'],z
                'AND',
                ['duedate', 'before', 'today'] // Overdue
            ],
            columns: ['entity', 'duedate', 'amountremaining']
        });

        let results = overdueSearch.run().getRange({start: 0, end: 1});

        if (results.length > 0) {
            return {
                customerName: results[0].getText('entity'),
                dueDate: results[0].getValue('duedate'),
                overdueBalance: results[0].getValue('amountremaining')
            };
        } else {
            return 'No overdue';
        }
    }

    return {
        get: checkCustomerOverdue
    };
});
