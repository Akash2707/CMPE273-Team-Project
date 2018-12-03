var connection = new require('./kafka/Connection');

//topics files
var signup = require('./services/signup.js');
var login = require('./services/login.js');
//var signin = require('./services/signin.js');

var updateProfile = require('./services/updateProfile');
var addExperience = require('./services/addExperience');
var addEducation = require('./services/addEducation');
var profilePhoto = require('./services/uploadProfile');
var profileDisplay = require('./services/displayProfile');
var addSkills = require('./services/addSkills');
var jobApplication = require('./services/jobApplication');
var postJob = require('./services/PostJob');
var searchJobs = require('./services/searchJobs');
var easyApply = require('./services/EasyApply');
var checkEasyApply = require('./services/CheckEasyApply');
var checkApplication = require('./services/CheckApplication');
var saveJob = require('./services/SaveJob')
var checkSavedJob = require('./services/CheckSavedJob')


var getRequests=require('./services/getRequests')
var requestaccept=require('./services/requestaccept')
var searchPeople = require('./services/searchpeople')
var sendrequest = require('./services/sendrequest')
var allConnections=require('./services/allConnections')
var requestdeny=require('./services/requestdeny')
var requestwithdraw=require('./services/requestwithdraw')
var getsentrequest=require('./services/getsentRequests')

var getRecommendPeople=require('./services/getRecommendPeople')

var checkConversation = require('./services/checkConversation')
var message = require('./services/message')
var messageView = require('./services/messagesView')

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log(message)
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest("profile_update",updateProfile)
handleTopicRequest("add_experience",addExperience)
handleTopicRequest("add_education",addEducation)
handleTopicRequest("profilePhoto_upload",profilePhoto)
handleTopicRequest("user_profile_display",profileDisplay)
handleTopicRequest("add_skill",addSkills)
handleTopicRequest("job_application",jobApplication)
handleTopicRequest("post_login", login)
handleTopicRequest("post_signup", signup)
handleTopicRequest("post_job",postJob)
handleTopicRequest("get_jobs",searchJobs)
handleTopicRequest("easy_apply",easyApply)
handleTopicRequest("check_easyapply", checkEasyApply)
handleTopicRequest("check_application",checkApplication)
handleTopicRequest("save_job",saveJob)
handleTopicRequest("check_savedJob",checkSavedJob)


handleTopicRequest("getallrequest",getRequests)
handleTopicRequest("accept_request",requestaccept)
handleTopicRequest("deny_request",requestdeny)
handleTopicRequest("search_people",searchPeople)
handleTopicRequest("sendrequest",sendrequest)
handleTopicRequest("all_connections",allConnections)
handleTopicRequest("withdraw_request",requestwithdraw)
handleTopicRequest("getallsentrequest",getsentrequest)

handleTopicRequest("recommend_people",getRecommendPeople)

handleTopicRequest("check_conversation",checkConversation)
handleTopicRequest("message" , message)
handleTopicRequest("messagesView", messageView)