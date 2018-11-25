var kafka = require('./../kafka/client');

module.exports.getJobs = function (req, res) {
    var data = {
        "email" : req.query.email,
        'pageNo': req.query.pageNo,
        'state': req.query.state,
        'jobType': req.query.jobType,
        'experience': req.query.experience,
        'jobTitle': req.query.jobTitle,
        'industry': req.query.industry
    }
    kafka.make_request('get_jobs', data, function (err, jobs) {       
        if (err) {
            res.status(400);
            res.send(err);
        }else{
            console.log(jobs)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(jobs));
        }

    });
}