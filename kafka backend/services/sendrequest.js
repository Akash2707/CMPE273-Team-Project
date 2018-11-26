
var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')


    function handle_request(msg, callback){
        console.log("In handle request:"+ JSON.stringify(msg));
        UserProfile.findOneAndUpdate({
            'email':msg.sender_email
        },
        {
            $push:
            {
                'requests.sendrequest':msg.reciever_email
            }
        },
        {
            upsert:true
        }).then((result)=> {
            console.log("Updated Document:",result);
            UserProfile.findOneAndUpdate({
                'email':msg.reciever_email
            },
            {
                $push:
                {
                    'requests.receiverequest':msg.sender_email
                }
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
            }).catch((err)=>{
                console.log(err)
            })
            //callback(null,result);

        },(err)=>{
            console.log(err);
            console.log("Error Creating Book");
            callback(null,[]);
        })
     /*   PeopleConnect.update({'email':msg.sender_email},{$push:{'requests.sendrequest':msg.reciever_email}},{multi:true})
        .then((err)=>{
           
            console.log(err);
                callback(err,[]);
        },
        (u)=>{
            console.log('here1',msg.receiver_email,msg.sender_email)
                PeopleConnect.update({'email':msg.receiver_email},{$push:{'requests.receiverequest':msg.sender_email}})
                .then((err)=>{
                    console.log(err);
                    callback(err,[]);

                },
                (m)=>{
                    
                        console.log('here',u,m)
                        callback(null,m);

                    
                })
            
                   
            })
            */

            }

exports.handle_request = handle_request;