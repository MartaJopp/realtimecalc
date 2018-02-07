var express = require("express")
var mongoose = require("mongoose")
var app = express()
var server = require('http').createServer(app);
var port = 5000;
var bodyParser = require('body-parser'); // require body-parser
var http = require("http").Server(app)
var io = require("socket.io").listen(server)
var calculatorRouter = require('./routes/calculator.router.js')(io); // accesses router


app.use(bodyParser.json());
//schema is received instead of empty object
app.use(bodyParser.urlencoded({ extended: false }))
//static files
app.use(express.static('server/public'));

app.use('/calculator', calculatorRouter);


// Mongo Connection //
var mongoURI = '';
// process.env.MONGODB_URI only defined running on Heroku
if (process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost:27017/calctime';
}

mongoose.connect(mongoURI, {
    useMongoClient: true
});

mongoose.connection.on('error', function (err) {
    if (err) {
        console.log("MONGO ERROR: ", err);
    }
    res.sendStatus(500);
});

mongoose.connection.on('open', function () {
    console.log("Connected to Mongo!");
});

module.exports = mongoose;

io.on("connection", (socket) => {
    console.log("Socket is connected...")
})

//spin up server - need to change to server/http once get socket.io going
server.listen(port, function () {
    console.log('Listening on port', port)
})