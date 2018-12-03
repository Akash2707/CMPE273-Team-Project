var kafka = require('../kafka/client');

module.exports.checkConversation = function (req, res) {
    console.log(req.body);
    var data = {
        email: req.query.email,
    }

    kafka.make_request('check_conversation', data, function (err, user) {
        console.log(req.body);
        console.log('in result');
        console.log(JSON.stringify(user));
        console.log(user);
        if (err) {
            console.log("Inside err");
            res.status(400).json({
                success: false,
                message: "System Error, Try Again."
            })
        } else {
            res.json({
                status: 200,
                conversation : user,
            })
        }
    })
}

