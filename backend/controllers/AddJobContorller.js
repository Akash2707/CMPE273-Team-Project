const multer = require('multer');
const multerS3 = require('multer-s3');
var kafka = require('./../kafka/client');
var AWS = require('aws-sdk');
var path = require('path');
var awsCredFile = path.join(__dirname, './../', 'configuration.json');
AWS.config.loadFromPath(awsCredFile);

module.exports.addJob = function (req, res) {
    let imageName;
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
                imageName = `http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/download/${name}`
                cb(null, name); //use Date.now() for unique file keys
            }
        })
    })
    const singleUpload = upload.single('companyLogo')
    
    singleUpload(req, res, (err) => {
        /*Now do where ever you want to do*/
        if (err) {
            return res.status(400).send(err);
        }
        else {
            var today = new Date();
            var job = {
                "recruiterEmail": req.query.email,
                "companyName": req.body.companyName,
                "description": req.body.description,
                "title": req.body.jobTitle,
                "city": req.body.city,
                "employmentType": req.body.employmentType,
                "industry": req.body.companyIndustry,
                "seniority": req.body.seniority,
                "jobFunction": req.body.jobFunction,
                "skills": req.body.skills,
                "minExperience": req.body.minExperience,
                "maxExperience": req.body.maxExperience,
                "education": req.body.education,
                "companyLogo": imageName,
                "allowEasyApply": req.body.allowEasyApply,
                "totalViews": 0,
                "totalApplicants": 0,
                "created_at": today.toISOString().slice(0, 10),
                "updated_at": today.toISOString().slice(0, 10)
            }

            kafka.make_request('post_job', job, function (err, addedJob) {
                console.log('in result');

                if (err) {
                    res.status(400);
                    res.send(err);
                } else {
                    res.json({
                        status: 200,
                        message: 'job added successfully'
                    })
                }

            });
        }


    });



}



module.exports.editJob = function (req, res) {
    let imageName;
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
                imageName = `http://KafkaBackend-Elb-1573375377.us-east-2.elb.amazonaws.com:3001/download/${name}`
                cb(null, name); //use Date.now() for unique file keys
            }
        })
    })
    const singleUpload = upload.single('companyLogo')
    
    singleUpload(req, res, (err) => {
        /*Now do where ever you want to do*/
        if (err) {
            return res.status(400).send(err);
        }
        else {
            var today = new Date();
            var job = {
                "jobId": req.body._id,
                "description": req.body.description,
                "employmentType": req.body.employmentType,
                "industry": req.body.companyIndustry,
                "seniority": req.body.seniority,
                "jobFunction": req.body.jobFunction,
                "skills": req.body.skills,
                "minExperience": req.body.minExperience,
                "maxExperience": req.body.maxExperience,
                "education": req.body.education,
                "companyLogo": imageName,
                "allowEasyApply": req.body.allowEasyApply,
                "updated_at": today.toISOString().slice(0, 10)
            }

            kafka.make_request('edit_job', job, function (err, addedJob) {
                console.log('in result');

                if (err) {
                    res.status(400);
                    res.send(err);
                } else {
                    res.json({
                        status: 200,
                        message: 'job edited successfully'
                    })
                }

            });
        }


    });



}