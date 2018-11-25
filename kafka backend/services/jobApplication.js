var { JobApplication } = require('./../models/jobApplicantion')

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    var addJobApply = new JobApplication(msg)

    addJobApply.save().then((application) => {
        callback(null,"Job added successfully!");
    }, (err) => {
        callback(err,[]);
    })
}
exports.handle_request = handle_request;
