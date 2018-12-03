var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { Messages } = require('.././models/Messages')

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
   
    var message = new Messages(msg)

    message.save().then((message) => {
        callback(null,"Message sent successfully!");
    }, (err) => {
        callback(err,[]);
    })
}
exports.handle_request = handle_request;
