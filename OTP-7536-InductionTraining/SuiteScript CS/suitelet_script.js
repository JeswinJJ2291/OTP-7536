//Display basic html content
scriptContext.response.write({output:"<h1> HW! </h1>"});

//Create Form
let form = serverWidget.createForm({title: "***"});

//Dispaly the above Page
scriptContext.response.writePage({pageObject: form});

//Add Fieldgroup to the page
let fieldGrp = form.addFieldGroup({
    id: "custpage_***",
    label:"***"
});

// Add Field under the fieldgroup********** Add .isMandatory for the fields that are mandatory
let fld = form.addField({id: "custpage_***", label: "***", type: serverWidget.FieldType.TEXT, container: "<id of the field group>"}).isMandatory = true;

//Add Submit or Reset Button
form.addSubmitButton({label: "Submit Button"}); //form.addResetButton({label: "Reset Button"});

//Add Sublist
let subLst = form.addSublist({id: "custpage_***", label: "***", type: serverWidget.SublistType.LIST});

// Add Mark and Unmark Button
subLst.addMarkAllButton();

// Add field in sublist // It is the headings to be given under a sublist like select, Customer name, Internal ID etc.
subLst.addField({id: "custpage_***", label: "***", type: serverWidget.FieldType.TEXT});

// How to load a search and display the results under the sublist
let mySearch = search.load({id: "***"});
let lineCount = 0;  // To Ierate through each lines of a sublist
mySearch.run().each(function(result) {
    let entity = result.getText({name: "entity"}); let tranid = result.getValue("tranid"); let id = result.id; //last id refers to the internal id
    subLst.setSublistValue({id: "<Set the above given sublist add Field id ",line: lineCount, value: entity});// line number should start from 0 and continue. it is the line in which the value should be displayed on.
    // Add or set the sublist value with transaction id and the internal id columns like above
    lineCount++; return true; });

