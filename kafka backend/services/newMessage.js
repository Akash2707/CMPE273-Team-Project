var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { Conversation } = require('.././models/Conversation')
var { Messages } = require('.././models/Messages')

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
         
    var data = {
        participants : [msg.name1,msg.name2],
        participantsEmail : [msg.email1,msg.email2],
        participantsImage : [msg.image1,msg.image2]
    }


    Conversation.find({ "participantsEmail": { $all: [msg.email1, msg.email2] } }, function (err, user) {
        console.log("result" + user);

        if (err) {
            callback(msg, "Error creating user");
            console.log("Error Creating user");
        }
        else if (Object.keys(user).length != 0) {
            console.log(user[0]._id);
            Messages.find({ "conversationId": user[0]._id }, function (err, result) {
                console.log("result" + result);

                if (err) {
                    callback(msg, "Error creating user");
                    console.log("Error Creating user");
                }
                else {
                    results = {
                        id : user[0]._id,
                        messages : result 
                    }
                    callback(null, results);
                }
            });
        } else {
            var conversation = new Conversation(data)
            conversation.save().then((messagesData) => {
                results = {
                    id: messagesData._id,
                    messages: messagesData
                }
                callback(null, results);
            }, (err) => {
                callback(err, []);
            })
        }
    });
}
exports.handle_request = handle_request;
