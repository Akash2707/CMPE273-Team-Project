var mongoose = require('mongoose');

var UserProfile = mongoose.model('userprofile', {
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: String
    },
    headline: {
        type: String
    },
    uniEducation: {
        type: String
    },
    industry :{
        type: String
    },
    phone:{
        type: String
    },        
    birthDate :{
        type: String
    },
    summary :{
        type: String
    },
    resume:{
        type: String
    },
    skills:{
        type: String
    },
    profileSummary: {
        type: String
    },
    resume: {
        type: String
    },
    experience : [{
        position : {
            type : String
        },
        company : {
            type : String
        },
        compLocation : {
            type : String
        },
        compDescription : {
            type : String
        },
        from : {
            type : String
        },
        isWorking : {
            type : Boolean
        },
        to : {
            type : String
        }
    }],
    education : [{
        school : {
            type : String
        },
        degree : {
            type : String
        },
        field : {
            type : String
        },
        grade : {
            type : String
        },
        fromYear : {
            type : String
        },
        toYear : {
            type : String
        },
        eduDescription : {
            type : String
        }
    }]
});

module.exports = { UserProfile };