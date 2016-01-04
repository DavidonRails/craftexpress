var express = require('express');

var request = require("request");
var cheerio = require("cheerio");

var router = express.Router();

/*
var mongoose = require( 'mongoose' );
var ImageCollection     = mongoose.model( 'Images' );
*/
/* GET home page. */
router.get('/', function(req, res, next) {
	request({
	  uri: "http://www.imdb.com/title/tt1229340/",
	}, function(error, response, body) {
		if(error) {
			res.send(error);
		} else {

		  var $ = cheerio.load(body);

		  var temp = "";

		  $("#img_primary img").each(function() {
		    var link = $(this);
		    var text = link.html();
		    temp = text;
		    
		    console.log(text);
		  });
		  res.send(temp);
		}
	});
})

router.post('/', function(req, res, next) {
	var front_url = req.param('url');
	
	//front_url = "http://http://whitehouse.prod51.fr/wp/";

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

	if(front_url === undefined) {
	    res.send({message: "Frontend URL cannot be undefined"});
	}

	var img_count = 0;

	request({
	  uri: front_url,
	}, function(error, response, body) {

		if(!error) {
			  var $ = cheerio.load(body);

			  $("article img").each(function() {
			  	img_count++;
			    var link = $(this);
			    var text = link.html();

			    console.log(text);
			  });

			res.send({message: front_url + " can be parsed " + img_count + " images!"});
		} else {
			res.send({message: front_url + " cannot be scraped"});
		}
	});

  	// res.send("Frontend:" + front_url);
});



module.exports = router;
