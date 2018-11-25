var mongoose = require('mongoose');

var Users = mongoose.model('users',{
    fName :{
        type : String
    },
    lName : {
        type : String
    },email : {
        type : String
    },
    password : {
        type : String 
    },
    isRecruiter : {
        type : Boolean
    },
    state : {
        type : String
    },
    created_at : {
        type : String
    },
    updated_at : {
        type : String
    }
});

module.exports = {Users};