var mongoose = require('mongoose');

var Conversation = mongoose.model('conversation', {
    participants : [String],
    participantsEmail : [String],
    participantsImage : [String]

})
module.exports = { Conversation };