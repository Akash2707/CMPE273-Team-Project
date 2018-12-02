var mongoose = require('mongoose');

mongoose.connect('mongodb://root:root12345678@ds249583.mlab.com:49583/homeaway', { useNewUrlParser: true , poolSize : 100});

var db = mongoose.connection

db.Promise = global.Promise;

module.exports = {db};