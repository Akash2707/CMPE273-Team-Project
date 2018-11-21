var connection = require('../config');
var express = require('express');
var app = express();
var crypt = require('../crypt');
var config = require('../config/settings');

var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', { session: false });
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('../config/passport')(passport);

var kafka = require('../kafka/client');

module.exports.authenticate = function (req, res) {
  
    kafka.make_request('post_login', req.body, function (err, user) {
        console.log('in result');
        console.log(JSON.stringify(user));
        console.log(user);
    
        if(typeof user == "string"){
            console.log(' String ... ')
            res.json({
                status: 400,
                success : false,
                message: user
            })
        } else{
        
            console.log(' authenticated ...  ', user._id)
            var data = {
                id: user._id,
                email: user.email,
                isRecruiter: user.isRecruiter
            };

            var token = jwt.sign(data, config.secret, {
                expiresIn: 60*60*1000  // in seconds
            });  
            
            res.json({
                status: 200,
                success : true,
                message: 'successfully authenticated',
                isRecruiter: user.isRecruiter,
                token : token
            })
        }res.end()
    });
}
