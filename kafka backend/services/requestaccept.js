var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')


    function handle_request(msg, callback){
        console.log("In handle request:"+ JSON.stringify(msg));
      
        UserProfile.findOneAndUpdate({
            'email':msg.user_email
        },
        {
            $push:{'requests.connectionlistlist':msg.connection_email},$pull:{'requests.receiverequest':{$in:[msg.connection_email]}}
        },
       
        {
            upsert:true,
            multi:true
        }).then((result)=> {
            //console.log("Updated Document:",result);
            UserProfile.findOneAndUpdate({
                'email':msg.connection_email
            },
            {
                $push:{'requests.connectionlistlist':msg.user_email},$pull:{'requests.sendrequest':{$in:[msg.user_email]}}
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
            .catch((err) => {
                callback(err,[])
            })
            //callback(null,result);

        },(err)=>{
            console.log(err);
            console.log("Error Creating Book");
            callback(null,[]);
        })
      
      /*  PeopleConnect.findOneAndUpdate({
            'email':msg.user_email
        },
        {
            $push:{'requests.connectionlistlist':msg.connection_email}
            //$pull:{'resquests.receivetrquest':msg.connection_email}
        },
        {
            upsert:true
        }).then((result)=> {
            console.log("Updated Document:",result);
            PeopleConnect.findOneAndUpdate({
                'email':msg.user_email
            },
            {
                $pull:{'requests.receiverequest':{$in:[msg.connection_email]}}
                //$pull:{'requests.sendrequest':msg.user_email,}
              //  $push:{'requests.connectionlistlist':msg.user_email}
            },
            {
                upsert:true
            }).then((result)=> {
                console.log("Updated Document:",result);
                PeopleConnect.findOneAndUpdate({
                    'email':msg.connection_email
                },
                {
                   // $pull:{'resquests.receivetrquest':msg.connection_email}
                    $pull:{'requests.sendrequest':{$in:[msg.user_email]}}
                  //  $push:{'requests.connectionlistlist':msg.user_email}
                },
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
        }*/
                   /* console.log("Updated Document:",result);
                    PeopleConnect.findOneAndUpdate({
                        'email':msg.connection_email
                    },
                    {
                       // $pull:{'resquests.receivetrquest':msg.connection_email}
                        //$pull:{'requests.sendrequest':msg.user_email,}
                       $push:{'requests.connectionlistlist':msg.user_email}
                    },
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
                    //callback(null,result);
        
                },(err)=>{
                    console.log(err);
                    console.log("Error Creating Book");
                    callback(null,[]);
                })
                //callback(null,result);
    
            },(err)=>{
                console.log(err);
                console.log("Error Creating Book");
                callback(null,[]);
            })
            //callback(null,result);

        },(err)=>{
            console.log(err);
            console.log("Error Creating Book");
            callback(null,[]);
        })*/
        /*PeopleConnect.updateOne({'email':msg.sender_email},{$push:{'requests.sendrequest':msg.reciever_email}}, function (err, result) {
            if (err) {
                console.log(err);
                callback(err,[]);
            } else {
                PeopleConnect.updateOne({'email':msg.receiver_email},{$push:{'requests.receiverequest':msg.sender_email}}, function (err, result) {
                    if (err) {
                        console.log(err);
                        callback(err,[]);
                    } else {
                        console.log(result)
                        callback(null,result);
            
                    }
                })
            }
        })*/


}

exports.handle_request = handle_request;