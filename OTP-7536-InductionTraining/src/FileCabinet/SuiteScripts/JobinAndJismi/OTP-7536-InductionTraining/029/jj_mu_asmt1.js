/**
 /**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record','N/format'],
    /**
 * @param{record} record
 * @param{format} format
 */
    (record,format) => {
        /**
         * Defines the Mass Update trigger point.
         * @param {Object} params
         * @param {string} params.type - Record type of the record being processed
         * @param {number} params.id - ID of the record being processed
         * @since 2016.1
         */
        const each = (params) => {
            try{

            let studentRecord = record.load({
                type: params.type,
                id: params.id
            });

            let currentClass = studentRecord.getValue({ fieldId: 'custrecord_stu_class' });
            let formattedCurClass = format.parse({value:currentClass, type: format.Type.INTEGER});
        
            log.debug("Current Class","Current Class: " + formattedCurClass);
            let nxtClass = formattedCurClass+1;
            log.debug("Next Class","Next Class: " +nxtClass);

            if (currentClass < 10) {
                studentRecord.setValue({
                    fieldId: 'custrecord_stu_class',
                    value: nxtClass
                });
            } else {
                studentRecord.setValue({
                    fieldId: 'custrecord_stu_class',
                    value: 11
                });
            }
            let id = studentRecord.save();
            
            log.debug("student id","Student Id: "+ id);

        }catch(e){
            log.error("Error: ",e.message);
        }
    
    }
            

        return {each}

    });






















