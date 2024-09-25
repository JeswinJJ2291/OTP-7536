/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/log', 'N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{log} log
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (log, record, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            try {
                if (scriptContext.request.method === 'GET') {
                    // Create the form
                    let form = serverWidget.createForm({
                        title: 'Customer Information Form'
                    });
    
                    // Add Name field
                    form.addField({
                        id: 'custpage_name',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Name'
                    }).isMandatory = true;
    
                    // Add Email field
                    form.addField({
                        id: 'custpage_email',
                        type: serverWidget.FieldType.EMAIL,
                        label: 'Email'
                    }).isMandatory = true;
    
                    // Add Phone field
                    form.addField({
                        id: 'custpage_phone',
                        type: serverWidget.FieldType.PHONE,
                        label: 'Phone'
                    }).isMandatory = true;
    
                    // Add Sales Rep field (Select Field)
                    let salesRepField = form.addField({
                        id: 'custpage_salesrep',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Sales Rep',
                        source: 'employee' // Source for the select field
                    });
    
                    // Add Subsidiary field (Select Field)
                    let subsidiaryField = form.addField({
                        id: 'custpage_subsidiary',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Subsidiary',
                        source: 'subsidiary' // Source for the select field
                    });
    
                    // Add Submit button
                    form.addSubmitButton({
                        label: 'Submit'
                    });
    
                    // Display the form
                    scriptContext.response.writePage(form);
    
                } else {
                    // Handle form submission (POST request)
                    let name = scriptContext.request.parameters.custpage_name;
                    let email = scriptContext.request.parameters.custpage_email;
                    let phone = scriptContext.request.parameters.custpage_phone;
                    let salesRep = scriptContext.request.parameters.custpage_salesrep;
                    let subsidiary = scriptContext.request.parameters.custpage_subsidiary;
    
                    // Create the customer record
                    let customerRecord = record.create({
                        type: record.Type.CUSTOMER,
                        isDynamic: true
                    });
    
                    customerRecord.setValue({
                        fieldId: 'companyname',
                        value: name
                    });
    
                    customerRecord.setValue({
                        fieldId: 'email',
                        value: email
                    });
    
                    customerRecord.setValue({
                        fieldId: 'phone',
                        value: phone
                    });
    
                    if (salesRep) {
                        customerRecord.setValue({
                            fieldId: 'salesrep',
                            value: salesRep
                        });
                    }
    
                    if (subsidiary) {
                        customerRecord.setValue({
                            fieldId: 'subsidiary',
                            value: subsidiary
                        });
                    }
    
                    let customerId = customerRecord.save();
    
                    // Display the details entered by the user
                    scriptContext.response.write('<h2>Customer Information Submitted</h2>');
                    scriptContext.response.write('<p><strong>Name:</strong> ' + name + '</p>');
                    scriptContext.response.write('<p><strong>Email:</strong> ' + email + '</p>');
                    scriptContext.response.write('<p><strong>Phone:</strong> ' + phone + '</p>');
                    scriptContext.response.write('<p><strong>Sales Rep:</strong> ' + salesRep + '</p>');
                    scriptContext.response.write('<p><strong>Subsidiary:</strong> ' + subsidiary + '</p>');
                    scriptContext.response.write('<p><strong>Customer Record Created:</strong> ' + customerId + '</p>');
                }
            } catch (e) {
                log.error({
                    title: 'Error in onRequest',
                    details: e.message
                });
                scriptContext.response.write('An error occurred while processing your request: ' + e.message);
            }
        }

        return {onRequest}

    });
