var crypt = require('./../crypt');
var { mongoose } = require('.././db/mongoose');
var { Jobs } = require('.././models/jobs');

function handle_request(msg, callback) {
    console.log("In handle request1234:" + JSON.stringify(msg));
    Jobs.aggregate([
        {$sort: {totalApplicants: -1}},
        {$match: {recruiterEmail: msg.recruiterEmail}},
        {$limit: 10},
        {$project: {title: 1, totalApplicants: 1}}
    ], function (err, data) {
        if (err) {
            callback(msg, "Some error with the query");
            console.log("Some error with the query");
        } else {
            console.log(data)
            if (data) {
                callback(null, data)
            } else {
                callback(null, [])
            }
        }
    });
}
exports.handle_request = handle_request;