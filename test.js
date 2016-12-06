var amazonapi = require('amdefine');
var walmart = require("walmart");

walmart.setApi(process.env.WALMART);

var Find = require('./FindingItAll.js');

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
    var counter = 2;
    var totalResult = [];
    //Amazon
    var givenName = request.body.name;
    Find.finder(givenName)
        .then(function(data){
            console.log(data);
            response.send(data);
        })
        .catch(function(err){
            console.log(err);
        });
    //Ebay
<<<<<<< HEAD
<<<<<<< HEAD
    APIKEY = 'ff9b1a47-10fb-40d6-ad48-23527dd70aef';
    process.env.APIKEY
    var ebaySearch = require('ebayfinder');
    ebaySearch(APIKEY, "Tennis Ball", 99, function(err, res){
    console.log("Inside Ebayfinder's function call...");
    });

=======
>>>>>>> 86a89ffb32f9a4edbfec93e7be50d236d422a092
=======
>>>>>>> 86a89ffb32f9a4edbfec93e7be50d236d422a092
    //Walmart
    var walmartObject = {
        searchTerm: request.body.name,
        minPrice: '0',
        maxPrice: '10000000'
    }
    walmart.search(walmartObject, function(err, res){
        
    });
});


app.listen(port, function(){

    console.log('Amazon Wishlist on port: ' + port);

});
