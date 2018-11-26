var mongoose = require('mongoose');

var PeopleConnect = mongoose.model('People',{
email:{
    type:String
},
password:{type:String},
requests:{
    sendrequest:[String],
    receiverequest:[String],
    connectionlistlist:[String]
}
},'People');

module.exports={PeopleConnect};