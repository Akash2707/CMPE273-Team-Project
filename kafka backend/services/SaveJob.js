var { SavedJob } = require('./../models/Savedjob');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    var saveJob = new SavedJob(msg);

    saveJob.save().then((application) => {
        callback(null,"Job saved successfully!");
    }, (err) => {
        callback(err,[]);
    })
}
exports.handle_request = handle_request;

