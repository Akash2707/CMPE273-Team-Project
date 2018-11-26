var crypt = require('./../crypt');
var { mongoose } = require('.././db/mongoose');
var { UserProfile } = require('.././models/UserProfile');

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg.profilePhoto));

UserProfile.findOneAndUpdate({ "email": msg.email }, { $set : { "profilePhoto": msg.profilePhoto } }, function (error, user, fields) {
    if (error) {
        callback(msg,"Some error with the query");
        console.log("Some error with the query");
    } else {
        callback(null,user)
    }
});
}
exports.handle_request = handle_request;