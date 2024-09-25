/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/search', 'N/ui/serverWidget'],
    /**
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (search, serverWidget) => {

        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {

                let form = sOSearch(scriptContext);
                scriptContext.response.writePage(form);
            }
        }
        function sOSearch(scriptContext) {
            try {
                let form = serverWidget.createForm({ title: "Sales Order Display" });
    
    
    
                let subList = form.addSublist({ id: "custpage_sorsearch", label: "Sales Order Details", type: serverWidget.SublistType.INLINEEDITOR });
    
                subList.addField({ id: "custpage_docnum", label: "Document Number", type: serverWidget.FieldType.INTEGER });
                subList.addField({ id: "custpage_name", label: "Customer Name", type: serverWidget.FieldType.TEXT });
                subList.addField({ id: "custpage_sub", label: "Subsidiary", type: serverWidget.FieldType.TEXT });
                subList.addField({ id: "custpage_ordate", label: "order Date", type: serverWidget.FieldType.DATE });
                let mySearch = search.load({ id: "customsearch1542" });
                log.debug(mySearch);
                let lineCount = 0;
                mySearch.run().each(function (result) {
                    let entity = result.getValue({ name: "entity" });
                    let tranid = result.getValue({ name: "tranid" });
                    let subS = result.getValue({ name: "subsidiary" });
                    let trandate = result.getValue({ name: "trandate" });
                    log.debug(entity);
                    try{
                    subList.setSublistValue({
                        id: "custpage_docnum",
                        line: lineCount,
                        value: tranid
                    });
    
                    subList.setSublistValue({
                        id: "custpage_name",
                        line: lineCount,
                        value: entity
                    });
    
                    subList.setSublistValue({
                        id: "custpage_sub",
                        line: lineCount,
                        value: subS
                    });
    
                    subList.setSublistValue({
                        id: "custpage_ordate",
                        line: lineCount,
                        value: trandate
                    });
    
                    lineCount++;}
                    catch(err){
                        log.debug(err)
                    }
                    return true;

                });
                return form;
    
            
                // let salesOrderSearch = search.create({
                //     title: 'Custom Sales Order Search 02',
                //     id: 'customsearch_sales_order_scripted_02', 
                //     type: search.Type.SALES_ORDER,
                //     columns: [
                //         {name: 'tranid'},           
                //         {name: 'entity'},             
                //         {name: 'subsidiary'},         
                //         {name: 'trandate'}             
                //     ],
                //     filters:[{
                //         name: 'mainline',
                //         operator: 'is',
                //         values: ['T']
                //     }]
                // });
    
                // let savedSearchId = salesOrderSearch.save();
                // log.debug(savedSearchId);
                
            } catch (e) {
            log.error("Error", e.message);
        }}
        return { onRequest }

    });






/**
 * Defines the Suitelet script trigger point.
 * @param {Object} scriptContext
 * @param {ServerRequest} scriptContext.request - Incoming request
 * @param {ServerResponse} scriptContext.response - Suitelet response
 * @since 2015.2
 */



