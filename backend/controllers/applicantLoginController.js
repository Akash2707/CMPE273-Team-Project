var connection = require('../config');
var express = require('express');
var app = express();
var crypt = require('../crypt');
var config = require('../config/settings');
var passport = require('passport');
var jwt = require('jsonwebtoken');

// var requireAuth = passport.authenticate('jwt', { session: false });
// app.use(passport.initialize());

// Bring in defined Passport Strategy
require('../config/passport')(passport);
var kafka = require('../kafka/client');
module.exports.authenticate = function (req, res) {
  
    kafka.make_request('applicantLoginCheck', req.body, function (err, user) {
        console.log('in result');
        console.log(JSON.stringify(user));
        console.log(user);
        if (err) {
            console.log("Inside err");
            res.status(403).json({
                success: false,
                message: "System Error, Try Again."
            })
        } else {
            if (Object.keys(user).length != 0) {
                var data = {
                    id: user._id,
                    email: user.email,
                    isRecruiter: user.isRecruiter,
                    fName : user.fName,
                    lName : user.lName
                };
                console.log(data);
                var token = jwt.sign(data, config.secret, {
                    expiresIn: 60*60*1000  // in seconds
                });
                res.status(200).json({
                    success: true,
                    message: "",
                    token: 'JWT ' + token
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Authentication failed. Email or Password did not match.'
                })
            }
            res.end();
        }

    });

}
