var mongoose = require('mongoose');

var Messages = mongoose.model('message', {
    sender: {
        type: String
    },
    content: {
        type: String
    },
    timeCreated: {
        type: Date
    },
    conversationId: {
        type: String
    },
    profileImage: {
        type: String
    },
})

module.exports = { Messages };