var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { Conversation } = require('.././models/Conversation')

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
   
Conversation.find({ "participantsEmail" : msg.email }, function (err, result) {
    console.log("result" + result);
    
    if (err) {
        callback(msg,"Error creating user");
        console.log("Error Creating user");
    }
    else {
        callback(null,result);
    }
});
}
exports.handle_request = handle_request;
