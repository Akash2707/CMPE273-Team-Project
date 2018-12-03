var { SavedJob } = require('./../models/Savedjob');
var { mongoose } = require('../db/mongoose');

function handle_request(data, callback){
    console.log(data)
    var pageNo = data.pageNo
    var size = 10
    var query = {}
    query.skip = size * (pageNo - 1)
    query.limit = size

    var savedJob = {
        'userId': data.email,
    }
    SavedJob.count(savedJob,function(err, totalCount){
        if(err){
            console.log(err);
            callback(err,[]);
        }else{
            var totalPages = Math.ceil(totalCount / size)

            SavedJob.find(savedJob,{},query,function(err, jobs){
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