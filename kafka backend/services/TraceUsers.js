var crypt = require('./../crypt');
var { mongoose } = require('.././db/mongoose');
var { Logs } = require('.././models/Logs');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
        console.log(msg)
        Logs.aggregate([  
            { $match: {jobId: msg.jobId, location: msg.location}},
            { $group: {_id: '$activity', total: { $sum: 1 }} }
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
exports.handle_request = handle_request;