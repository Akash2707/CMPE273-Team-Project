//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport')
var cors = require('cors');
app.set('view engine', 'ejs');
const responseTime = require('response-time')
const redis = require('redis');
var jobApplicationController = require('./controllers/jobApplicationController');
var AWS = require('aws-sdk');
var path = require('path');
var awsCredFile = path.join(__dirname, './', 'configuration.json');
AWS.config.loadFromPath(awsCredFile);
var updateProfile = require('./controllers/profileController');
var addJobController = require('./controllers/AddJobContorller');
var connectionController = require('./controllers/connectionController')
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });
app.use(passport.initialize());

const client = redis.createClient({
    port: 6379,
    host: "3.16.242.224"
});
client.on('error', (err) => {
    console.log("Error " + err);
});

app.use(responseTime());
// Bring in defined Passport Strategy
require('./config/passport')(passport);

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://linkedin-frontend-elb-1770071659.us-east-2.elb.amazonaws.com:3000', credentials: true }));
module.exports = app;

app.use(cookieParser('linkedIn'));
app.use(express.static('public'));

//use express session to maintain session data
app.use(session({
    secret: 'linkedIn',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan('dev'));

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://linkedin-frontend-elb-1770071659.us-east-2.elb.amazonaws.com:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Authorization, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});



var loginController = require('./controllers/login')
var signupController = require('./controllers/signup')
var searchJobController = require('./controllers/SearchJobsController')
var applyJobController = require('./controllers/ApplyJobController')
var saveJobController = require('./controllers/SaveJobController')
var connectionController = require('./controllers/connectionController')

var conversationController = require('./controllers/conversationController')
var messageController = require('./controllers/messageController')
var savedJobsController = require('./controllers/SavedJobsController')
var postedJobsController = require('./controllers/PostedJobController')
var recruiterController = require('./controllers/RecruiterController')
var profileCountController = require('./controllers/profileController')

app.post('/login', loginController.authenticate);
app.post('/signup', signupController.register);
app.post('/add/job', requireAuth, addJobController.addJob)
app.post('/applyjob', jobApplicationController.jobApply);
app.get('/search/jobs', requireAuth, searchJobController.getJobs)
app.post('/easyapply', requireAuth, applyJobController.easyApply)
app.get('/check/easyapply', requireAuth, applyJobController.checkEasyApply)
app.get('/check/application', requireAuth, jobApplicationController.checkApplication)
app.post('/savejob', requireAuth, saveJobController.saveJob)
app.get('/check/savedJobs', requireAuth, saveJobController.checkSavedJob)
app.put('/recruiter/profile/update', updateProfile.update);
app.put('/recruiter/profile/experience', updateProfile.addExperience);
app.put('/recruiter/profile/education', updateProfile.addEducation);
app.put('/recruiter/profile/imageupload', updateProfile.imageUpload);
app.get('/recruiter/profile', updateProfile.profileDisplay);
app.put('/recruiter/profile/skills', updateProfile.addskills);
app.get('/jobs/saved/', savedJobsController.getSaveJobs);
app.get('/recruiter/jobs/posted/', postedJobsController.getPostedJobs);
//app.post('/travelerlogin',applicantLoginController.authenticate);
app.get('/searchpeople', connectionController.getpeople);
app.put('/sendrequest', connectionController.sendrequest);
app.get('/getRequests', connectionController.getrequest);
app.get('/getsentRequests', connectionController.getsentrequest);
app.post('/requestaccept', connectionController.acceptrequest);
app.post('/requestdeny', connectionController.denyrequest);
app.post('/requestwithdraw', connectionController.withdrawrequest);
app.get('/getConnections', connectionController.getConnections);
app.post('/removeconnect',connectionController.removeconnect);

app.get('/getRecommendPeople',connectionController.getRecommendPeople);

app.get('/conversation' ,conversationController.checkConversation);
app.post('/message', messageController.message);
app.get('/viewmessages',messageController.messagesView)

app.delete('/deleteAnAccount',signupController.deleteTheAccount);
app.get('/getSavedApplicationGraph',recruiterController.getSavedApplicationGraph);
app.post('/updatejobCount',recruiterController.updateJobCount);
app.get('/getjobsviewcount',recruiterController.getJobsViewCount);
app.get('/getlessnoofapplicants',recruiterController.getLessNoOfApplicants);
app.get('/getjobstitle',recruiterController.getJobsTitle);
app.get('/getapplicantsbycity',recruiterController.getApplicantsByCity);
app.post('/updateLogs',recruiterController.updateLogs);
app.get('/traceUsers',recruiterController.getTraceUsers);
app.get('/gettoptennoofapplicants',recruiterController.getTopTenNoOfApplicants);
app.put('/edit/job',addJobController.editJob)
app.get('/job/applicants', postedJobsController.getApplicants)
app.get('/newconversation', messageController.newMessage)
app.put('/profilecount' , profileCountController.updateProfileCount )

app.get('/download/:file(*)', (req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    var s3Bucket = new AWS.S3({ params: { Bucket: 'linkedin-bucket' } })
    var params = { Bucket: 'linkedin-bucket', Key: file };
    s3Bucket.getObject(params, function (err, data) {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
    });
});

app.get('/resume/:file(*)', (req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    var s3Bucket = new AWS.S3({ params: { Bucket: 'linkedin-bucket' } })
    var params = { Bucket: 'linkedin-bucket', Key: file };

    res.attachment(file);
    var fileStream = s3Bucket.getObject(params).createReadStream();
    fileStream.pipe(res);

});

app.listen(3001);
console.log("Server Listening on port 3001");