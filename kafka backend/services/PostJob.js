var { Jobs } = require('./../models/jobs');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    var jobs = new Jobs(msg);

    jobs.save().then((job) => {
        callback(null,"Job added successfully!");
    }, (err) => {
        callback(err,[]);
    })
}
exports.handle_request = handle_request;

