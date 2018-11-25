var { EasyApply } = require('./../models/EasyApply');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    
    var easyApply = new EasyApply(msg);

    easyApply.save().then((application) => {
        callback(null,"Job added successfully!");
    }, (err) => {
        callback(err,[]);
    })
}
exports.handle_request = handle_request;

