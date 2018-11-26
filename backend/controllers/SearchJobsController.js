var kafka = require('./../kafka/client');
const redis = require('redis');
const client = redis.createClient({
    port : 6379,
    host : "3.16.242.224"
});
client.on('error', (err) => {
    console.log("Error " + err);
});

module.exports.getJobs = function (req, res) {
    var data = {
        "email": req.query.email,
        'pageNo': req.query.pageNo,
        'state': req.query.state,
        'jobType': req.query.jobType,
        'experience': req.query.experience,
        'jobTitle': req.query.jobTitle,
        'industry': req.query.industry
    }
    client.get(`jobs:${req.query.state}`, (err, result) => {
        // If that key exist in Redis store
        if (result) {
            console.log("if");
            const resultJSON = JSON.parse(result);
            return res.status(200).json(resultJSON);
        } else {
            kafka.make_request('get_jobs', data, function (err, jobs) {
                if (err) {
                    res.status(400);
                    res.send(err);
                } else {
                    client.setex(`jobs:${req.query.state}`, 3600, JSON.stringify({ source: 'Redis Cache', ...jobs, }));
                    console.log(jobs)
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify(jobs));
                }

            })
        }
    })
}