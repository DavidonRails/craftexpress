/*
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Images = new Schema({
    id    : String,
    url    : String,
    tag	: [{
	    x : String,
	    y : String
    }],
    format_type : Number,
    proceed : Boolean,
    updated_at : { type: Date, default: Date.now }
});

mongoose.model( 'Images', Images );
mongoose.connect( 'mongodb://localhost/craftnation' );
*/