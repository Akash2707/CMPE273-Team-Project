const multer = require('multer');
const multerS3 = require('multer-s3');
var kafka = require('./../kafka/client');
var AWS = require('aws-sdk');
var path = require('path');
var awsCredFile = path.join(__dirname, './../', 'configuration.json');
AWS.config.loadFromPath(awsCredFile);

module.exports.easyApply = function (req, res) {
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
                resumeName = `https://s3.us-east-2.amazonaws.com/linkedin-bucket/${name}`
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
                "address": req.body.address,
                "resume": resumeName,
                "companyName": req.body.companyName,
                "created_at": today.toISOString().slice(0, 10),
                "updated_at": today.toISOString().slice(0, 10),
            }

            kafka.make_request('easy_apply', job, function (err, applied) {
                console.log('in result');

                if (err) {
                    res.status(400);
                    res.send(err);
                } else {
                    res.json({
                        status: 200,
                        message: `Applied to ${req.body.companyName} successfully`
                    })
                }

            });
        }


    });
}

module.exports.checkEasyApply = function (req, res) {
    var data = {
        "applicantId" : req.query.email,
        'jobId': req.query.jobId,
    }
    kafka.make_request('check_easyapply', data, function (err, jobapplied) {       
        if (err) {
            res.status(400);
            res.send(err);
        }else{
            console.log(jobapplied)
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(jobapplied));
        }

    });
}