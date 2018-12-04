var crypt = require('./../crypt');
var { mongoose } = require('.././db/mongoose');
var { UserProfile } = require('.././models/UserProfile');

// for graph
var session = require('express-session')
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://ec2-3-17-8-206.us-east-2.compute.amazonaws.com:7687', neo4j.auth.basic('neo4j', '12345678'));
// graph end

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg.profilePhoto));

    UserProfile.findOneAndUpdate({ "email": msg.email }, { $set : { "profilePhoto": msg.profilePhoto } }, function (error, user, fields) {
        if (error) {
            callback(msg,"Some error with the query");
            console.log("Some error with the query");
        } else {
            console.log(' My email : ', msg.email)
            session = driver.session(); 
                
            var resultPromise = session.run(
                'match(n: User {email: $my}) SET n.imageUrl = $image',
                    {my : msg.email, image : msg.profilePhoto}
            )
            
            resultPromise.then(result => {
                session.close();
                console.log(result)
                callback(null,user)
                    
                driver.close();
            })
        }
    });
}
exports.handle_request = handle_request;
