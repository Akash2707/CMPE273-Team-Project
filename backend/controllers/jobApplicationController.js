const multer = require('multer');
const multerS3 = require('multer-s3');
var kafka = require('./../kafka/client');
var AWS = require('aws-sdk');
var path = require('path');
var awsCredFile = path.join(__dirname, './../', 'configuration.json');
AWS.config.loadFromPath(awsCredFile);
exports.jobApply = function (req, res) {
  let resumeName;
  var s3 = new AWS.S3();
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'linkedin-bucket',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        console.log(file);
        var name = Date.now() + '-' + file.originalname
        resumeName = `http://localhost:3001/resume/${name}`
        cb(null, name); //use Date.now() for unique file keys
      }
    })
  })
  const singleUpload = upload.single('resume')

  singleUpload(req, res, (err) => {
    /*Now do where ever you want to do*/
    if (err) {
      return res.status(400).send(err);
    }
    else {
      var today = new Date();
      var job = {
        "applicantId": req.query.email,
        "jobId": req.body.jobId,
        "jobCompanyName": req.body.jobCompanyName,
        "jobCompanyLogo": req.body.jobCompanyLogo,
        "jobLocation": req.body.jobLocation,
        "jobTitle": req.body.jobTitle,
        "fName": req.body.fName,
        "lName": req.body.lName,
        "email": req.body.email,
        "phone": req.body.phone,
        "resume": resumeName,
        "companyName": req.body.companyName,
        "linkedInUrl": req.body.linkedInUrl,
        "gitWebUrl": req.body.gitWebUrl,
        "address": req.body.address,
        "hearAboutUs": req.body.hearAboutUs,
        "sponsorShipRequired": req.body.sponsorShipRequired,
        "diversity": req.body.diversity,
        "Gender": req.body.Gender,
        "disable": req.body.disable,
        "veteran": req.body.veteran,
        "school": req.body.school,
        "discipline": req.body.discipline,
        "degree": req.body.degree,
        "positionExperience": req.body.positionExperience,
        "created_at": today.toISOString().slice(0, 10),
        "updated_at": today.toISOString().slice(0, 10),
      }

      kafka.make_request('job_application', job, function (err, applied) {
        console.log('in result');

        if (err) {
          res.status(400);
          res.send(err);
        } else {
          res.json({
            status: 200,
            message: 'job applied successfully'
          })
        }

      });
    }


  });

}

module.exports.checkApplication = function (req, res) {
  var data = {
    "applicantId": req.query.email,
    'jobId': req.query.jobId,
  }
  kafka.make_request('check_application', data, function (err, jobapplied) {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      console.log(jobapplied)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(jobapplied));
    }

  });
}