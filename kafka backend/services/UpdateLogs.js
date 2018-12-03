var { mongoose } = require('../db/mongoose');
var { Logs } = require('./../models/Logs');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    Logs.findOneAndUpdate({
        jobId: msg.jobId,
        userId: msg.userId,
    }, { $set: msg  }, function (err, doc) {
        if(err) {
            callback(err,[]);
        }
        else if(!doc){
            var log = new Logs(msg)
            log.save(function(error){
                if(error){
                    callback(error,[]);
                }else{
                    callback(null,'logs updated successfully!')
                }
            })
        }
    })

    
}
exports.handle_request = handle_request;

