var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client/index.html');
});

app.get('/watchout.js', function (req, res) {
  res.sendfile(__dirname + '/client/watchout.js');
});

app.get('/styles.css', function (req, res) {
  res.sendfile(__dirname + '/client/styles.css');
});

app.get('/lib/d3.js', function (req, res) {
  res.sendfile(__dirname + '/client/lib/d3.js');
});

app.get('/lib/jquery-2.1.4.js', function (req, res) {
  res.sendfile(__dirname + '/client/lib/jquery-2.1.4.js');
});

app.get('/lib/underscore.js', function (req, res) {
  res.sendfile(__dirname + '/client/lib/underscore.js');
});

app.get('/Player.js', function (req, res) {
  res.sendfile(__dirname + '/client/Player.js');
});

app.get('/shuriken.png', function (req, res) {
  res.sendfile(__dirname + '/client/shuriken.png');
});



var createEnemyData = function() {

  var data = [];
  for (var i = 0; i < 20; i++) {
    var enemy = {};
    enemy.id = i;
    enemy.x = 600 * Math.random();
    enemy.y = 400 * Math.random();
    data.push(enemy);
  }

  return data;
}

var currentID = 0;
var players = [];
io.on("connection", function(socket) {
  players[currentID] = {cx: Math.random() * 100, cy: Math.random() * 100, id: currentID};
  io.sockets.emit('allPlayerPos', players);
  socket.emit('id', currentID);

  socket.on("playerPos", function(data) {
    players[data.id] = data;
    io.sockets.emit('allPlayerPos', players);
  })
  currentID++;
});

io.sockets.emit('news', { hello: 'world' });
io.sockets.emit('enemyData', createEnemyData());
setInterval(function() {
  io.sockets.emit('enemyData', createEnemyData());
}, 1900);



