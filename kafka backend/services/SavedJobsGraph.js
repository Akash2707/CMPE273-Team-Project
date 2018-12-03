var crypt = require('./../crypt');
var { mongoose } = require('.././db/mongoose');
var { SavedJob } = require('.././models/Savedjob');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    SavedJob.aggregate([  
        { $match: {recruiterId: msg.recruiterId}},
        { $group: {_id: '$title', total: { $sum: 1 }} }
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