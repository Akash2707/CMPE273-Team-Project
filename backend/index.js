//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport')
var cors = require('cors');
app.set('view engine', 'ejs');
var AWS = require('aws-sdk');
var path = require('path');
var awsCredFile = path.join(__dirname, './', 'configuration.json');
AWS.config.loadFromPath(awsCredFile);
var applicantLoginController = require('./controllers/applicantLoginController');
var addJobController = require('./controllers/AddJobContorller');
var requireAuth = passport.authenticate('jwt', { session: false });
app.use(passport.initialize());


// Bring in defined Passport Strategy
require('./config/passport')(passport);

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
module.exports = app;

app.use(cookieParser('linkedIn'));
app.use(express.static('public'));

//use express session to maintain session data
app.use(session({
    secret              : 'linkedIn',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan('dev'));

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Authorization, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});



var loginController = require('./controllers/login')
var signupController = require('./controllers/signup')

app.post('/login',loginController.authenticate);
app.post('/signup',signupController.register);
app.post('/add/job', addJobController.addJob)



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



app.listen(3001);
console.log("Server Listening on port 3001");
