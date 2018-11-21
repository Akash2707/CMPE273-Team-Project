

const path = require("path");
var kafka = require('./../kafka/client');
exports.jobApply = function (req, res) {

      console.log(req)
  
      var today = new Date();
      var applicationData = {
       
        "fName": req.body.fName,
        "lName": req.body.lName,
        "email": req.body.email,
        "phone": req.body.phone,
        "location": req.body.location,
        "sponsorShipRequired": req.body.sponsorShipRequired,
        "hearAboutUs": req.body.hearAboutUs,
        "linkedInUrl": req.body.linkedInUrl,
        "gitWebUrl": req.body.gitWebUrl,
        "gender": req.body.gender,
        "disable": req.body.disable,
        "veteran": req.body.veteran,
        "diversity": req.body.diversity,
      }
      console.log(req.body.fName)
      kafka.make_request('job_application', applicationData, function (err, result) {
        if (typeof result == "string") {
          console.log("error ocurred", error);
          res.status(403).send(result);
        } else {
          res.json({
            status: 200,
            message: "Applied Successfully"
          });
        
        }

      })
    }
  