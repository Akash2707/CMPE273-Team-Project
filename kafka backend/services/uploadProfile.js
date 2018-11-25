var crypt = require('./../crypt');
var { mongoose } = require('.././db/mongoose');
var { UserProfile } = require('.././models/profile');

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg.profilePhoto));

UserProfile.findOneAndUpdate({ "email": "patelharsh9999@gmail.com" }, { $set : { "profilePhoto": msg.profilePhoto } }, function (error, user, fields) {
    if (error) {
        callback(msg,"Some error with the query");
        console.log("Some error with the query");
    } else {
        callback(null,user)
    }
});
}
exports.handle_request = handle_request;