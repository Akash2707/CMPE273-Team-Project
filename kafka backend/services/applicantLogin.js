var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { Users } = require('../models/users')


    function handle_request(msg, callback){
        console.log("In handle request:"+ JSON.stringify(msg));
        Users.findOne({
            email: msg.email,
            isRecruiter : { $eq : "false"}
        }, function (err, user) {
            if (err) {
                callback(msg,"Error in login");
            } else {
                if (user) {
                    // Check if password matches
                    crypt.compareHash(msg.password, user.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            console.log("Inside login",user);
                            callback(null,user);
                        } else {
                            callback(null,[]);
                        }   
                    }, function (error) {
                        if (error) {
                            callback(null,[]);
                        }
                    });
                } else {
                    callback(null,[]);
                }
            }
        })
}

exports.handle_request = handle_request;