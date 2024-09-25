/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],
    /**
 * @param{record} record
 */
    (serverWidget) => {

        function regForm (scriptContext){
            let form = serverWidget.createForm({title: "Registration Form"});

            scriptContext.response.writePage({pageObject: form});

            let fName = form.addField({id: "custpage_name", label: "Name", type: serverWidget.FieldType.TEXT}).isMandatory = true;
            let fAge = form.addField({id: "custpage_age", label: "Age", type: serverWidget.FieldType.INTEGER });
            let fNum = form.addField({id: "custpage_num", label: "Phone Number", type: serverWidget.FieldType.PHONE});
            let fFName = form.addField({id: "custpage_fname", label: "Father's Name", type: serverWidget.FieldType.TEXT});
            let fEmail = form.addField({id: "custpage_email", label: "Email", type: serverWidget.FieldType.EMAIL});
            let fAdrs = form.addField({id: "custpage_adrs", label: "Address", type: serverWidget.FieldType.TEXT});

        }
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            regForm(scriptContext);
        }

        return {onRequest}

    });
