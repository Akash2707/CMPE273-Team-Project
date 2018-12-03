var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')

// for graph
var session = require('express-session')
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://ec2-3-17-8-206.us-east-2.compute.amazonaws.com:7687', neo4j.auth.basic('neo4j', '12345678'));
// graph end

    function handle_request(msg, callback){
        console.log("In handle request:"+ JSON.stringify(msg));


            // Request withdraw and remove relation called 'sent' and 'hasRequest'
            // graph start
            console.log(' My email : ', msg.user_email)
            console.log(' To withdraw request of : ', msg.connection_email)
                session = driver.session();
            // delete relationship called 'sent' 
            var data = []

            resultPromise = session.run(
                'match(n: User {email: $my}) -[r:sent]->(d: User {email: $others}) delete r',
                    {my : msg.user_email, others : msg.connection_email}
            )
            var resultPromise = session.run(
                'match(n: User {email: $others}) -[r:hasRequest]-> (d: User {email: $my}) delete r return d',
                    {my : msg.user_email, others : msg.connection_email}
            )
            
            resultPromise.then(result1 => {
                session.close();
                    console.log()
                
                data = result1.records
                    console.log(data)
                    callback(null,data)
                    
                driver.close();
            })
            // graph end
    }
exports.handle_request = handle_request;

/*
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

 // deleted due to graph  
// from 
            //     callback(null,result);
// to

            callback(null,result);

        },(err)=>{
            console.log(err);
            console.log("Error Creating document");
            callback(null,[]);
        })
        },(err)=>{
            console.log(err);
            console.log("Error in Withdraw");
            callback(null,[]);
        })
     
*/
           