var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')

// for graph
var session = require('express-session')
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://ec2-3-17-8-206.us-east-2.compute.amazonaws.com:7687', neo4j.auth.basic('neo4j', '12345678'));
// graph end

    function handle_request(msg, callback){

            // Request accepting and make relation called 'connected'
            // graph start
              console.log(' My email : ', msg.user_email)
              console.log(' Accepting request from : ', msg.connection_email)
        
            session = driver.session();
            // delete relationship called 'sent' 
            
            // delete connection from 'me' to 'other' 
            resultPromise = session.run(
                'match(n: User {email: $my}) -[r:connected]->(d:User {email: $others})  delete r',
                    {my : msg.user_email, others : msg.connection_email}
            )
            // delete connection from 'other' to 'me' 
            resultPromise = session.run(
                'match(n: User {email: $others})-[r:connected]->(d:User {email: $my}) delete r',
                    {my : msg.user_email, others : msg.connection_email}
            )
            var data = []
            resultPromise.then(result1 => {
                session.close();
                console.log()
                
            //   data = result1.records.get(0).properties
                data = result1.records
                console.log(data)
                callback(null,data)
                    
                driver.close();
            })
        }
            exports.handle_request = handle_request;
      