var mongoose = require('mongoose');

var EasyApply = mongoose.model('easyApply', {

	jobId: {
		type: String
	},
	jobCompanyName: {
		type: String
	},
	jobCompanyLogo: {
		type: String
	},
	jobLocation: {
		type: String
	},
	jobTitle: {
		type: String
	},
	applicantId: {
		type: String
	},
	resume: {
		type: String
	},
	phone: {
		type: String
	},
	email: {
		type: String
	},
	fName: {
		type: String
	},
	lName: {
		type: String
	},
	companyName: {
		type: String
	}
});

module.exports = { EasyApply };
