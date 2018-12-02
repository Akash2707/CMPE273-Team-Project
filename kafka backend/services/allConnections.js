var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')

// for graph
var session = require('express-session')
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://ec2-3-17-8-206.us-east-2.compute.amazonaws.com:7687', neo4j.auth.basic('neo4j', '12345678'));
// graph end

function handle_request(msg, callback){
    msg.email = 'ravan@gmail.com'
    console.log("In handle request:"+ JSON.stringify(msg));
    console.log(msg.email)
    console.log(msg.page)
    var pageNo = msg.page
    var size = 10
    var query = {}
    query.skip = size * (pageNo - 1)
    query.limit = size
    //var totalPages=0
 
   /* UserProfile.count({$and:[{email:{$ne:msg.email}},{email:{$regex:'^'+msg.q+'.*'}}]},
    function(err, totalCount){
        if(err){
            console.log(err);
            callback(err,[]);
        }else{
            totalPages = Math.ceil(totalCount / size)
        }})
   */
 
    UserProfile.find({
        email:msg.email 
    },{_id:1,'requests.connectionlistlist':1}, function (err, result) {
        if (err) {
            console.log(err);
            callback(err,[]);
        } else {
           // console.log(result[0].requests.connectionlistlist)
            console.log(result)
         //  console.log(k)

            // get all connections 
                // graph start
                console.log(' My email : ', msg.email)
                 session = driver.session();
                // hasRequest
                var resultPromise = session.run(
                    'match(n:User {email: $mail}),(d:User) where (n)-[:connected]->(d) return (d)',
                       {mail : 'jivan@gmail.com' } 
                )
                var data = []
                 resultPromise.then(result1 => {
                    session.close();
                     console.log()
                    var array = result1.records
                    
                    for(var i = 0 ; i < array.length; i++){
                        console.log(array[i].get(0).properties)
                        data.push(array[i].get(0).properties)
                    }
                    console.log(data)
                   callback(null,data)
                        
                    driver.close();
                })
                // graph end
 // changed due to graph
// from
        //   console.log(result)
        //  console.log(k)
        // callback(null,result[0].requests.connectionlistlist);
// to
          // callback(null,result[0].requests.connectionlistlist);

        }
    })
}

exports.handle_request = handle_request;