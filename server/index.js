// Import modules
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var casual = require('casual');
var async = require('async');
var _ = require('underscore');

// Set server parameters
const MOCK_SERVER_PORT = 3000;
const DATABASE_WORD_COUNT = 1000000;

// Enable cors support for cross origin api requests (ONLY FOR DEV)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Generate fake database;
var master_list = casual.array_of_words(DATABASE_WORD_COUNT);
console.log("Database Generated!");
// console.log(master_list);

// Define API endpoints below >>>>>>>

// Default endpoint
app.get('/', function(req, res) {
  res.send('Hello World!')
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
  });
  // socket.emit('predictions', {data: ["Hello World"]});
  // socket.on('')
})

// API endpoint definition END >>>>>>>

// Expose server on a specific port
server.listen(MOCK_SERVER_PORT, function() {
  console.log(`Listening on http://localhost:${MOCK_SERVER_PORT}`);
})
