var bodyParser = require('body-parser'),
express    = require('express'),
mongoose   = require('mongoose'),
app        = express();
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');


var connectionString = 'mongodb://127.0.0.1:27017/webdevspring2016';

if (process.env.MONGODB_URL) {
    connectionString = process.env.MONGODB_URL;
}

var db = mongoose.connect(connectionString);   
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


require('./public/assignment/server/app.js')(app, db, mongoose);
require('./public/project/app/scripts/server/app.js')(app, db, mongoose);

app.listen(port, ipaddress);