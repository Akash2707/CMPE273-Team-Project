var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile } = require('.././models/profile')

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    if (msg.isEduNew == true) {
    UserProfile.findOneAndUpdate({ "email": "patelharsh9999@gmail.com" }, {
        $push: {
            "education": {
                "school": msg.school,
                "degree": msg.degree,
                "field": msg.field,
                "grade": msg.grade,
                "fromYear": msg.fromYear,
                "toYear": msg.toYear,
                "eduDescription":msg.eduDescription
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
}else{
    UserProfile.findOneAndUpdate({ "email": "patelharsh9999@gmail.com" },
    {
        $set: { "education": msg.education }
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

