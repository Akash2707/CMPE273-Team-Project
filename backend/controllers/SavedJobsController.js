var kafka = require('./../kafka/client');

module.exports.getSaveJobs = function (req, res) {
    var data = {
        "email": req.query.email,
         'pageNo': req.query.pageNo,
    }

    kafka.make_request('get_saved_jobs', data, function (err, savedJobs) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            // client.setex(`jobs:${req.query.state}`, 3600, JSON.stringify({ source: 'Redis Cache', ...jobs, }));
            console.log(savedJobs)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(savedJobs));
        }

    })
}