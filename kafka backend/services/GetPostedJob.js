var { Jobs } = require('./../models/jobs');
var { mongoose } = require('../db/mongoose');

function handle_request(data, callback){
    console.log(data)
    var pageNo = data.pageNo
    var size = 10
    var query = {}
    query.skip = size * (pageNo - 1)
    query.limit = size

    var email = {
        'recruiterEmail': data.email,
    }
    Jobs.count(email,function(err, totalCount){
        if(err){
            console.log(err);
            callback(err,[]);
        }else{
            var totalPages = Math.ceil(totalCount / size)

            Jobs.find(email,{},query,function(err, jobs){
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