var express = require('express');

var request = require("request");
var cheerio = require("cheerio");

var router = express.Router();

/*
var mongoose = require( 'mongoose' );
var ImageCollection     = mongoose.model( 'Images' );
*/
/* GET home page. */
router.post('/', function(req, res, next) {
	var front_url = req.param('url');
	
	front_url = "http://http://whitehouse.prod51.fr/wp/";

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

	if(front_url === undefined) {
	    res.send({message: "Frontend URL cannot be undefined"});
	}

	request({
	  uri: "http://www.sitepoint.com",
	}, function(error, response, body) {
	  var $ = cheerio.load(body);

	  $(".Footer_copyright").each(function() {
	    var link = $(this);
	    var text = link.html();

	    console.log(text);
	  });
	  res.send(text);
	});

  	// res.send("Frontend:" + front_url);
});



module.exports = router;
