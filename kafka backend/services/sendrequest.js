var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')

var session = require('express-session')
const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://ec2-3-17-8-206.us-east-2.compute.amazonaws.com:7687', neo4j.auth.basic('neo4j', '12345678'));



// for graph
var session = require('express-session')
const neo4j = require('neo4j-driver').v1;
 const driver = neo4j.driver('bolt://ec2-3-17-8-206.us-east-2.compute.amazonaws.com:7687', neo4j.auth.basic('neo4j', '12345678'));
 // graph end

    function handle_request(msg, callback){

    //    msg.sender_email = 'jivan@gmail.com',
    //    msg.reciever_email = 'ravan@gmail.com'

        console.log("In handle request:"+ JSON.stringify(msg));

        // make connection send relationships
            // graph start
            console.log(' sender and receiver ', msg.sender_email + ' ' + msg.reciever_email)

            session = driver.session();
            // sent
            var resultPromise = session.run(
                'match(n:User {email: $send}),(d:User {email: $receive})  Create(n)-[:sent]-> (d) return n,d',
                    {send : msg.sender_email, receive : msg.reciever_email }
            )

            // hasRequest
            resultPromise = session.run(
                'match(n:User {email: $receive}),(d:User {email: $send})  Create(n)-[:hasRequest]-> (d) return n,d',
                    {send : msg.sender_email, receive : msg.reciever_email }
            )
            resultPromise.then(result1 => {
                session.close();

                console.log(result1)

                callback(null,result1);

                driver.close()

            })
        //    callback(null,result);

            // graph end
    }
exports.handle_request = handle_request;
        /*
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
        */


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
