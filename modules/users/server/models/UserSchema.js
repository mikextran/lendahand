'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,



var UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: 'Please fill in your first name',
  },

  lastName: {
    type: String,
    trim: true,
    required: 'Please fill in your last name',
  },

  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    required: 'Please fill a valid email address',
  },

  userID: {
    type: String,
    unique: 'Username already exists',
    required: 'Please fill in a username',
    trim: true
    
});

module.exports = mongoose.model('User',UserSchema);
