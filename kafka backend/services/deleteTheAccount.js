var connection = require('../db/connection')
var { UserProfile } = require('../models/UserProfile')
var {EasyApply } = require('../models/EasyApply')
var {JobApplication } = require('../models/jobApplicantion')
var { SavedJob } = require('../models/Savedjob')

// for graph
var session = require('express-session')
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://ec2-3-17-8-206.us-east-2.compute.amazonaws.com:7687', neo4j.auth.basic('neo4j', '12345678'));
// graph end

function handle_request(msg, callback){

    var toDelete = msg.email
    console.log(' Delete ', toDelete)
    
    connection.query('DELETE FROM users WHERE email = ?',[toDelete], function (error, results) {
        if (error) {
            callback(error," Error while delete an account ... ")  
        }else{
            UserProfile.deleteOne({
                email:toDelete
            }, function(err,result){
                if(err){
                    callback(error," Error while delete an account ... ")  
                } else{

                    EasyApply.deleteOne({
                        applicantId : toDelete
                    }, function(err,result1){

                    })

                    JobApplication.deleteOne({
                        applicantId : toDelete
                    }, function(err,result2){

                    })

                    SavedJob.deleteOne({
                        userId : toDelete
                    },function(err,result3){

                    })

                    session = driver.session();

                    var resultPromise = session.run(
                        'match(n:User {email: $id}) DETACH delete n',
                           {id : toDelete } 
                    )
                     resultPromise.then(result12 => {
                        session.close();
                        
                    //    console.log(result12)
                        console.log('The account deleted successfully')
                        callback(null, results)
                            
                        driver.close();
                    })
                } 
            })
        }
    })
}
exports.handle_request = handle_request;
 
