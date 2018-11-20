var mongoose = require('mongoose');

var JobApplication = mongoose.model('jobApplication',{

	jobId: {
		type: String
	},
	applicantId: {
		type: String
	},
	resume: {
		type: String
	},
	coverLetter: {
		type: String
	},
	linkedInUrl:{
		type:String
    },
    gitWebUrl:{
		type:String
    },
    phone:{
		type:String
    },
    email:{
		type:String
    },
	fName: {
		type: String
	},
	lName: {
		type: String
	},
	address: {
		type: String
	},
	hearAboutUs: {
		type: String
	},
	sponsorShipRequired: {
		type: String
	},
	diversity: {
		type: String
	},
	Gender:{
    type:String
    },
	disable:{
		type: String
	},
	veteran:{
		type: String
	}
});

module.exports = {JobApplication};
