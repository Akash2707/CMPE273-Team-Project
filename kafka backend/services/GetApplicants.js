var { EasyApply } = require('./../models/EasyApply');
var { JobApplication } = require('./../models/jobApplicantion');
var { mongoose } = require('../db/mongoose');

function handle_request(data, callback){
    console.log(data)
    var pageNo = data.pageNo
    var size = 10
    var query = {}
    query.skip = size * (pageNo - 1)
    query.limit = size

    var id = {
        'jobId': data._id,
    }
    if(data.allowEasyApply == 'true'){
        EasyApply.count(id,function(err, totalCount){
            if(err){
                console.log(err);
                callback(err,[]);
            }else{
                var totalPages = Math.ceil(totalCount / size)
    
                EasyApply.find(id,{},query,function(err, applications){
                    if (err) {
                        console.log(err);
                        callback(err,[]);
                    } else {
                        var response = {
                            "applications": applications,
                            "totalPages": totalPages
                        }
                        console.log(applications)
                        callback(null,response);
                    }
                })
            }
        }) 
    }else{
        JobApplication.count(id,function(err, totalCount){
            if(err){
                console.log(err);
                callback(err,[]);
            }else{
                var totalPages = Math.ceil(totalCount / size)
    
                JobApplication.find(id,{},query,function(err, applications){
                    if (err) {
                        console.log(err);
                        callback(err,[]);
                    } else {
                        var response = {
                            "applications": applications,
                            "totalPages": totalPages
                        }
                        console.log(applications)
                        callback(null,response);
                    }
                })
            }
        }) 
    }
}
exports.handle_request = handle_request;