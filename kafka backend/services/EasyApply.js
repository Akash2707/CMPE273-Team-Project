var { EasyApply } = require('./../models/EasyApply');
var { Jobs } = require('./../models/jobs'); 

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    var easyApply = new EasyApply(msg);

    easyApply.save().then((application) => {
        Jobs.findOneAndUpdate({
            _id: msg.jobId
        }, { $inc: {totalApplicants: 1}  }, function (err, doc) {
            if(err) {
                callback(err,[]);
            }
            else{
                callback(null,"Job applied successfully!");
            }
        })
    }, (err) => {
        callback(err,[]);
    })
}
exports.handle_request = handle_request;

