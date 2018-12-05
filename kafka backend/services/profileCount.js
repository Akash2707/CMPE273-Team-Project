var { UserProfile } = require('./../models/UserProfile');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    UserProfile.findOneAndUpdate({
        email: msg.profileEmail
    }, { $inc: {totalViews: 1}  }, function (err, doc) {
        if(err) {
            callback(err,[]);
        }
        else{
            callback(null,"Profile view increased successfully!");
        }
    })

    
}
exports.handle_request = handle_request;

