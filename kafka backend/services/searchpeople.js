var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')


    function handle_request(msg, callback){
        console.log("In handle request:"+ JSON.stringify(msg));
        console.log(msg.q)
      //  db.products.find( { sku: { $regex: /^+msg.q+/i } } )
       // var query=msg.q
    // var regex = '/^'+query+'[a-zA-Z@.]*/' new RegExp(msg.q,'i')

     //   console.log(regex)
     UserProfile.find({
            email:msg.email
           // email:{$regex:'^'+msg.q+'.*'}
        }, function (err, result) {
            if (err) {
                console.log(err);
                callback(err,[]);
            } else {
                console.log(result)
         //       let user_detail=[]
        /*        let k=[]
              let l=[]
              let j=[]
              let m=[]
               console.log('query result',result)
               for(var i=0;i<result.length;i++){
               console.log(result[i].requests)
              j=j.concat(result[i].email)
              k=k.concat(result[i].requests.sendrequest)
            m=m.concat(result[i].requests.receiverequest)
               if(result[i].requests.connectionlistlist!=[]){
                   
                   l=l.concat(result[i].requests.connectionlistlist)
                }
            }
            console.log('j here',j,'k here:',k,' l here:',l)
            console.log('sendrequest',k)
            console.log('connection receive request',m)
            console.log('connection list',l)
              // l=[]
            //l=l.concat(result[1].requests.connectionlistlist)
              //  for(a in result){
             // console.log(result[a].email)
                 //   k.push(result[a].email)
               // }
//console.log('k here',k)
*/
UserProfile.find({$and:[{email:{$ne:msg.email}},{email:{$regex:'^'+msg.q+'.*'}}]}
, function (err, searchresult) {
    if (err) {
        console.log(err);
        callback(err,[]);
    } else {
        console.log(searchresult)
      //  console.log('deatils here',Object.assign(searchresult,user_detail))
       //user_detail= user_detail.concat(result)
       //user_detail= user_detail.concat(searchresult)
      // console.log(user_detail)
        callback(null,searchresult);

    }
})   

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
    
            }
        })
}

exports.handle_request = handle_request;