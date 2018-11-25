var mongoose = require('mongoose');

var UserProfile = mongoose.model('userprofile',{
    fName :{
        type : String
    },
    lName : {
        type : String
    },
    email : {
        type : String
    },
    isRecruiter : {
        type : Boolean
    },
    state : {
        type : String
    },
});

module.exports = {UserProfile};