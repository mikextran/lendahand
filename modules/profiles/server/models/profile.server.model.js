'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
  skills: {
    type: String,
    default: '',
    required: 'List your skills',
    trim: true
  },
  about: {
    type: String,
    default: '',
    required: 'List something about yourself',
    trim: true
  },
  location: {
    type: String,
    default: '',
    required: 'List your location',
    trim: true
  }
});

mongoose.model('Profile', ProfileSchema);
