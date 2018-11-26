var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile } = require('.././models/UserProfile')

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));

    UserProfile.findOneAndUpdate({ "email": msg.email}, 
        { $set : { "skills": msg.skills } 
    }, function (err, result) {
        console.log("result" + result);

        if (err) {
            callback(msg, "Error creating user");
            console.log("Error Creating user");
        }
        else {
            callback(null, result);
        }
    });
}
exports.handle_request = handle_request;


