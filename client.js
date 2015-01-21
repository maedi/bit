//// AUTH ////

var request = require('request');
var bitauth = require('./node_modules/bitauth/lib/bitauth'); // not all of library

// These can be generated with bitauth.generateSin()
var keys = {
  alice: '38f93bdda21a5c4a7bae4eb75bb7811cbc3eb627176805c1009ff2099263c6ad',
  bob: '09880c962437080d72f72c8c63a69efd65d086c9e7851a87b76373eb6ce9aab5'
};

// GET

for(k in keys) {
  var url = 'http://localhost:3000/user';
  var dataToSign = url;
  var options = {
    url: url,
    headers: {
      'x-identity': bitauth.getPublicKeyFromPrivateKey(keys[k]),
      'x-signature': bitauth.sign(dataToSign, keys[k])
    }
  };

  request.get(options, function(err, response, body) {
    if(err) {
      console.log(err);
    }
    if(body) {
      console.log(body);
    }
  });
}

var pizzas = ['pepperoni', 'sausage', 'veggie', 'hawaiian'];

// POST

for(k in keys) {
  var url = 'http://localhost:3000/pizzas';
  var data = {type: pizzas[Math.floor(Math.random() * pizzas.length)]};
  var dataToSign = url + JSON.stringify(data);
  var options = {
    url: url,
    headers: {
      'x-identity': bitauth.getPublicKeyFromPrivateKey(keys[k]),
      'x-signature': bitauth.sign(dataToSign, keys[k])
    },
    json: data
  };

  request.post(options, function(err, response, body) {
    if(err) {
      console.log(err);
    }
    if(body) {
      console.log(body);
    }
  });
}

//// TORRENT ////

//var DHT    = require('bittorrent-dht')
//var magnet = require('magnet-uri')
//
//var uri = 'magnet:?xt=urn:btih:e3811b9539cacff680e418124272177c47477157'
//var parsed = magnet(uri)
//
//console.log(parsed.infoHash) // 'e3811b9539cacff680e418124272177c47477157'
//
//var dht = new DHT()
//
//dht.listen(20000, function () {
//  console.log('now listening')
//})

//dht.on('ready', function () {
//  // DHT is ready to use (i.e. the routing table contains at least K nodes, discovered
//  // via the bootstrap nodes)
//
//  // find peers for the given torrent info hash
//  dht.lookup(parsed.infoHash)
//})
//
//dht.on('peer', function (addr, hash, from) {
//  console.log('found potential peer ' + addr + ' through ' + from)
//})
