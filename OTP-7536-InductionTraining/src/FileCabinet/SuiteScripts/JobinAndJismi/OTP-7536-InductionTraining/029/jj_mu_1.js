/**
 /**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the Mass Update trigger point.
         * @param {Object} params
         * @param {string} params.type - Record type of the record being processed
         * @param {number} params.id - ID of the record being processed
         * @since 2016.1
         */
        const each = (params) => {
            let objRecord = record.load({
                type: params.type,
                id: params.id,
                
            });
            let linecount = objRecord.getLineCount({
                sublistId: "item"
            });
            
            for(let i=0;i<linecount;i++){
                objRecord.setSublistValue({
                    sublistId: "item",
                    fieldId: "quantity",
                    line: i,
                    value: 5
                });

            }
            let id = objRecord.save();

            log.debug("id: ", id);

        }

        return {each}

    });
