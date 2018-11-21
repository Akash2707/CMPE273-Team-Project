/*
function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));

    var sql = `select * from login where email='${msg.email}' AND password='${msg.password}'`;
    console.log(" fetch query : " + sql);

    conn.query(sql, function(err,result){
        if(err || user === ''){
            console.log(" Result = " + user)
            console.log(" Error = " + error)
            callback(null,[]);
        } else{ 
            console.log(" Result = " + user)
            callback(null,user);
        }
    })

    Users.findOne({
        email: msg.email,
        isRecruiter : { $eq : "false"}
    }, function (err, user) {
        if (err) {
            callback(msg,"Error in login");
        } else {
            if (user) {
                // Check if password matches
                crypt.compareHash(msg.password, user.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        console.log("Inside login",user);
                        callback(null,user);
                    } else {
                        callback(null,[]);
                    }   
                }, function (error) {
                    if (error) {
                        callback(null,[]);
                    }
                });
            } else {
                callback(null,[]);
            }
        }
    })          
}
*/


    /*
    console.log(' This is kafka backend login ... ')
    pool.getConnection(function(err,conn){
        if(err) {
           console.log("error connecting to mysql ... ");
           callback(err," Error in database connectivity ... ");
        }else {
            console.log("Connected to mysql ... ");
            var sql = `select * from login where email='${msg.email}' AND password='${msg.password}'`;
            console.log(" fetch query : " + sql);
         
            conn.query(sql, function(err,user){
               if(err || user === ''){
                   console.log(" Result = " + user)
                   console.log(" Error = " + error)
                   callback(null,[]);
               } else{ 
                   console.log(" Result = " + user)
                   callback(null,user);
               }
           })
       }  
   })               */


var crypt = require('../crypt');
var conn = require('../db/mysqlConnection')
var { Login } = require('../models/login')

function handle_request(msg, callback){

    var mail = msg.email.toLowerCase()

    Login.findOne({ 
       email : mail,
    }, function(err, user){
       if(err || user === ''){
           console.log(' Error : ' + error)
            callback(error," User does not exist ... ")
        } else if(user){
            // Check if password matches
            crypt.compareHash(msg.password, user.password, function (err, isMatch) {
                console.log(' The entered password and db : ', msg.password, ' ', user.password)
                if (isMatch && !err) {
                    console.log("Inside login",user);
                    callback(null,user);
                } else {
                    callback(null,"Email or Password does not match!");
                }   
            }, function (error) {
                if (error) {
                    callback(null,[]);
                }
            })
        } else{
            callback(null, "User does not exist ... ")
        }
    })
}
exports.handle_request = handle_request;
 

// dfgdg

/*
function handle_request(msg, callback){

    console.log(' This is kafka backend login ... ')
    
    var sql = `select * from login where email='${msg.email}' AND password='${msg.password}'`;
    console.log(" fetch query : " + sql);
    
    

    conn.query(sql, function(err,user){
        if(err || user === ''){
            console.log(" Result = " + user)
            console.log(" Error = " + error)
            callback(null,[]);
        } else{ 
            console.log(" Result = " + user)
            callback(null,user);
        }
    })
} */