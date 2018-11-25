var { JobApplication } = require('./../models/jobApplicantion')

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    
    var alreadyApplied = {
        'jobId': msg.jobId,
        'applicantId': msg.applicantId
    }
    // db.inventory.find( { status: "A" }, { item: 1, status: 1, _id: 0 } )
    JobApplication.find(alreadyApplied,{_id:1},function(err, jobs){
        if (err) {
            console.log(err);
            callback(err,[]);
        } else {
            console.log(jobs)
            if(jobs.length != 0){
                var response = {
                    "applied": true,
                }
            } else{
                var response = {
                    "applied": false,
                }
            }
            callback(null,response);
        }
    })
}
exports.handle_request = handle_request;