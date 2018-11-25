var { Jobs } = require('./../models/jobs');
var { mongoose } = require('../db/mongoose');

function handle_request(msg, callback){
    console.log(msg)
    var pageNo = msg.pageNo
    var size = 10
    var query = {}
    query.skip = size * (pageNo - 1)
    query.limit = size
    var jobDetail = {
        'city': {$regex: new RegExp(msg.state , "i")},
    }
    if(msg.jobType  != ""){
        jobDetail.employmentType = {$regex: new RegExp(msg.jobType , "i")}
    }
    if(msg.industry != ""){
        jobDetail.industry = {$regex: new RegExp(msg.industry , "i")}
    }
    if(msg.experience != ""){
        jobDetail.seniority = {$regex: new RegExp(msg.experience , "i")}
    }
    if(msg.jobTitle != ""){
        jobDetail.title = {$regex: new RegExp(msg.jobTitle , "i")}
    }
    
    Jobs.count(jobDetail,function(err, totalCount){
        if(err){
            console.log(err);
            callback(err,[]);
        }else{
            var totalPages = Math.ceil(totalCount / size)

            Jobs.find(jobDetail,{},query,function(err, jobs){
                if (err) {
                    console.log(err);
                    callback(err,[]);
                } else {
                    var response = {
                        "jobs": jobs,
                        "totalPages": totalPages
                    }
                    console.log(jobs)
                    callback(null,response);
                }
            })
        }
    })    
}
exports.handle_request = handle_request;
