//	Walmart Search API
// https://developer.walmartlabs.com/docs/read/Search_API


var request = require('request');
var url = 'http://api.walmartlabs.com/v1/search?apiKey=';

var validProperties = ["query","categoryId","start","sort","order","format","responseGroup", "numItems", "facet", "facet.filter", "facet.range"];

function search(config,params,callback){

	var formedURL = url + config.apikey;
	
	//add linkshare if one exists
	if(config.lsPublisherId)
	{
		formedURL	+="&lsPublisherId="
					+	config.lsPublisherId;
	}
	
	formedURL += paramGen(params);
	
	request(formedURL, function (errors, response, body) {
		
		if (!errors && response.statusCode == 200) {
			callback(null, JSON.parse(body));
		}else if(errors){
			console.log("The following errors occurred");
			console.log(errors);
		}else if(response.statusCode != 200){
			switch(response.statusCode){
				case 400:
					var errorCode = {
						code: response.statusCode,
						message: 'Bad Request'
					}				
					callback(errorCode);
					break;
				case 403:
					var errorCode = {
						code: response.statusCode,
						message: 'Forbidden. Try checking apikey'
					}				
					callback(errorCode);
					break;
				case 404:
					var errorCode = {
						code: response.statusCode,
						message: 'Wrong Endpoint'
					}				
					callback(errorCode);
					break;
				case 414:
					var errorCode = {
						code: response.statusCode,
						message: 'Request URI too long'
					}				
					callback(errorCode);
					break;
				case 500:
					var errorCode = {
						code: response.statusCode,
						message: 'Internal Server Error'
					}				
					callback(errorCode);
					break;
				case 502:
					var errorCode = {
						code: response.statusCode,
						message: 'Bad Gateway'
					}				
					callback(errorCode);
					break;
				case 503:
					var errorCode = {
						code: response.statusCode,
						message: 'Service Unavailable/API Maintenance'
					}				
					callback(errorCode);
					break;
				case 504:
					var errorCode = {
						code: response.statusCode,
						message: 'Gateway timeout'
					}				
					callback(errorCode);
					break;

			}
		}
	});
}

function paramGen(params){
	var reqURL="";
	for (var property in params){
		// ignore all properties that aren't in the validProperties list
		if( validProp(property) ){
			reqURL = reqURL + "&" + property + "=" + params[property];
		}
	}
	
	return reqURL;
}

/*
Fix this I don't like how slow it is
*/

function validProp(property){
	for(var i = 0; i < validProperties.length; i++){
		if(validProperties[i] == property){
			return true;
		}
	}
	return false;
}

module.exports = search;

