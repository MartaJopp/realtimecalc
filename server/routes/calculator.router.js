module.exports = function (io) { // catch here

    var express = require('express');
    var router = express.Router();

    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var CalcSchema = new Schema({
        problem: String,
    });

    var Calcs = mongoose.model('Calcs', CalcSchema, 'calcs');


    router.post('/', function (req, res) {
        // console.log('what is io', io)
        console.log('what was sent', req.body);
        var calcToAdd = new Calcs(req.body);
        // console.log('test', testToAdd ) //renaming to work with mongoose
        calcToAdd.save(function (err, data) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200)
                //Emit the event
                io.emit("chat", req.body)
            }
        }); // END SAVE
    }); // END POST Route

    router.get('/', function (req, res) {
        Calcs.find({}).sort({ _id: -1 }).limit(3).exec(function (err, calcs) { //finding chats
            if (err) {
                console.log("ERROR!", err);
                res.sendStatus(500);
            } else {
                console.log('tests', calcs)
                res.send(calcs);

            }
        }); // END FIND
    }); // END GET Route

    return router;
}
