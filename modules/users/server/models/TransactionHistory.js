'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,


var TransactionSchema = new Schema({
	service: [Post],
	host: {
			type:mongoose.Schema.ObjectId
			ref:'User'
		},

	guest: {
			type:mongoose.Schema.ObjectId
			ref:'User'
		}

  });

module.exports = mongoose.model('Transaction',MessageSchema);