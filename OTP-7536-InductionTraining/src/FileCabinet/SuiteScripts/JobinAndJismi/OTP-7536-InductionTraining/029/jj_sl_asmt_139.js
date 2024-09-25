/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (record, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {

            if (scriptContext.request.method === 'GET') { 

        //         let form = sRepSearch(scriptContext);
        //         scriptContext.response.writePage(form);
        //     }
        // }
        // function sRepSearch(scriptContext){
            try{
                let form = serverWidget.createForm({
                    title: 'Employee Commission Calculator'
                    });

                let employeeField = form.addField({
                    id: 'custpage_employee',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Select Employee'
                });

                // form.addField({
                //     id: 'custpage_commission',
                //     type: serverWidget.FieldType.INLINEHTML,
                //     label: 'Commission Amount'
                // });

                form.addField({
                    id: "custpage_commission",
                    label: "Commission Amount",
                    type: serverWidget.FieldType.CURRENCY
                })
        
                

                let employeeSearch = search.create({
                    type: search.Type.EMPLOYEE,
                    filters: [
                        ['salesrep', 'is', 'T'],
                        'AND',
                        ['isinactive', 'is', 'F']
                    ],
                    columns: ['internalid', 'entityid']
                });

                employeeSearch.run().each(function (result) {
                    employeeField.addSelectOption({
                        value: result.getValue('internalid'),
                        text: result.getValue('entityid')
                    });
                    return true;
                });

                form.addSubmitButton({ label: 'Submit' });
                //return form;
                scriptContext.response.writePage(form);

            }catch (e) {
                    log.error("Error", e.message);
            }}else{
                let employeeId = scriptContext.request.parameters.custpage_employee;
                let commissionAmount = scriptContext.request.parameters.custpage_commission;
                

                let empCommRecord = record.create({
                    type: "customrecord926",
                    isDynamic: true
                });

                empCommRecord.setValue({
                    fieldId: 'custrecord1417',
                    value: employeeId
                });
                empCommRecord.setValue({
                    fieldId: 'custrecord1418',
                    value: commissionAmount
                });
                

                let empCommId = empCommRecord.save();

                scriptContext.response.write('<h1><strong>Customer Commission Record Saved:</strong> ' + empCommId + '</h1>');

                form.clientScriptModulePath = 'SuiteScripts/JobinAndJismi/OTP-7536-InductionTraining/029/jj_cs_asmt_139.js'

                
        
        }

    }

        return {onRequest}

    });
