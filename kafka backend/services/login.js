var crypt = require('../crypt');
var connection = require('../db/connection')
var { Users } = require('../models/User')

function handle_request(msg, callback){

    // var mail = msg.email.toLowerCase()

    connection.query('SELECT * FROM users WHERE email = ?',[msg.email], function (error, results, fields) {
        if (error) {
            callback(error," User does not exist ... ")  
        }else{
          if(results.length >0){
            crypt.compareHash(msg.password, results[0].password, function (err, isMatch) {
                console.log(' The entered password and db : ', msg.password, ' ', results[0].password)
                if (isMatch && !err) {
                    console.log("Inside login",results[0]);
                    callback(null,results[0]);
                } else {
                    callback(null,"Email or Password does not match!");
                }   
            }, function (error) {
                if (error) {
                    callback(null,[]);
                }
            })           
          }
          else{
            callback(error," User does not exist ... ")
          }
        }
      });
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