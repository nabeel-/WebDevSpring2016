var bodyParser = require('body-parser'),
    express    = require('express'),
    uuid       = require('node-uuid'),
    mongoose   = require('mongoose'),
    app        = express();

var connectionString = 'mongodb://127.0.0.1:27017/webdevspring2016';

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_URL;
}

var db = mongoose.connect(connectionString);   
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


require('./public/assignment/server/app.js')(app, uuid, db, mongoose);
require('./public/project/app/scripts/server/app.js')(app, uuid, db, mongoose);

app.listen(port, ipaddress);