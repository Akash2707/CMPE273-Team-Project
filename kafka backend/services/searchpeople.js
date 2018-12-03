var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')

// for graph
var session = require('express-session')
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://ec2-3-17-8-206.us-east-2.compute.amazonaws.com:7687', neo4j.auth.basic('neo4j', '12345678'));
// graph end

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
        var counter = 0
        var hasRequestArray=[]
        var sentArray=[]
        var connectedArray=[]
      //  var user={}

    
    // graph start
     console.log(' My email : ', msg.email)
     session = driver.session();
  
    //sentRequest
    var resultPromise = session.run(
        'match(n:User {email: $send}),(d:User)  Where (n)-[:sent]->(d) return (d.email)',
            {send : msg.email} 
    )
        resultPromise.then(result => {
        
        console.log()
    
        //var searchedUsers = []
        var array = result.records
        for(var i = 0 ; i < array.length; i++){
            sentArray.push(array[i].get(0))
        }
        console.log('SentArray here',sentArray)
        })
    
    // hasRequest
    var resultPromise = session.run(
        'match(n:User {email: $send}),(d:User)  Where (n)-[:hasRequest]-> (d) return (d.email)',
            {send : msg.email} 
    )
        resultPromise.then(result1 => {

        console.log()

        //var searchedUsers = []
        var array = result1.records
                    
        for(var i = 0 ; i < array.length; i++){
            hasRequestArray.push(array[i].get(0))
        }
            console.log('hasRequestArray here',hasRequestArray)
        })

    // connection
    var resultPromise = session.run(
        'match(n:User {email: $send}),(d:User)  Where (n)-[:connected]-> (d) return (d.email)',
            {send : msg.email} 
    )
        resultPromise.then(result2 => {
            
        console.log()

        //var searchedUsers = []
        var array = result2.records
                    
        for(var i = 0 ; i < array.length; i++){
            connectedArray.push(array[i].get(0))
        }
        console.log('connected here',connectedArray)
        })

//searchQuery
    var resultPromise = session.run(
        'match(n:User {email: $mail}),(d:User) where n.email <> d.email and d.fName =~ $combination or d.lName =~ $combination return (d)',
           {mail : msg.email, combination : '^' + '(?i)' + msg.q + '.*'} 
    )   

     resultPromise.then(result3 => {
        console.log()
     
        console.log(' The result count', result3.records.length)
        counter = result3.records.length

        totalPages = Math.ceil(counter / size)
    })

    var resultPromise = session.run(
        'match(n:User {email: $mail}),(d:User) where n.email <> d.email and d.fName =~ $combination or d.lName =~ $combination return (d) SKIP $_skip LIMIT $_limit',
           {mail : msg.email, combination : '^' + '(?i)' + msg.q + '.*', _skip : query.skip, _limit : query.limit} 
    )   

     resultPromise.then(result4 => {

        session.close();
        console.log()
       
        var searchedUsers = []
        var array = result4.records
                    
        for(var i = 0 ; i < array.length; i++){
            searchedUsers.push(array[i].get(0).properties)
            console.log(array[i].get(0).properties)
        }

       var data={result:searchedUsers, totalpages:totalPages,sentReq:sentArray,hasReq:hasRequestArray,connect:connectedArray}
       callback(null,data)   
        
        driver.close();

    })
    
    /*
    UserProfile.count({$and:[{email:{$ne:msg.email}},{email:{$regex:'^'+msg.q+'.*'}}]},
    function(err, totalCount){
        if(err){
            console.log(err);
            callback(err,[]);
        }else{
        //    console.log(totalCount)
            totalPages = Math.ceil(totalCount / size)
        }})
    */

    /*
     UserProfile.find({
            email:msg.email
        }, function (err, result) {
            if (err) {
                console.log(err);
                callback(err,[]);
            } else {
             //   console.log(result)
   
            UserProfile.find({$and:[{email:{$ne:msg.email}},{$or: [ {fName:{$regex:'^'+msg.q+'.*', $options: 'i'}},{lName:{$regex:'^'+msg.q+'.*',$options: 'i'}}]}]}
,{},query, function (err, searchresult) {
    if (err) {
        console.log(err);
        callback(err,[]);
    } else {
       //  console.log(' The seach result ', result)
        var data={result:searchresult,totalpages:totalPages}
       // console.log(data)
        callback(null,data);

    }
})   

}       
 })

*/
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
    
