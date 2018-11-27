var express = require('express');
var app = express();
var crypt = require('../crypt');
//var config = require('../config/settings');
var passport = require('passport');
var jwt = require('jsonwebtoken');
require('../config/passport')(passport);

var kafka= require('../kafka/client');
//done
module.exports.getpeople=function(req,res){
   //check this out
    console.log("here request:",req.query)
    var request={
        'email':req.query.email,
		'q':req.query.q
    }
    kafka.make_request('search_people',request,function(err,searchresults){
        if(err){
            console.log(err)
            res.status(400);
            res.send(err);
        }else{
            console.log(searchresults)
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(searchresults));
        }
    })
}

module.exports.getRecommendPeople=function(req,res){
    //check this out
     console.log("here request:",req.query)
     var request={
         'email':req.query.email,
         //'q':req.query.q
     }
     kafka.make_request('recommend_people',request,function(err,searchresults){
         if(err){
             console.log(err)
             res.status(400);
             res.send(err);
         }else{
             console.log(searchresults)
             res.writeHead(200,{'Content-Type':'application/json'});
             res.end(JSON.stringify(searchresults));
         }
     })
 }
 

//done
module.exports.sendrequest=function(req,res){
    console.log('sender_email',req.body.params.sender_email,
    'reciever_email',req.body.params.reciever_email)
    var request={
        'sender_email':req.body.params.sender_email,
        'reciever_email':req.body.params.reciever_email
    }
    kafka.make_request('sendrequest',request,function(err,result){
        if(err){
            res.status(400);
            res.send(err);
        }else{
            console.log(result)
            res.status(200);
            res.send('Successful send request!');
            
        }

    })
}

module.exports.getrequest=function(req,res){
    console.log(req)
    var request={
        'user_email':req.query.email
    }
    kafka.make_request('getallrequest',request,function(err,allrequests){
        if(err){
            res.status(400);
            res.send(err);
        }else{
            console.log(allrequests)
            res.status(200);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(allrequests));
        }
    })
}
module.exports.getsentrequest=function(req,res){
    console.log(req)
    var request={
        'user_email':req.query.email
    }
    kafka.make_request('getallsentrequest',request,function(err,allsentrequests){
        if(err){
            res.status(400);
            res.send(err);
        }else{
            console.log(allsentrequests)
            res.status(200);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(allsentrequests));
        }
    })
}


module.exports.acceptrequest=function(req,res){
    console.log(req)
    kafka.make_request('accept_request',req.body.params,function(err,result){
        if(err){
            res.status(400);
            res.send(err);
        }else{
            console.log(result)
            res.status(200);
            res.send('accepted');
        }
    })
}
module.exports.denyrequest=function(req,res){
    console.log(req)
    kafka.make_request('deny_request',req.body,function(err,result){
        if(err){
            res.status(400);
            res.send(err);
        }else{
            console.log(result)
            res.status(200);
            res.send('deny');
        }
    })
}
module.exports.withdrawrequest=function(req,res){
    console.log(req)

    kafka.make_request('withdraw_request',req.body.params,function(err,result){
        if(err){
            res.status(400);
            res.send(err);
        }else{
            console.log(result)
            res.status(200);
            res.send('withdraw');
        }
    })
}
module.exports.getConnections=function(req,res){
    console.log(req)
    kafka.make_request('all_connections',req.query,function(err,connection_result){
        if(err){
            res.status(400)
            res.send(err)
        }else{
            console.log(connection_result)
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(connection_result));
            
        }
    })
}
