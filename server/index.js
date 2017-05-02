// Import modules
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var casual = require('casual');

// Set server parameters
const MOCK_SERVER_PORT = 3000;
const DATABASE_WORD_COUNT = 10000;

// Generate fake database;
var master_list = casual.array_of_words(DATABASE_WORD_COUNT);
console.log("Database Generated!");

// Register a simple filter function
function predictionsFilter(value) {
  var results = [];

  for (i=0; i<master_list.length; i++){
    if (master_list[i].match(value)){
      results.push(master_list[i]);
    }
  }

  return results.sort().slice(0, 10);
}

// Define API endpoints below >>>>>>>

// Default endpoint
app.get('/', function(req, res) {
  res.send('Hello World!')
})

// Endpoint for responding to promises
app.get('/promise', function(req, res) {
  res.send({'data':predictionsFilter(req.query.keyword)})
})

// Endpoint for responding to observables
app.get('/observables', function(req, res) {

})

// websocket endpoint for responding to realtime requests
io.on('connection', function(socket) {
  socket.emit('predictions', {data: ["Hello World"]});
  // socket.on('')
})

// API endpoint definition END >>>>>>>

// Expose server on a specific port
server.listen(MOCK_SERVER_PORT, function() {
  console.log(`Listening on http://localhost:${MOCK_SERVER_PORT}`);
})
