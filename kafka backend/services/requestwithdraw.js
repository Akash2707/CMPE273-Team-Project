var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')


    function handle_request(msg, callback){
        console.log("In handle request:"+ JSON.stringify(msg));
        UserProfile.findOneAndUpdate({
            'email':msg.user_email
        },
        {
            $pull:
            {
                'requests.sendrequest':msg.connection_email
            },
        },
        {
            upsert:true
        }).then((result)=> {
            console.log("Updated Document:",result);
          //  callback(null,result);
          UserProfile.findOneAndUpdate({
            'email':msg.connection_email
        },
        {
            $pull:{'requests.receiverequest':msg.user_email}
        },
        {
            upsert:true,multi:true
        }).then((result)=> {
            console.log("Updated Document:",result);
            callback(null,result);

        },(err)=>{
            console.log(err);
            console.log("Error Creating Book");
            callback(null,[]);
        })
        },(err)=>{
            console.log(err);
            console.log("Error in Withdraw");
            callback(null,[]);
        })
     
            }

exports.handle_request = handle_request;