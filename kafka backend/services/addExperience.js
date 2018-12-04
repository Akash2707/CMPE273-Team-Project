var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile } = require('.././models/UserProfile')

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg.experience));
    console.log("msgisexp" + msg.isExpNew);
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
        else{
            const data = {
                experience : msg.experience
            }
            console.log(data.experience)
            UserProfile.findOneAndUpdate({"email":  msg.email },
            {
                $set: { "experience": data.experience }
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
        // UserProfile.findOneAndUpdate({ "email": msg.email },
        //     {
        //         $set: { 
        //                "experience.$[element]" : msg.experience 
        //         },
        //     },{arrayFilters : [{ "element._id" : msg.experience._id }] , upsert : true } , function (err, result) {
        //         console.log("result" + result);

        //         if (err) {
        //             callback(msg, "Error creating user");
        //             console.log("Error Creating user");
        //         }
        //         else {
        //             callback(null, result);
        //         }
        //     });

        // var updateData = {};

        // for (f in experience) {
        //     if (f != "_id") updateData["experience.$." + f] = experience[f];
        // };
        // UserProfile.findOneAndUpdate({ "email": msg.email, 'experience._id': msg.experience._id }, { 
        //     $set: updateData 
        // }, function (err, result) {
        //     console.log("result" + result);

        //     if (err) {
        //         callback(msg, "Error creating user");
        //         console.log("Error Creating user");
        //     }
        //     else {
        //         callback(null, result);
        //     }
        // });

}
exports.handle_request = handle_request;

