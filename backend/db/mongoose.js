var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/linkedIn', { useNewUrlParser: true , poolSize : 100});

var db = mongoose.connection

db.Promise = global.Promise;

module.exports = {db};