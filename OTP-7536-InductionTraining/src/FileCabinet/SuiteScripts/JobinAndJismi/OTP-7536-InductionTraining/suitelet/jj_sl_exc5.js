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
                // Create form
                var form = serverWidget.createForm({
                    title: 'Sales Orders - To Fulfill/Bill'
                });
    
                // Add filters
                var subsidiaryField = form.addField({
                    id: 'custpage_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    source: 'subsidiary' // Load Subsidiary as Source
                });
    
                var customerField = form.addField({
                    id: 'custpage_customer',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Customer',
                    source: 'customer' // Load Customer as Source
                });
    
                // Add submit button
                form.addSubmitButton({
                    label: 'Filter Results'
                });
    
                // Add sublist
                var sublist = form.addSublist({
                    id: 'custpage_sublist',
                    type: serverWidget.SublistType.LIST,
                    label: 'Sales Orders'
                });
    
                // Add sublist columns
                sublist.addField({
                    id: 'custpage_internalid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Internal ID'
                });
                sublist.addField({
                    id: 'custpage_documentname',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Document Name'
                });
                sublist.addField({
                    id: 'custpage_date',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Date'
                });
                sublist.addField({
                    id: 'custpage_status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Status'
                });
                sublist.addField({
                    id: 'custpage_customername',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer Name'
                });
                sublist.addField({
                    id: 'custpage_subsidiary',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Subsidiary'
                });
                sublist.addField({
                    id: 'custpage_department',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Department'
                });
                sublist.addField({
                    id: 'custpage_class',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Class'
                });
                sublist.addField({
                    id: 'custpage_linenumber',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Line Number'
                });
                sublist.addField({
                    id: 'custpage_subtotal',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Subtotal'
                });
                sublist.addField({
                    id: 'custpage_tax',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Tax'
                });
                sublist.addField({
                    id: 'custpage_total',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Total'
                });

                if (scriptContext.request.method === 'POST') {
    
                // Get filter values
                var subsidiaryValue = scriptContext.request.parameters.custpage_subsidiary;
                var customerValue = scriptContext.request.parameters.custpage_customer;
                log.debug('Filter Values', { subsidiary: subsidiaryValue, customer: customerValue });

                // Create search for sales orders
                var filters = [
                    ['status', 'anyof', ['SalesOrd:B', 'SalesOrd:D']],
                    'AND', ['mainline', 'is', 'F']
                ];
    
                if (subsidiaryValue) {
                    filters.push('AND', ['subsidiary', 'anyof', subsidiaryValue]);
                }
    
                if (customerValue) {
                    filters.push('AND', ['entity', 'anyof', customerValue]);
                }
    
                // Perform search
                var salesOrderSearch = search.create({
                    type: search.Type.SALES_ORDER,
                    filters: filters,
                    columns: [
                        'internalid', 'tranid', 'trandate', 'status', 'entity', 'subsidiary', 'department', 'class', 'line', 'amount', 'taxamount', 'total'
                    ]
                });

                var results = salesOrderSearch.run().getRange({ start: 0, end: 100 });

    
    
                // Add dynamic filters based on user input
             
    
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    
                    var internalId = result.getValue('internalid') || '';
                    var documentName = result.getValue('tranid') || '';
                    var date = result.getValue('trandate') || '';
                    var status = result.getText('status') || '';
                    var customerName = result.getText('entity') || '';
                    var subsidiary = result.getText('subsidiary') || '';
                    var department = result.getText('department') || '';
                    var classField = result.getText('class') || '';
                    var lineNumber = result.getValue('line') || '';
                    var amount = result.getValue('amount') || 0;
                    var taxAmount = result.getValue('taxamount') || 0;
                    var total = result.getValue('total') || 0;
                
                    // Add logs to check if the values are being populated correctly
                    log.debug('Field Values', {
                        internalId: internalId,
                        documentName: documentName,
                        date: date,
                        status: status,
                        customerName: customerName,
                        subsidiary: subsidiary,
                        department: department,
                        classField: classField,
                        lineNumber: lineNumber,
                        amount: amount,
                        taxAmount: taxAmount,
                        total: total
                    });
                    
                    // Ensure all setSublistValue calls are passed valid values
                    if (internalId) {
                        sublist.setSublistValue({
                            id: 'custpage_internalid',
                            line: i,
                            value: internalId
                        });
                    }
                
                    if (documentName) {
                        sublist.setSublistValue({
                            id: 'custpage_documentname',
                            line: i,
                            value: documentName
                        });
                    }
                
                    if (date) {
                        sublist.setSublistValue({
                            id: 'custpage_date',
                            line: i,
                            value: date
                        });
                    }
                
                    if (status) {
                        sublist.setSublistValue({
                            id: 'custpage_status',
                            line: i,
                            value: status
                        });
                    }
                
                    if (customerName) {
                        sublist.setSublistValue({
                            id: 'custpage_customername',
                            line: i,
                            value: customerName
                        });
                    }
                
                    if (subsidiary) {
                        sublist.setSublistValue({
                            id: 'custpage_subsidiary',
                            line: i,
                            value: subsidiary
                        });
                    }
                
                    if (department) {
                        sublist.setSublistValue({
                            id: 'custpage_department',
                            line: i,
                            value: department
                        });
                    }
                
                    if (classField) {
                        sublist.setSublistValue({
                            id: 'custpage_class',
                            line: i,
                            value: classField
                        });
                    }
                
                    if (lineNumber) {
                        sublist.setSublistValue({
                            id: 'custpage_linenumber',
                            line: i,
                            value: lineNumber
                        });
                    }
                
                    if (amount) {
                        sublist.setSublistValue({
                            id: 'custpage_subtotal',
                            line: i,
                            value: amount
                        });
                    }
                
                    if (taxAmount) {
                        sublist.setSublistValue({
                            id: 'custpage_tax',
                            line: i,
                            value: taxAmount
                        });
                    }
                
                    if (total) {
                        sublist.setSublistValue({
                            id: 'custpage_total',
                            line: i,
                            value: total
                        });
                    }
                }
                
    
                // Display form
                scriptContext.response.writePage(form);
            }
        

        }
    }

        return {onRequest}

    });
