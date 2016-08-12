'use strict';
var async = require('async');
var Logger = require('../lib/logger');
var cacheHelper = require('../lib/cacheHelper');

var authConfig = {};
exports.config = function(config) {
	authConfig = config;
};

var jwt = require('express-jwt');

var bearerStrategy = function(accessToken, done) {
	//console.log('in bearerStrategy');
	Logger.debug('accessToken', accessToken);
	if (!accessToken) {
		Logger.error('access token is null');
		return done(null, false);
	}
	cacheHelper.get('token', accessToken, function(user) {
		if (!user) {
			Logger.error('can not find user by token');
			return done(null, false);
		}
		done(null, user);
	});
};

/**
 * A helper method to determine if a user has been authenticated, and if they have the right role.
 * If the user is not known, redirect to the login page. If the role doesn't match, show a 403 page.
 * @param role The role that a user should have to pass authentication.
 */
exports.isAuthenticated = function(roles) {

	return function(req, res, next) {
		var token = req.headers.token || req.query.token;
		async.waterfall([function(cb) {
			bearerStrategy(token, function(err, user) {
				if (err) {
					return cb(err);
				}
				if (!user) {
					return cb('invalid user token');
				}
				jwt({
					secret: process.env.secret || 'huibaokejium1qaz2wsx',
					userProperty: 'payload',
					getToken: function fromHeaderOrQuerystring(req) {
						return req.headers.token || req.query.token;
					}
				})(req, res, function(err) {
					if (err) {
						return cb('token not a valied jwt token');
					}
					//console.log(req.payload);
					cb(null, user);
				});
			});
		}, function(user, cb) {
			var hasRole = false;
			if (roles) {
				Logger.debug('roles', roles);
				for (var i = 0, l = user.roles.length; i < l; i++) {
					if (roles.indexOf(user.roles[i]) >= 0) {
						hasRole = true;
						break;
					}
				}
				if (!hasRole) {
					res.status(401);
					return cb('not Authorized');
				}
			}
			cb(null, user);
		}], function(err, user) {
			if (err) {
				return res.json({
					err: err
				});
			}
			res.locals.user = user;
			next()
		});
	};
};
