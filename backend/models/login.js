var mongoose = require('mongoose');

var Login = mongoose.model('login',{
    email : {
        type : String
    },
    password : {
        type : String 
    },
    isRecruiter : {
        type : Boolean
    }
},'login');

module.exports = {Login};