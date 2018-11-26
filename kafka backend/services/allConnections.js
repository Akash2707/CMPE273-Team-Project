var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    console.log(msg.email)
    UserProfile.find({
        email:msg.email 
    },{_id:1,'requests.connectionlistlist':1}, function (err, result) {
        if (err) {
            console.log(err);
            callback(err,[]);
        } else {
           // console.log(result[0].requests.connectionlistlist)
console.log(result)
         //  console.log(k)

           callback(null,result[0].requests.connectionlistlist);

        }
    })
}

exports.handle_request = handle_request;