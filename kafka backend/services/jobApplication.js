var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { JobApplication } = require('./../models/jobApplicantion')


    function handle_request(data, callback){
        console.log("In handle request:"+ JSON.stringify(data));
        var addJobApply = new JobApplication(data)
        addJobApply.save()
        .then((response) => {
            callback(null, response);
        },(err) => {
            callback(null, "Error in Job Application");
        })
        
}

exports.handle_request = handle_request;