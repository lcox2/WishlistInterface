var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var find = require('./findByNameAndPrice.js');
var walmart = require("walmart");

//Setting up Walmart API
walmart.setApi(process.env.WALMART)

//Listen on our specifed port or 3000
var port = process.env.PORT || 3000;

//TODO-public direcotry currently empty
app.use(express.static(__dirname + './public'));

//Template engine used and view directory
app.set('view engine', 'pug');
app.set('views', './views');

//TODO
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.render('main');
});

app.post('/api/products/search', function(req, res) {
    var totalResult = [];
    var inputName = req.body.name;
    var inputPrice = req.body.price;
    var counter = 2;
    find(req.body.name, req.body.price, function(err, itemList) {
        if (err) {
            console.log('error in app post ebay');
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
    var walmartObject = {
        searchTerm: inputName,
        minPrice: 0,
        maxPrice: inputPrice
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

//Listen on port number in var port
app.listen(port, function() {
    console.log('eBay Front test on port ' + port)
});

console.log('Hello');