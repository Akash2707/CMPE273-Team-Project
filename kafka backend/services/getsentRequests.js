var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')


    function handle_request(msg, callback){
        console.log("In handle request:"+ JSON.stringify(msg));
        UserProfile.find({
            email:msg.user_email 
        },{_id:0,'requests.sendrequest':1}, function (err, result) {
            if (err) {
                console.log(err);
                callback(err,[]);
            } else {
                console.log(result[0].requests.sendrequest)
             //   k=[]
               // k=k.concat(result[0].requests.sendrequest)
              //  for(a in result){
             // console.log(result[a].email)
                 //   k.push(result[a].email)
               // }
               //console.log(k)
                /*PeopleConnect.find({$and:[{email:{$nin:k }},{email:{$ne:msg.email }}]
                   },{_id:0,email:1}, function (err, result) {
                       if (err) {
                           console.log(err);
                           callback(err,[]);
                       } else {*/
                           console.log(result)
                           
                           callback(null,result[0].requests.sendrequest);
               
                       }
                   })
               // callback(null,result);
    
            }
        //})  
        /*     console.log("In handle request:"+ JSON.stringify(msg));
        PeopleConnect.updateOne({
         email:msg.user_email   
        },{$push:{'requests.connectionlistlist':msg.connection_email}}, function (err, result) {
            if (err) {
                console.log(err);
                callback(err,[]);
            } else {
                console.log(result)
                PeopleConnect.updateOne({
                    email:msg.connection_email   
                   },{$push:{'requests.connectionlistlist':msg.user_email}}, function (err, result) {
                       if (err) {
                           console.log(err);
                           callback(err,[]);
                       } else {
                           console.log(result)
                           callback(null,result);
               
                       }
                   })
    
            }
        })
*/
    //}

exports.handle_request = handle_request;