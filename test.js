var amazonapi = require('amdefine');
var walmart = require("walmart");

walmart.setApi('krrjmy2wbqm2c2fah5hqtzks');

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

app.get('/', function(request, res){
    
    res.render('main');
    
});

app.post('/api/products/search', function(request, res) {
    var counter = 2;
    var totalResult = [];
    //Amazon
    var givenName = request.body.name;
    Find.finder(givenName)
        .then(function(data){
            console.log(data);
            totalResult.push(data)
        })
        .catch(function(err){
            console.log(err);
        });
    //Walmart
    var walmartObject = {
        searchTerm: givenName,
        minPrice: '0',
        maxPrice: '10000000'
    }
    walmart.search(walmartObject, function(err, itemList){
        if(err){
            console.log(err);
            res.send(err);
        }   
        else{
            console.log(itemList);
            totalResult.push(itemList);
            res.send(totalResult);
        }
    });
    //Ebay
    //matt what do I do here?
   // var ebaySearch = require('ebayfinder');
    //ebaySearch('ff9b1a47-10fb-40d6-ad48-23527dd70aef', request.body.name, 99, function(err, secList){
        //if(err){
          //  console.log(err);
          //  res.send(err);
       // }   
        //else{
       //     console.log(secList);
      //      totalResult.push(secList);
       //     res.send(totalResult);
       // }
   // });
});


app.listen(port, function(){

    console.log('Amazon Wishlist on port: ' + port);

});
