/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/email', 'N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (email, record, search, serverWidget) => {
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
                    let form = serverWidget.createForm({
                        title: 'Customer Information Form'
                    });

                    form.addField({
                        id: 'custpage_fname',
                        type: serverWidget.FieldType.TEXT,
                        label: 'First Name'
                    }).isMandatory = true;

                    form.addField({
                        id: 'custpage_lname',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Last Name'
                    });

                    form.addField({
                        id: 'custpage_nemail',
                        type: serverWidget.FieldType.EMAIL,
                        label: 'Email'
                    });

                    form.addField({
                        id: 'custpage_nphone',
                        type: serverWidget.FieldType.PHONE,
                        label: 'Phone'
                    });

                    form.addField({
                        id: 'custpage_dob',
                        type: serverWidget.FieldType.TEXT,
                        label: 'Date of Birth'
                    });

                    let acManager = form.addField({
                        id: 'custpage_accntmgr',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Account Manager',
                        source: 'employee' 
                    });

                    form.addSubmitButton({
                        label: 'Submit'
                    });

                    scriptContext.response.writePage(form);
                }else{

                    let fname = scriptContext.request.parameters.custpage_fname;
                    let lname = scriptContext.request.parameters.custpage_lname;
                    let email = scriptContext.request.parameters.custpage_nemail;
                    let phone = scriptContext.request.parameters.custpage_nphone;
                    let acmngr = scriptContext.request.parameters.custpage_accntmgr;
                    let dob = scriptContext.request.parameters.custpage_dob;

                    let customRecord = record.create({
                        type: "customrecord923",
                        isDynamic: true
                    });

                    customRecord.setValue({
                        fieldId: 'custrecord1408',
                        value: fname
                    });
                    customRecord.setValue({
                        fieldId: 'custrecord1409',
                        value: lname
                    });
                    customRecord.setValue({
                        fieldId: 'ccustrecord1410',
                        value: email
                    });
                    customRecord.setValue({
                        fieldId: 'custrecord1411',
                        value: phone
                    });
                    customRecord.setValue({
                        fieldId: 'custrecord1412',
                        value: dob
                    });
                    customRecord.setValue({
                        fieldId: 'custrecord1413',
                        value: acmngr
                    });

                    let customRecId = customRecord.save();

                    scriptContext.response.write('<h2>Custom Information Submitted</h2>');
                    scriptContext.response.write('<p><strong>First Name:</strong> ' + fname + '</p>');
                    scriptContext.response.write('<p><strong>Last Name:</strong> ' + lname + '</p>');
                    scriptContext.response.write('<p><strong>Email:</strong> ' + email + '</p>');
                    scriptContext.response.write('<p><strong>Phone:</strong> ' + phone + '</p>');
                    scriptContext.response.write('<p><strong>Account Manager:</strong> ' + acmngr + '</p>');
                    scriptContext.response.write('<p><strong>Date of Birth:</strong> ' + dob + '</p>');
                    scriptContext.response.write('<p><strong>Customer Record Created:</strong> ' + customRecId + '</p>');


    

                }





            }catch (e) {
                log.error({
                    title: 'Error in onRequest',
                    details: e.message
                });
                scriptContext.response.write('An error occurred while processing your request: ' + e.message);
            }

        }

        return {onRequest}

    });
