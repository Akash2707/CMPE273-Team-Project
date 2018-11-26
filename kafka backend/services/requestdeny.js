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
                'requests.receiverequest':msg.connection_email
            }
        }, {_id:0,'email':1,'requests.connectionlistlist':1,'requests.sendrequest':1,'requests.receiverequest':1},
        {
            upsert:true
        }).then((result)=> {
            console.log("Updated Document:",result);
            callback(null,result);

        },(err)=>{
            console.log(err);
            console.log("Error Creating Book");
            callback(null,[]);
        })
     
            }

exports.handle_request = handle_request;