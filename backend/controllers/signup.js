var connection = require('../config');
var express = require('express');
var app = express();
var crypt = require('../crypt');
var config = require('../config/settings');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var kafka = require('../kafka/client');

module.exports.register = function(req, res){

    kafka.make_request('post_signup', req.body, function (err, user) {
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
            console.log(' JSON, user added ... ')
            res.json({
                status: 200,
                success : true,
                message: 'Account created successfully!'
            })
            res.end()
        }
    }); 
}
        
module.exports.deleteTheAccount = function(req, res){
//console.log(req)
    kafka.make_request('delete_account', req.query, function (err, user) {
        console.log('in result');
        console.log(JSON.stringify(user));
        console.log(user);

        res.end()
    }); 
}