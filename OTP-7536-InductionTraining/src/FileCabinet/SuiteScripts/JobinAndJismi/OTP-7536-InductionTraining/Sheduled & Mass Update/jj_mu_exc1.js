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

            let objRec = record.load({
                type: params.type,
                id: params.id
            });

            objRec.setValue({
                fieldId : "memo",
                value :"Memo updated"
            });

            let id = objRec.save();

            log.debug("id: ", id);
           }

        return {each}

    });
