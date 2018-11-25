var kafka = require('./../kafka/client');

module.exports.saveJob = function (req, res) {
    
    kafka.make_request('save_job', req.body, function (err, job) {       
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.json({
                status: 200,
                message: `Saved ${req.body.jobTitle} successfully`
            })
        }

    });
}

module.exports.checkSavedJob = function (req, res) {
    var data = {
      "userId": req.query.email,
      'jobId': req.query.jobId,
    }
    kafka.make_request('check_savedJob', data, function (err, jobSaved) {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        console.log(jobSaved)
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(jobSaved));
      }
  
    });
  }