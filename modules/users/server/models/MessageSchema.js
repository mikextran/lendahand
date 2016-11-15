'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,


var MessageSchema = new Schema({
	title: {
		type: String,
		required: 'Type in a message title',
		},
	message: [Comment],

  });

module.exports = mongoose.model('Message',MessageSchema);