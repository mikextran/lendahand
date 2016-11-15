'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,


var ProfileSchema = new Schema({
	name: String,
	skills: [Skill],		
	history: [Transaction],  	
	img: { 
		data: Buffer, contentType: String },
	reviews: [Review]

  });

module.exports = mongoose.model('Profile',ProfileSchema);

var schema = new Schema({
    img: { data: Buffer, contentType: String }
});