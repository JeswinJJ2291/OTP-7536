/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/search'],
    /**
 * @param{search} search
 */
    (search) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {


            let currentDay = new Date();
                    let startDayOfPrevMonth = new Date(currentDay.getFullYear(),currentDay.getMonth()-1,2);
                    let lastDayOfPrevMonth = new Date(currentDay.getFullYear(),currentDay.getMonth(),1);
 
                    let formattedStartDate = format.format({
                        value: startDayOfPrevMonth,
                        type: format.Type.DATE
                    });
 
                    let formattedEndDate = format.format({
                        value: lastDayOfPrevMonth,
                        type: format.Type.DATE
                    })
 
                    let customerSearch = search.create({
                        type: search.Type.CUSTOMER,
                        title: "JJ Customers in Previous Month",
                        id: 'customsearch_jj_custom_in_prev_month',
                        filters: [{
                            name: "subsidiary",
                            operator: search.Operator.IS,
                            values: 2
                        },
                        {
                            name: "datecreated",
                            operator: search.Operator.ONORBEFORE,
                            values: formattedStartDate
                        },
                        {
                            name: "datecreated",
                            operator: search.Operator.ONORAFTER,
                            values: formattedEndDate
                        }],
                        columns: ['entityid','subsidiary','salesrep','email','datecreated']
                    });
 
                    customerSearch.save();
 
        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
