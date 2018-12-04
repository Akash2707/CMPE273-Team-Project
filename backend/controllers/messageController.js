var kafka = require('../kafka/client');

module.exports.message = function (req, res) {
    var today = new Date();
    console.log(req.body);
    var data = {
        "conversationId" : req.body.id,
        "content" : req.body.content,
        "sender" : req.query.name,
        "timeCreated": today,
        "profileImage" : req.query.profileImage

    }

    kafka.make_request('message', data, function (err, user) {
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
                message : "Message Successfully send."
            })
        }
    })
}

module.exports.messagesView = function (req, res) {
    var today = new Date();
    console.log(req.body);
    kafka.make_request('messagesView', req.query, function (err, user) {
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
                message : "Message Successfully send.",
                messageList : user
            })
        }
    })
}

module.exports.newMessage = function (req, res) {
    var today = new Date();
    console.log(req.body);
    kafka.make_request('newMessage', req.query, function (err, user) {
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
        } else if(Object.keys(user).length != 0){
            res.json({
                status: 200,
                messageList : user
            })
        }else{
            res.json({
                status: 200,
                messageList : []
            })
        }
    })
}

