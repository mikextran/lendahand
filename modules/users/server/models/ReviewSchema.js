'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,


var ReviewSchema = new Schema({
	text: String,
	rating: Number,
	postedBy: {
			type:mongoose.Schema.ObjectId
			ref:'User'
		},
	timestamp: {
			type: Date,
			default: Date.now
		}
  });

module.exports = mongoose.model('Review',ReviewSchema);