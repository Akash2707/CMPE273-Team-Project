var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { Messages } = require('.././models/Messages')

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg.id));
   
Messages.find({ "conversationId" : msg.id }, function (err, result) {
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
