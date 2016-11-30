var Q = require("q");

var util = require('util');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

var amazonapi = require('amdefine');

var OperationHelper = require('apac').OperationHelper;


var opHelper = new OperationHelper({
    awsId: 'AKIAI7LCAK3FMX7NN47Q',
    awsSecret: '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',
    assocId: 'lcox2-20',
});




module.exports = function(input) {

    var parameters= {
        Keywords: [Object],

        paginationInput: {
            entries: 10
        },

        itemFilter: [
            {Object: 'Name'}
        ],
    }

    prodAdv.call("ItemSearch", {SearchIndex: "Books", Keywords: "Javascript"}, function(err, result) {
        console.log(JSON.stringify(result));
    })
    
    function itemsCallback(error, response) {
        if(error){
            callback(error);
            return;
        }
        var arr = itemsResponse.searchResult.item;

        var returnArray = [];

        for (var i = 0; i < arr.length; i++) {

                var varObj = {
                        id: arr[i].UPC,
                        name: arr[i].Title,
                        price: arr[i].Offers.Offer.OfferListing.Price.FormattedPrice,
                        category: arr[i].ItemAttributes.ProductGroup,
                        provider: 'amazon'
                    }
                returnArray.push(tempObj);
            }
            console.log(returnArray);
            callback(null, returnArray);
        }   
    );
}; 