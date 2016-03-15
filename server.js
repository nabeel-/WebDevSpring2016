var bodyParser = require('body-parser'),
    express    = require('express'),
    app        = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(express.static(__dirname + '/public'));


require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress);