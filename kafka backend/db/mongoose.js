var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/linkedIn', { useNewUrlParser: true , poolSize : 100});

module.exports = {mongoose};