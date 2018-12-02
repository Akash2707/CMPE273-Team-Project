var mongoose = require('mongoose');

mongoose.connect('mongodb://root:12345678@ec2-18-220-185-16.us-east-2.compute.amazonaws.com:27017/databaseLinkedIn');

var db = mongoose.connection

db.Promise = global.Promise;

module.exports = {db};