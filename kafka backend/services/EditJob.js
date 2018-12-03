var { Jobs } = require('./../models/jobs');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    Jobs.findByIdAndUpdate({
        _id: msg.jobId
    }, { $set: msg }, function (err, doc) {
        if(err) {
            callback(err,[]);
        }
        else{
            callback(null,"Job edited successfully!");
        }
    })
}
exports.handle_request = handle_request;

