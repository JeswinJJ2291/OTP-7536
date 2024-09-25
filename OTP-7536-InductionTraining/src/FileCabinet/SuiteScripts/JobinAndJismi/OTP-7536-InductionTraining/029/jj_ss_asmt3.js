/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            try{
                let cust = search.createColumn({
                    name: "entity",
                     summary: "GROUP",
                   label: "Name"
                    });
                    let amt =search.createColumn({
                        name: "amount",
                        summary: "SUM",
                        label: "Amount"
                    })
                
                let salesSearch = search.create({
                type: search.Type.SALES_ORDER,
                filter: [],
                columns:
                [cust,amt
                     
                            
                        ]

            });
            let salesData = [];
            let searchResultCount = salesSearch.runPaged().count;
            log.debug("salesorderSearchObj result count",searchResultCount);
            
            salesSearch.run().each(function(result){
                let totalSales = result.getValue(amt);
            let customer = result.getValue(cust);
                salesData.push('Customer: ' + customer + ', Total Sales: ' + totalSales);
  
            return true;
            });

            log.debug("Sales Details",salesData);
        }catch(e){
            log.error("Error",e.message);
        }

        }

        return {execute}

    });
