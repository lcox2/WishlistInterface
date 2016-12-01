var amazonapi = require('amdefine');

var walmart = require("walmart");

var bodyParser = require('body-parser');

walmart.

var Find = require('./FindingItAll.js');

var arr = require('./FindingItAll.js').arr;

var OperationHelper = require('apac').OperationHelper;

var opHelper = new OperationHelper({
    awsId: 'AKIAI7LCAK3FMX7NN47Q',
    awsSecret: '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',
    assocId: 'lcox2-20',
});
var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'pug');
app.set('views', './Amazon');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', function(request, response){
    
    response.render('main');
    
});

app.post('/api/products/search', function(request, response) {
    //Amazon
    var respArr = arr;
    var counter = 2;
    var givenName = request.body;
    Find.finder(givenName)
        .then(function(data){
            console.log(data);
            response.send(data);
        })
        .catch(function(err){
            console.log(err);
        });
    //Ebay

    //Walmart
    var walmartObject = {
        searchTerm: givenName
    }
    walmart.search(walmartObject, function(err, itemList) {
        if (err) {
            console.log('error in app post walmart');
            res.send('error');
            return;
        }
        console.log('Walmart object 0 maxPrice is: ', +itemList[0].price)
        totalResult.push(itemList);
        counter--;
        if (counter === 0) {
            res.send(totalResult);
        }
    });
});

app.listen(port, function(){

    console.log('Amazon Wishlist on port: ' + port);

});
