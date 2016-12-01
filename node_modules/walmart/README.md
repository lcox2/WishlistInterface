# Walmart Api 
CS 320 XML
WVUP Fall 2016


## Installing
To install, first you need to add this line in your package.json file under the dependencies
```
"walmart": "git+https://github.com/zroberts/walmart.git"
```

Next, run npm install and it should pull down the files and install them.


## Setup Object
```
var walmart = require("walmart");
```

## Setting API Key
```
walmart.setApi(<API KEY>);
```

##########
## Searching
```
walmart.search(<searchObject>, function(err, res){
	
});
```
searchObject is a JSON Object, with searchTerm required, minPrice and maxPrice optional

### EXAMPLE -
```
var searchObject = {
  searchTerm : 'Playstation',
  minPrice   : '100',
  maxPrice   : '200'
}
```


### RETURN 
will return an array of json object with the following fields
```
[
	{
		id: 	   <the product ID>,
		name:	   <the product name>,
		price:	   <msrp>,
		saleprice: <current price>,
		category:  <category parth from walmart>,
		url: 	   <URL to product on Walmart.com>,
		imageUrl:  <url for the medium-sized image>,
		provider:  <STATIC Walmart>,
		reviews:   <number out of 5, returns 0 if there are no reviews>,
		numReviews: <number of reviews that have been submited>,
		description: <description of the item>,
	}
]
```

#### To access the array - 
```
resp[i].id
resp[i].namne
etc...
```
