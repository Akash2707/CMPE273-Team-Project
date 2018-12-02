var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')


    function handle_request(msg, callback){
        console.log(' msg = ' + msg)
        console.log("In handle request:"+ JSON.stringify(msg));
        console.log(msg.q)
        console.log(msg.page)
        var pageNo = msg.page
        var size = 10
        var query = {}
        query.skip = size * (pageNo - 1)
        query.limit = size
        var totalPages=0
      //  var user={}
    
      /*  PeopleConnect.find({email:msg.email}, function (err, result) {
            if (err) {
                console.log(err);
                callback(err,[]);
            } else {
                console.log(result)
                user=result
               // callback(null,result);
    
            }
        })
*/
    UserProfile.count({$and:[{email:{$ne:msg.email}},{email:{$regex:'^'+msg.q+'.*'}}]},
    function(err, totalCount){
        if(err){
            console.log(err);
            callback(err,[]);
        }else{
            console.log(totalCount)
            totalPages = Math.ceil(totalCount / size)
        }})
     UserProfile.find({
            email:msg.email
        }, function (err, result) {
            if (err) {
                console.log(err);
                callback(err,[]);
            } else {
                console.log(result)
   
            UserProfile.find({$and:[{email:{$ne:msg.email}},{$or: [ {fName:{$regex:'^'+msg.q+'.*', $options: 'i'}},{lName:{$regex:'^'+msg.q+'.*',$options: 'i'}}]}]}
,{},query, function (err, searchresult) {
    if (err) {
        console.log(err);
        callback(err,[]);
    } else {
        console.log(' The seach result ', result)
        var data={result:searchresult,totalpages:totalPages}
        console.log(data)
        callback(null,data);

    }
})   


            }
        })
}

exports.handle_request = handle_request;



//alternate query
/*   PeopleConnect.find({$and:[{email:{$nin:k }},{email:{$ne:msg.email}},{email:{$nin:l }},{email:{$in:j}}]
                   },{_id:0,email:1}, function (err, result) {
                       if (err) {
                           console.log(err);
                           callback(err,[]);
                       } else {
                           console.log(result)
                           
                           callback(null,result);
               
                       }
                   })*/
               // callback(null,result);
    
