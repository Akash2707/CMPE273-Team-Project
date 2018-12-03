var crypt = require('./../crypt');
var { mongoose } = require('.././db/mongoose');
var { Jobs } = require('.././models/jobs');

function handle_request(msg, callback) {
    console.log("In handle request:" + JSON.stringify(msg));
    Jobs.find({
        recruiterEmail: msg.recruiterEmail
    },['_id','title','allowEasyApply'], function (err, data) {
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