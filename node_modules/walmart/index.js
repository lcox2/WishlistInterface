
var walmart = require('./core');
var walmartApiKey = {
	apikey: ''
}

module.exports = {

	setApi: function(userApiKey){
		walmartApiKey = {
			apikey: userApiKey
		}
	},
	search: function(sItems, callback){
		var search;
		if(sItems.searchTerm && sItems.minPrice && sItems.maxPrice){
			search = {
				"type"			: "search",
				"query" 		: sItems.searchTerm,
				"sort" 			: "price",
				"order" 		: "desc",
				"numItems"		: "10",
				"format"		: "json",  
				"responseGroup" : "base",
				"facet" 		: "on", 
				"facet.range" 	: "price:["+sItems.minPrice+" TO "+sItems.maxPrice+"]"
			};
		}else if(sItems.searchTerm){
			search = {
				"type"			: "search",
				"query" 		: sItems.searchTerm,
				"sort" 			: "price",
				"order" 		: "desc",
				"numItems"		: "10",
				"format"		: "json",  
				"responseGroup" : "base"
			};
		}else{
			callback("Something needs to be searched for");
			return;
		}

		if(walmartApiKey.apikey == ''){
			callback("API Key needs to be set");
			return;
		}else{
			walmart(walmartApiKey, search, function(err, resp){
				if(err){
					callback(err);
					return;
				}
				var outPut = [];
				for(var i = 0; i < resp.items.length; i++){
					var customerRating,
						numReviews;
					if(!resp.items[i].customerRating){
						customerRating = 0;
					}else{
						customerRating = resp.items[i].customerRating;
					}
					if(!resp.items[i].numReviews){
						numReviews = 0;
					}else{
						numReviews = resp.items[i].numReviews;
					}
					var tempItem = {
						'id': resp.items[i].itemId,
						'sku' : 'No SKU Available',
						'name' : resp.items[i].name,
						'price': resp.items[i].msrp,
						'saleprice': resp.items[i].salePrice,
						'category': resp.items[i].categoryPath,
						'url': resp.items[i].productUrl,
						'imageUrl': resp.items[i].largeImage,
						'provider': 'walmart',
						'reviews': customerRating,
						'description': resp.items[i].shortDescription,
						'numReviews': numReviews

					};
					outPut.push(tempItem);
				};

				callback(null, outPut);
			});
		}
	}
}