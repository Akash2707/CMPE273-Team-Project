var crypt = require('./../crypt');
var { mongoose } = require('.././db/mongoose');
var { EasyApply } = require('.././models/EasyApply');
var { JobApplication } = require('.././models/jobApplicantion');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    if(msg.easyApply == 'true'){
        EasyApply.aggregate([  
            { $match: {jobId: msg.jobId}},
            { $group: {_id: '$address', total: { $sum: 1 }} }
        ], function (err, data) {
            if (err) {
                callback(msg, "Some error with the query");
                console.log("Some error with the query");
            } else {
                if (data) {
                    callback(null, data)
                } else {
                    callback(null, [])
                }
            }
        });
    }else{
        JobApplication.aggregate([  
            { $match: {jobId: msg.jobId}},
            { $group: {_id: '$address', total: { $sum: 1 }} }
        ], function (err, data) {
            if (err) {
                callback(msg, "Some error with the query");
                console.log("Some error with the query");
            } else {
                if (data) {
                    callback(null, data)
                } else {
                    callback(null, [])
                }
            }
        });
    }
    
}
exports.handle_request = handle_request;