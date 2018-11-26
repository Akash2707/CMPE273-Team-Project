var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile } = require('.././models/UserProfile')

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));

    if (msg.isExpNew == true) {
        UserProfile.findOneAndUpdate({ "email": msg.email }, {
            $push: {
                "experience": {
                    "position": msg.position,
                    "company": msg.company,
                    "compLocation": msg.compLocation,
                    "compDescription": msg.compDescription,
                    "from": msg.from,
                    "isWorking": msg.isWorking,
                    "to": msg.to,
                }
            }
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
else {
    UserProfile.findOneAndUpdate({ "email": "patelharsh9999@gmail.com" },
        {
            $set: { "experience": msg.experience }
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
}
exports.handle_request = handle_request;

