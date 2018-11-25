var mongoose = require('mongoose');

var SavedJob = mongoose.model('savedjob', {

	userId: {
		type: String
	},
	recruiterId: {
		type: String
	},
	jobId: {
		type: String
	},
	companyName: {
		type: String
	},
	companyLogo: {
		type: String
	},
	location: {
		type: String
	},
	title: {
		type: String
	},
	postedDate: {
		type: String
	}
});

module.exports = { SavedJob };
