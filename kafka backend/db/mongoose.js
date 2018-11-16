var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/linkedIn?poolSize=20', {poolSize: 20});

module.exports = {mongoose};