var kafka = require('./../kafka/client');

module.exports.getSavedApplicationGraph = function (req, res) {
    var data = {
      "recruiterId": req.query.email,
    }
    kafka.make_request('get_savedapplicationGraph', data, function (err, jobSaved) {
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

module.exports.updateJobCount = function (req, res){
    kafka.make_request('update_jobcount', req.body, function (err, jobSaved) {
        if (err) {
          res.status(400);
          res.send(err);
        } else {
          console.log(jobSaved)
          res.json({
            status: 200,
            message: `Count updated successfully`
            })
        }
    
      });
}

module.exports.getJobsViewCount = function (req, res){
    var data = {
        "recruiterEmail": req.query.email,
      }
      kafka.make_request('get_jobsViewCount', data, function (err, jobs) {
        if (err) {
          res.status(400);
          res.send(err);
        } else {
          console.log(jobs)
          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(jobs));
        }
    
      });
}

module.exports.getLessNoOfApplicants = function (req, res){
  var data = {
      "recruiterEmail": req.query.email,
    }
    kafka.make_request('get_lessNoOfApplicants', data, function (err, jobs) {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        console.log(jobs)
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(jobs));
      }
  
    });
}

module.exports.getJobsTitle = function (req, res){
  var data = {
      "recruiterEmail": req.query.email,
    }
    kafka.make_request('get_jobsTitle', data, function (err, jobs) {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        console.log(jobs)
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(jobs));
      }
  
    });
}

module.exports.getApplicantsByCity = function (req, res){
  var data = {
      "recruiterId": req.query.email,
      "jobId": req.query.jobId,
      "easyApply": req.query.easyApply
    }
    kafka.make_request('get_applicantsByCity', data, function (err, jobs) {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        console.log(jobs)
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(jobs));
      }
  
    });
}

module.exports.updateLogs = function (req, res){
  kafka.make_request('update_logs', req.body, function (err, logsSaved) {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        console.log(logsSaved)
        res.json({
          status: 200,
          message: `logs updated successfully`
          })
      }
  
    });
}

module.exports.getTraceUsers = function (req, res){
  
    kafka.make_request('get_traceUsers', req.query, function (err, jobs) {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        console.log(jobs)
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(jobs));
      }
  
    });
}

module.exports.getTopTenNoOfApplicants = function (req, res){
  var data = {
      "recruiterEmail": req.query.email,
    }
    kafka.make_request('get_topTenNoOfApplicants', data, function (err, jobs) {
      if (err) {
        res.status(400);
        res.send(err);
      } else {
        console.log(jobs)
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(jobs));
      }
  
    });
}