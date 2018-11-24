var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile } = require('../models/UserProfile')
var {Users } = require('../models/User')
var conn = require('../db/mysqlConnection')

function handle_request(msg, callback){
 
    console.log(" in handle request : "+ JSON.stringify(msg));
    var today = new Date();

    Users.findOne({
        email : msg.email
    }, function(err, user){
        if(err || user === ''){
            console.log(" Error in Signup or user is already exist ... = " + err)
            callback(err," Error in Singnup or user is already exist ... ");
        } else if(user){
            console.log("Email address is already in use.")
            callback(err,"Email address is already in use.");  
        }else {
                console.log(' The input password ... ', msg.password )
                crypt.createHash(msg.password, function(pass){       

                    var mail = msg.email.toLowerCase()

                    var theUser = new Users({
                        fName : msg.fname,
                        lName : msg.lname,
                        email : mail,
                        password : pass,
                        isRecruiter : msg.isRecruiter,
                        created_at : today,
                        updated_at : today
                    });

                 /*   var sql = `insert into login values(null, '${msg.email}', '${pass}', '${flag}')`;
                    console.log(' insert query : ' + sql);
                    
                    conn.query(sql, function(err,result){
                        console.log(err, ' ', result)
                    })      */

                    var profile = new UserProfile({
                        fName : msg.fname,
                        lName : msg.lname,
                        email : mail,
                        isRecruiter : msg.isRecruiter
                    })

                    theUser.save().then((user) => {
                        profile.save();
                        console.log( " Final try " + user);
                        callback(null,user)
                    })
                }, (err) => {
                    callback(err,[])
                    })
            }       
    })
} 


/*
function handle_request(msg, callback){
 
    console.log(" in handle request : "+ JSON.stringify(msg));
    var today = new Date();


            Profile.findOne({
                email : msg.email
            }, function(err, user){
            if(err){
                console.log(" Error in Login = " + err)
                callback(err," Error in Login ");
            } else {
                if(user){
                    console.log(" Email address is already in use.")
                    callback(null, "Email address is already in use.");
                } else{
                //  crypt.createHash(msg.password, function(pass){
                    console.log(' Can be made new account ... ')
                    var flag = false;
                    if(msg.recruiter == "yes")
                        flag = true;
    
                    var sql = `insert into login values(null, '${msg.email}', '${msg.password}', '${flag}')`;
                    console.log(' insert query : ' + sql);
                    
                    conn.query(sql, function(err,result){
                        if(err || result === ' '){
                            console.log(" result " + result);
                            console.log(" error " + err);
                            callback(err," Error in Server");
                        } else{
                                
                            var profile = new Profile({
                                fname : msg.fname,
                                lname : msg.lname,
                                email : msg.email,
                                password : password,
                                isRecruiter : flag,
                                created_at : today,
                                updated_at : today
                            })
    
                            profile.save().then( (user) => {
                                console.log(" user from profile : " + user)
                                callback(null,user)
                            }, (err) => {
                                callback(err,[])
                            })
                        }
                    })  
                    // })
                }       
                }
            })
} */

exports.handle_request = handle_request;