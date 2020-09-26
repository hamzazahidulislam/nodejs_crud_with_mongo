"use strict";

var express = require('express');

var morgan = require('morgan');

var mongoose = require('mongoose');

var router = require('./routes');

var app = express();
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json()); // let Schema = mongoose.Schema
// let testSchema = new Schema({
//     name: String
// })
// let Test = mongoose.model('Test', testSchema)

app.use('/contacts', router);
app.get('/', function (req, res) {// let test = new Test({
  //     name: 'Hamza Zahidul Islam'
  // })
  // test.save()
  //     .then(t => {
  //         res.json(t)
  //     })
  //     .catch(e => {
  //         console.log(e)
  //         res.status(500).json({
  //             error: "Error Occurred"
  //         })
  //     })
});
var PORT = process.env.PORT || 8080;
mongoose.connect("mongodb://localhost:27017/test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  app.listen(PORT, function () {
    console.log("Server Runnig on PORT ".concat([PORT]));
  });
})["catch"](function (e) {
  console.log(e);
});