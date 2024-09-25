/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 * Send an email with the previous month's sales order details.
 * The sender should be the sales rep and the recipient should be the sales manager. 
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {

        function createSearch() {
            try{
                let salesRepSearch = search.create({
                    type: search.Type.EMPLOYEE,
                    columns: ['entityid','supervisor','email','internalid'],
                    filters: [
                        ['salesrep', 'is', 'T'],
                        'and', ['isinactive', 'is', 'F']
                    ]
                });

                let entity = " ";
                let supervisor = " ";
                let internalid = ' ';
                salesRepSearch.run().each(function(result){
                    entity = result.getValue("entityid");
                    supervisor = result.getValue("supervisor");
                    internalid = result.getValue("internalid");
                    let email = result.getValue("email");
                    let smemail = " ";
                    if(supervisor){
                    smemail = salesManEmail(supervisor);
                    
                    }
                    //log.debug("Entity id: "+ internalid, "Entity: "+ entity + ", email id: "+ email + ", Supervisor: "+ supervisor + ",supervisor email id: "+ smemail);
                    let salesOrder = salesOrderSearch(internalid);
                    //log.debug("Sales Order Details", salesOrder);
                    return true;
                    
                });
                
                
                
            
            
                // for (let i = 0; i < searchResult.length; i++) {
                //     let entity = searchResult[i].getValue({
                //         name: 'entityid'
                //     });
                //     log.debug("Entity id:",  entity)
                // }
                // salesRepSearch.run().each(function(result) {
                //     let entity = result.getValue({
                //         name: 'entityid'
                //     });
                //     // var subsidiary = result.getValue({
                //     //     name: 'subsidiary'
                //     // });
        
                    // return true;
                // });
                // log.debug("Entity" , entity);
                // console.log("entity: ",entity);
            }catch(e){
                log.error("Error",e.message);
            }
            

        }

        function salesManEmail(result){
          try{
            let salesMngrEmailId = record.load({
                type: record.Type.EMPLOYEE,
                id: result,
                isDynamic: true
            });

            let id = salesMngrEmailId.getValue("email");
            return id;

          }catch(e){
            log.error("Sales Manager Error: ",e.message);

          }
        }

        // function sendEmail(authors,recepients){

        // }

        function salesOrderSearch(repid){
            try{
                let salesOrder = search.create({
                    type: search.Type.SALES_ORDER,
                    columns: ['entity', 'tranid', 'name', 'trandate', 'amount'],
                    filters: [
                        ['salesrep', 'is', repid], 'and',
                        ['trandate', 'within', 'lastmonth']
                    ]
                });
                let searchRes = salesOrder.run();
                let res = searchRes.getRange({
                    start: 0,
                    end: 500
                });
                for (let i = 0; i < res.length; i++) {
                    log.debug("sales Order Search ", res[i]);
                }
                

            }catch(e){
                log.error( e.message);
            }

            

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
