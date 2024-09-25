// Create Sales Order and save
function createSearch() {

    let myDemoSearch = search.create({
        type: search.Type.SALES_ORDER,
        title: 'My Demo Search JJ',
        id: 'customsearch_jj_my_demo_search',
        columns: ['entity', 'subsidiary', 'name', 'currency'],
        filters: [
            ['mainline', 'is', 'T'],
            'and', ['subsidiary.name', 'contains', 'CAD']
        ]
    });
    myDemoSearch.save();

    //Loading and displaying data from the search
    let searchResult = myDemoSearch.run().getRange({
        start: 0,
        end: 100
    });

    for (let i = 0; i < searchResult.length; i++) {
        log.debug(searchResult[i]);
    }


}