var connection = require('../config');
var { mongoose } = require('.././db/mongoose')
var { UserProfile } = require('.././models/profile')
var kafka = require('../kafka/client');
const multer = require('multer');
const multerS3 = require('multer-s3');
var AWS = require('aws-sdk');
var path = require('path');
var awsCredFile = path.join(__dirname, './../', 'configuration.json');
AWS.config.loadFromPath(awsCredFile);
const responseTime = require('response-time')
const redis = require('redis');
const client = redis.createClient({
    port: 6379,
    host: "3.16.242.224"
});
client.on('error', (err) => {
    console.log("Error " + err);
});



module.exports.update = function (req, res) {
    console.log(req.body);
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
            var data = {
                "fName": req.body.fName,
                "lName": req.body.lName,
                "email": req.query.email,
                "address": req.body.address,
                "country": req.body.country,
                "state": req.body.state,
                "zipCode": req.body.zipCode,
                "headline": req.body.headline,
                "uniEducation": req.body.education,
                "industry": req.body.industry,
                "phone": req.body.phone,
                "birthdDate": req.body.birthdDate,
                "summary": req.body.summary,
                "resume": resumeName,
            }

            kafka.make_request('profile_update', data, function (err, user) {
                console.log(req.body);
                console.log('in result');
                console.log(JSON.stringify(user));
                console.log(user);
                if (err) {
                    console.log("Inside err");
                    res.status(400).json({
                        success: false,
                        message: "System Error, Try Again."
                    })
                } else {
                    res.json({
                        status: 200,
                        data: user,
                        message: 'Profile Successfully Updated.'
                    })
                }
            })

        }
    })

}

module.exports.addExperience = function (req, res) {
    console.log("hellllllooooo" + req.body);
    if (req.body.isExpNew == true) {
        var data = {
            email: req.query.email,
            position: req.body.position,
            company: req.body.company,
            compLocation: req.body.compLocation,
            compDescription: req.body.compDescription,
            from: req.body.from,
            isWorking: req.body.isWorking,
            to: req.body.to,
            isExpNew: req.body.isExpNew
        }
    } else {
        var data = {
            email: req.query.email,
            experience: req.body.experience,
            isExpNew: req.body.isExpNew
        }
    }

    kafka.make_request('add_experience', data, function (err, user) {
        console.log(req.body);
        console.log('in result');
        console.log(JSON.stringify(user));
        console.log(user);
        if (err) {
            console.log("Inside err");
            res.status(400).json({
                success: false,
                message: "System Error, Try Again."
            })
        } else {
            res.json({
                status: 200,
                data: user,
                message: 'Experienec Successfully Added.'
            })
        }
    })
}

module.exports.addEducation = function (req, res) {
    console.log(req.body);
    if (req.body.isEduNew == true) {
        var data = {
            email: req.query.email,
            school: req.body.school,
            degree: req.body.degree,
            field: req.body.field,
            grade: req.body.grade,
            fromYear: req.body.fromYear,
            toYear: req.body.toYear,
            eduDescription: req.body.eduDescription,
            isEduNew: req.body.isEduNew
        }
    }
    else {
        var data = {
            email: req.query.email,
            education: req.body.education,
            isEduNew: req.body.isEduNew
        }
    }


    kafka.make_request('add_education', data, function (err, user) {
        console.log(req.body);
        console.log('in result');
        console.log(JSON.stringify(user));
        console.log(user);
        if (err) {
            console.log("Inside err");
            res.status(400).json({
                success: false,
                message: "System Error, Try Again."
            })
        } else {
            res.json({
                status: 200,
                data: user,
                message: 'Education Successfully Added.'
            })
        }
    })
}

module.exports.imageUpload = function (req, res) {
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
                imageName = `http://localhost:3001/download/${name}`
                cb(null, name); //use Date.now() for unique file keys
            }
        })
    })
    const singleUpload = upload.single('profilePhoto')

    singleUpload(req, res, (err) => {
        /*Now do where ever you want to do*/
        if (err) {
            return res.status(400).send(err);
        }
        else {

            var profile = {
                "profilePhoto": imageName,
                "email": req.query.email
            }

            kafka.make_request('profilePhoto_upload', profile, function (err, result) {
                console.log('in result');

                if (err) {
                    res.status(400);
                    res.send(err);
                } else {
                    res.json({
                        status: 200,
                        message: ' Profile Photo uploaded successfully'
                    })
                }
            });
        }
    });
}

module.exports.profileDisplay = function (req, res) {

    // client.get(`profile:${req.query.email}`, (err, result) => {
    //     // If that key exist in Redis store
    //     if (result) {
    //         console.log("if");
    //         const resultJSON = JSON.parse(result);
    //         return res.status(200).json(resultJSON);
    //     } else {
    //         console.log("else");
    kafka.make_request('user_profile_display', req.query, function (err, user) {
        console.log('in result');
        console.log(JSON.stringify(user));
        console.log(user);
        if (err) {
            console.log("Inside err");
            res.status(400).json({
                success: false,
                message: "System Error, Try Again."
            })
        } else {
            if (Object.keys(user).length != 0) {
                // client.setex(`profile:${req.query.email}`, 3600, JSON.stringify({ source: 'Redis Cache', ...user, }));
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                res.end(JSON.stringify(user));
            } else {
                res.status(400).json({
                    success: false,
                    message: "!User is not yet registerd"
                })
            }
        }
    })
}

module.exports.addskills = function (req, res) {
    console.log(req.body);
    var data = {
        email: req.query.email,
        skills: req.body
    }

    kafka.make_request('add_skill', data, function (err, user) {
        console.log(req.body);
        console.log('in result');
        console.log(JSON.stringify(user));
        console.log(user);
        if (err) {
            console.log("Inside err");
            res.status(400).json({
                success: false,
                message: "System Error, Try Again."
            })
        } else {
            res.json({
                status: 200,
                data: user,
                message: 'Education Successfully Added.'
            })
        }
    })
}

module.exports.updateProfileCount = function (req, res){
    kafka.make_request('update_profilecount', req.body, function (err, profileViewed) {
        if (err) {
          res.status(400);
          res.send(err);
        } else {
          console.log(profileViewed)
          res.json({
            status: 200,
            message: `Count updated successfully`
            })
        }
    
      });
}
