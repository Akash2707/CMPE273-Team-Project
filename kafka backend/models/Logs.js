var mongoose = require('mongoose');

var Logs = mongoose.model('log', {

	jobId: {
		type: String
	},
	recruiterId: {
		type: String
	},
	userId: {
		type: String
	},
	activity: {
		type: String
	},
	location: {
		type: String
	},
	created_at: {
		type: Date
	}
});

module.exports = { Logs };
