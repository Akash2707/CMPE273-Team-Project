var crypt = require('./../crypt');
var { mongoose } = require('.././db/mongoose');
var { UserProfile } = require('.././models/profile');

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
UserProfile.findOne({
    "email" : "patelharsh9999@gmail.com"
}, function (err, user) {
    if (err) {
        callback(msg,"Some error with the query");
        console.log("Some error with the query");
    } else {
        if (user) {
            callback(null,user)
        } else {
            callback(null,[])
        }
    }
});
}
exports.handle_request = handle_request;