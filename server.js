var express = require('express');
var bodyParser = require('body-parser');
var rawBody = require('./node_modules/bitauth/lib/middleware/rawbody');
var bitauth = require('./node_modules/bitauth/lib/middleware/bitauth');

var users = {
  'Tf7UNQnxB8SccfoyZScQmb34V2GdEtQkzDz': {name: 'Alice'},
  'Tf22EUFxHWh4wmA3sDuw151W5C5g32jgph2': {name: 'Bob'}
};

var pizzas = [];

var app = express();
app.use(rawBody);
app.use(bodyParser());

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/user', bitauth, function(req, res) {
  if(!req.sin || !users[req.sin]) return res.send(401, {error: 'Unauthorized'});
  res.status(200).send(users[req.sin]);
});

app.post('/pizzas', bitauth, function(req, res) {
  if(!req.sin || !users[req.sin]) return res.send(401, {error: 'Unauthorized'});
  var pizza = req.body;
  pizza.owner = users[req.sin].name;
  pizzas.push(pizza);
  res.send(200, req.body);
});

app.get('/pizzas', function(req, res) {
  res.status(200).send(pizzas);
});

app.listen(3000);
