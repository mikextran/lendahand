'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,


var CommentSchema = new Schema({
	
	comment: [{
		text: String,
		timestamp: {
			type: Date,
			default: Date.now
		},
		postedBy: {
			type:mongoose.Schema.ObjectId
			ref:'User'
		}
	}]

  });

module.exports = mongoose.model('Comment',MessageSchema);

