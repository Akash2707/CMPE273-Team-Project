var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://ec2-18-220-185-16.us-east-2.compute.amazonaws.com:27017/databaseLinkedIn', { useNewUrlParser: true , poolSize : 100});

module.exports = {mongoose};