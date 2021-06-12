// MEAN Stack RESTful API Milwaukee Bucks

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('playerlist', ['playerlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/playerlist', function (req, res) {
  console.log('I received a GET request');

  db.playerlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/playerlist', function (req, res) {
  console.log(req.body);
  db.playerlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/playerlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.playerlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/playerlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.playerlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/playerlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.playerlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");