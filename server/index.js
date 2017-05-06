// Import modules
const express = require('express');
var app = express();
const path = require('path');
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var casual = require('casual');
var async = require('async');
var _ = require('underscore');
var fs = require('fs');

// Set server parameters
const MOCK_SERVER_PORT = 3000;
const TEST_CHAR_LENGTHS = [31, 25, 20, 15, 10, 5, 1];
// const DATABASE_WORD_COUNT = 5000000;

// Enable cors support for cross origin api requests (ONLY FOR DEV)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'dist')));

// Generate fake database;
// var master_list = casual.array_of_words(DATABASE_WORD_COUNT);
var master_list = fs.readFileSync('words.txt').toString().split("\n");

var lgth = 0;
var longest;
var test_keywords = []

for(var i=0; i < master_list.length; i++){
    if(master_list[i].length > lgth){
        var lgth = master_list[i].length;
        longest = master_list[i];
    }
}

// Shuffle function
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

var shuffle_list = master_list;
shuffle(shuffle_list);

for(var i=0; i < shuffle_list.length; i++){
    if(shuffle_list[i].length == TEST_CHAR_LENGTHS[0]){
      test_keywords.push(shuffle_list[i]);
      TEST_CHAR_LENGTHS.shift()
  }
}

console.log("Keywords for testing: \n***********************");
console.log(test_keywords);
console.log("\n****************************");


console.log("Database Generated with " + master_list.length + " words!");
console.log("Longest word in the DB is: " + longest + " with " + longest.length + " letters.");


// console.log(master_list);

// Define API endpoints below >>>>>>>

// Default endpoint
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

// Endpoint for responding to promises
app.get('/promise', function(req, res) {
  console.log("/promise \t -> \t " + req.query.keyword);
  var result = _.filter(master_list, function(item){ return item.match("^" + req.query.keyword)})
  res.send({'data': [...new Set(result)].sort().slice(0,10)});
})

// Endpoint for responding to observables
app.get('/observable', function(req, res) {
  console.log("/observable \t -> \t " + req.query.keyword);
  var result = _.filter(master_list, function(item){ return item.match("^" + req.query.keyword)})
  res.send({'data': [...new Set(result)].sort().slice(0,10)});
})

// websocket endpoint for responding to realtime requests
io.on('connection', function(socket) {
  console.log("Client connected via websockets");

  socket.on('request', function(data) {
    console.log("CHANNEL: request \t -> \t " + data);
    var result = _.filter(master_list, function(item){ return item.match("^" + data)});
    console.log([...new Set(result)].sort().slice(0,10));
    socket.emit('predictions', {'data': [...new Set(result)].sort().slice(0,10)})
  });

  socket.on('sync', function(data) {
    console.log("CHANNEL: sync \t -> \t " + data);
    var result = _.filter(master_list, function(item){ return item.match("^" + data)});
    socket.emit('sync_response', {'query': data, 'data' : [...new Set(result)].sort().slice(0,10)});
    socket.broadcast.emit('cache_sync', {'query': data, 'data' : [...new Set(result)].sort().slice(0,10)});
  });
  // socket.emit('predictions', {data: ["Hello World"]});
  // socket.on('')
})

// API endpoint definition END >>>>>>>

// Expose server on a specific port
server.listen(MOCK_SERVER_PORT, function() {
  console.log(`Listening on http://localhost:${MOCK_SERVER_PORT}`);
})
