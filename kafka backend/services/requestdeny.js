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

         // Request deny and remove relation called 'sent' and 'hasRequest'
                // graph start
                console.log(' My email : ', msg.user_email)
                console.log(' To deny request of : ', msg.connection_email)
                 session = driver.session(); 
                var data = []
                resultPromise = session.run(
                    'match(n: User {email: $my}) -[r:hasRequest]->(d: User {email: $others}) delete r',
                        {my : msg.user_email, others : msg.connection_email}
                )
                var resultPromise = session.run(
                    'match(n: User {email: $others}) -[r:sent]-> (d: User {email: $my}) delete r return d',
                        {my : msg.user_email, others : msg.connection_email}
                )
               
                resultPromise.then(result1 => {
                    session.close();
                     console.log()
                    
                 //   data = result1.records.get(0).properties
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
     
*/
