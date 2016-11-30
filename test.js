var amazonapi = require('amdefine');


var Find = require('./FindingItAll.js')


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
    var respArr = [];
    var givenName = request.body.name;
    var counter = 2;
    Find.finder(function(givenName)
    {
        opHelper.execute('ItemSearch', {
        'SearchIndex': 'All',
        'Keywords': givenName,
        'ResponseGroup': 'ItemAttributes,Offers'
        })
    }) 
});

app.listen(port, function(){

    console.log('Whishlist sample on port: ' + port);

});
