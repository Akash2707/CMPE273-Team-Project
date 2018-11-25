var { SavedJob } = require('./../models/Savedjob');

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    
    var alreadySaved = {
        'jobId': msg.jobId,
        'userId': msg.userId
    }

    SavedJob.find(alreadySaved,{_id:1},function(err, jobs){
        if (err) {
            console.log(err);
            callback(err,[]);
        } else {
            console.log(jobs)
            if(jobs.length != 0){
                var response = {
                    "saved": true,
                }
            } else{
                var response = {
                    "saved": false,
                }
            }
            callback(null,response);
        }
    })
}
exports.handle_request = handle_request;