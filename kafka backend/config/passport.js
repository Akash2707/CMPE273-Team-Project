/*
'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var { Users } = require('.././models/users')
var config = require('./settings');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        Users.findOne({ email: jwt_payload.email }, function (err, user) {
            if (err) {
                return callback(err, false);
            } else {
                if (user) {
                    var user = user;
                    delete user.password;
                    callback(null, user);
                } else {
                    return callback(null, false);
                }
            }
        });
    }));
}

*/