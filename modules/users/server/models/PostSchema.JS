'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,


var PostSchema = new Schema({
	title: {
		type: String,
		required: 'Type in a message title',
		},
	description: String,
	time: {
		type: Date,
			default: Date.now
		},
	status: String,
	location: String,
	service: String,
	price: Number,

	comments: [Comment]

  });

module.exports = mongoose.model('Post',PostSchema);