var amazonapi = require('amdefine')


var finder = require('./FindingItAll.js');

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

app.post('/api/products/search', function(request){
    var totalResult = [];
    var inputName = request.body.name;
    var counter = 2;
    finder(request.body.name, request.body.price, function(err, itemList) {
        if (err) {
            console.log('error in app post walmart');
            res.send('error');
            return;
        }
        console.log('res object 0 id is: ' + itemList[0].id);
        totalResult.push(itemList);
        counter--;
        if (counter === 0) {
            res.send(totalResult);
        }
    });
    //var _search = req.body;
    //console.log(_search);
    //res.render('main', {title: 'Found This! '});
});

app.listen(port, function(){

    console.log('Whishlist sample on port: ' + port);

});
