'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,


var SkillSchema = new Schema({
	category: String  
  });

module.exports = mongoose.model('Skill',MessageSchema);