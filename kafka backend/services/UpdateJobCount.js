var { Jobs } = require('./../models/jobs');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    Jobs.findOneAndUpdate({
        _id: msg.jobId
    }, { $inc: {totalViews: 1}  }, function (err, doc) {
        if(err) {
            callback(err,[]);
        }
        else{
            callback(null,"Job view increased successfully!");
        }
    })

    
}
exports.handle_request = handle_request;

