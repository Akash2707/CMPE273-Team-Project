var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')

var session = require('express-session')
const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver('bolt://ec2-3-17-8-206.us-east-2.compute.amazonaws.com:7687', neo4j.auth.basic('neo4j', '12345678'));

    function handle_request(msg, callback){

        console.log("In handle request:"+ JSON.stringify(msg));
        session = driver.session();
        var data = []
        var resultPromise = session.run(
            'match(n: User), (p: User {email : $mail}) where n.location = p.location and n.email <> p.email return (n)',
                {mail : msg.email } 
        )
                resultPromise.then(result => {
                session.close();
                console.log()
                var array = result.records
                console.log()
                for(var i = 0 ; i < array.length; i++){
                   console.log(array[i].get(0).properties)
                    data.push(array[i].get(0).properties)
                }
                console.log(data)
                callback(null,data)
                driver.close();
        })
       
        /*
        console.log(msg.q)
     UserProfile.find({
            email:msg.email
           // email:{$regex:'^'+msg.q+'.*'}
        }, function (err, result) {
            if (err) {
                console.log(err);
                callback(err,[]);
            } else {
                console.log(result)
    
UserProfile.find({$and:[{email:{$ne:msg.email}},{email:{$regex:'^'+msg.q+'.*'}}]}
, function (err, searchresult) {
    if (err) {
        console.log(err);
        callback(err,[]);
    } else {
        console.log(searchresult)
        callback(null,searchresult);

    }
})       
            }
        })
        */
}

exports.handle_request = handle_request;