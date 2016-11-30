var amazonapi = require('amdefine');


var Finder = require('./FindingItAll.js')


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
    Finder.finder(request.body.name)

    console.log("Final object list is: " , +resarr[0].id);
    respArr.push(resarr);
    counter--;
    if(counter === 0){
        result.send(respArr);
        }
    return module.exports;
});

app.listen(port, function(){

    console.log('Whishlist sample on port: ' + port);

});
