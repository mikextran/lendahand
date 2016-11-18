'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Profile = mongoose.model('Profile'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Profile
 */
exports.create = function(req, res) {
  var profile = new Profile(req.body);
  profile.user = req.user;

  profile.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(profile);
    }
  });
};

// Not sure if this should be here
/**
 * Update profile details
 */
exports.update = function (req, res) {
  // Init Variables
  var profile = req.profile;

  // For security measurement we remove the roles from the req.body object
  delete req.body.roles;

  if (profile) {
    // Merge existing user
    profile = _.extend(profile, req.body);
    profile.updated = Date.now();
    profile.displayName = profile.firstName + ' ' + profile.lastName;

    profile.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        req.login(profile, function (err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json(profile);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Show the current Profile
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var profile = req.profile ? req.profile.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  profile.isCurrentUserOwner = req.user && profile.user && profile.user._id.toString() === req.user._id.toString();

  res.jsonp(profile);
};

/**
 * Update a Profile
 */
exports.update = function(req, res) {
  var profile = req.profile;

  profile = _.extend(profile, req.body);

  profile.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(profile);
    }
  });
};

/**
 * Delete an Profile
 */
exports.delete = function(req, res) {
  var profile = req.profile;

  profile.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(profile);
    }
  });
};

/**
 * List of Profiles
 */
exports.list = function(req, res) {
  Profile.find().sort('-created').populate('user', 'displayName').exec(function(err, profiles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(profiles);
    }
  });
};

/**
 * Profile middleware
 */
exports.profileByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Profile is invalid'
    });
  }

  Profile.findById(id).populate('user', 'displayName').exec(function (err, profile) {
    if (err) {
      return next(err);
    } else if (!profile) {
      return res.status(404).send({
        message: 'No Profile with that identifier has been found'
      });
    }
    req.profile = profile;
    next();
  });
};
