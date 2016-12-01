var search = require('./controller/search.js');

function walmart(config,params,callback){
	search(config,params,callback);
}
module.exports = walmart;

