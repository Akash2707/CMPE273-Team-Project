var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')

// for graph
var session = require('express-session')
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://ec2-3-17-8-206.us-east-2.compute.amazonaws.com:7687', neo4j.auth.basic('neo4j', '12345678'));
// graph end

    function handle_request(msg, callback){
        //console.log("In handle request:"+ JSON.stringify(msg));

        UserProfile.findOneAndUpdate({
            // 'email':msg.user_email
            'email' : 'jivan@gmail.com'
        },
        {
            $push:{'requests.connectionlistlist':'ravan@gmail.com'},$pull:{'requests.receiverequest':{$in:['ravan@gmail.com']}}
        },
       
        {
            upsert:true,
            multi:true
        }).then((result)=> {
            //console.log("Updated Document:",result);
            UserProfile.findOneAndUpdate({
              //  'email':msg.connection_email
              'email' : 'ravan@gmail.com'
            },
            {
                $push:{'requests.connectionlistlist':'jivan@gmail.com'},$pull:{'requests.sendrequest':{$in:['jivan@gmail.com']}}
            },
        
            {
                upsert:true,multi:true
            }).then((result)=> {
                console.log("Updated Document:",result);

                
               // Request accepting and make relation called 'connected'
                // graph start
              //  console.log(' My email : ', msg.user_email)
              //  console.log(' Accepting request from : ', msg.connection_email)
                sender = 'jivan@gmail.com'
                recevier = 'ravan@gmail.com'
                 session = driver.session();
                // delete relationship called 'sent' 
                var resultPromise = session.run(
                    'match(n: User {email: $my}) -[r:sent]-> (d: User {email: $others}) delete r',
                        {my : sender, others : recevier}
                )
                // delete relationship called 'hasRequest' 
                resultPromise = session.run(
                    'match(n: User {email: $others}) -[r:hasRequest]->(d: User {email: $my}) delete r',
                        {my : sender, others : recevier}
                )
                // create connection from 'me' to 'other' 
                resultPromise = session.run(
                    'match(n: User {email: $my}),(d:User {email: $others})  Create (n)-[:connected]->(d) return d',
                        {my : sender, others : recevier}
                )
                // create connection from 'other' to 'me' 
                resultPromise = session.run(
                    'match(n: User {email: $others}),(d:User {email: $my})  Create (n)-[:connected]->(d)',
                        {my : sender, others : recevier}
                )
                var data = []
                 resultPromise.then(result1 => {
                    session.close();
                     console.log()
                    
                 //   data = result1.records.get(0).properties
                    data = result1.records
                     console.log(data)
                 //    callback(null,data)
                        
                    driver.close();
                })
                // graph end
                // deleted for graph from
               // callback(null,result);
                // to                

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