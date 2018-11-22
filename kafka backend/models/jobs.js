var mongoose = require('mongoose');

var Jobs = mongoose.model('job',{
    companyName : {
        type : String
    },
    recruiterEmail : {
        type : String
    },
    description : {
        type : String
    },
    title : {
        type : String
    },
    city : {
        type : String
    },
    employmentType : {
        type : String
    },
	industry: {
		type: String
    },
    seniority: {
		type: String
    },
    jobFunction: {
        type: String
    },
    skills: {
        type: String
    },
    minExperience: {
		type: String
    },
    maxExperience: {
		type: String
    },
    education: {
        type: String
    },
    companyLogo: {
		type: String
    },
    allowEasyApply: {
        type: Boolean
    },
	totalApplicants: {
		type: String
	},
	totalViews: {
		type: String
	},
	created_at: {
		type: String
    },
    updated_at: {
		type: String
    }
});

module.exports = { Jobs }