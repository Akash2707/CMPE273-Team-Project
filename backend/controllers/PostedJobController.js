var kafka = require('./../kafka/client');

module.exports.getPostedJobs = function (req, res) {
    var data = {
        "email": req.query.email,
         'pageNo': req.query.pageNo,
    }

    kafka.make_request('get_posted_jobs', data, function (err, postedJobs) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            // client.setex(`jobs:${req.query.state}`, 3600, JSON.stringify({ source: 'Redis Cache', ...jobs, }));
            console.log(postedJobs)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(postedJobs));
        }

    })
}

module.exports.getApplicants = function (req, res) {
    var data = {
        "email": req.query.email,
        'pageNo': req.query.pageNo,
        '_id': req.query.id,
        'allowEasyApply': req.query.allowEasyApply
    }

    kafka.make_request('get_applicants', data, function (err, applicants) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            // client.setex(`jobs:${req.query.state}`, 3600, JSON.stringify({ source: 'Redis Cache', ...jobs, }));
            console.log(applicants)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(applicants));
        }

    })
}