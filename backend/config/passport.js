'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var { mongoose } = require('.././db/mongoose');
var connection = require('./../db/connection');
var { Users } = require('./../models/User');
var config = require('./settings');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log(jwt_payload)
        connection.query('SELECT * FROM users WHERE email = ?',[jwt_payload.email], function (error, results, fields) {
            if (error) {
                return error(err, false);
            }else{
              if(results.length >0){
                var user = results[0];
                    delete user.password;
                    callback(null, user);           
              }
              else{
                return callback(null, false);
              }
            }
          });
    }));
}

