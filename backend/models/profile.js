var mongoose = require('mongoose');

var Profile = mongoose.model('profile',{
    fName :{
        type : String
    },
    lName : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String 
    },
    isRecruiter : {
        type : Boolean
    },
    created_at : {
        type : String
    },
    updated_at : {
        type : String
    }
},'profile');

module.exports = {Profile};