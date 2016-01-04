var express = require('express');

var http = require("http");
var https = require("https");
var htmlparser = require("htmlparser2");

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

	var urlPrefix = front_url.match(/.*?:\/\//g);
	front_url = front_url.replace(/.*?:\/\//g, "");

	var options = {
	    hostname: front_url
	};

	if(urlPrefix !== undefined && urlPrefix !== null && urlPrefix[0] === "https://") {
	    options.port = 443;
	    https.get(options, function(result) {
	        processResponse(result);
	    }).on('error', function(e) {
	        res.send({message: e.message});
	    });
	} else {
	    options.port = 80;
	    http.get(options, function(result) {
	        processResponse(result);
	    }).on('error', function(e) {
	        res.send({message: e.message});
	    });
	}

	var processResponse = function(result) {
	    var data = "";
	    result.on("data", function(chunk) {
	        data += chunk;
	    });
	    var tags = [];
	    var tagsCount = {};
	    var tagsWithCount = [];
	    result.on("end", function(chunk) {
	        var parser = new htmlparser.Parser({
	            onopentag: function(name, attribs) {
	                if(tags.indexOf(name) === -1) {
	                    tags.push(name);
	                    tagsCount[name] = 1;
	                } else {
	                    tagsCount[name]++;
	                }
	            },
	            onend: function() {
	                for(var i = 0; i < tags.length; i++) {
	                    tagsWithCount.push({name: tags[i], count: tagsCount[tags[i]]});
	                }
	            }
	        }, {decodeEntities: true});
	        parser.write(data);
	        parser.end();
	        res.send({website: req.query.url, port: options.port, data: data, tags: tagsWithCount});
	    });
	}

  	// res.send("Frontend:" + front_url);
});



module.exports = router;
