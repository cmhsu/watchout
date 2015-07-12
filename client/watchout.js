// start slingin' some d3 here.

// Create SVG
var width = 600;
var height = 400;
var enemyNum = 20;
var enemySize = 30;
var score = 0;
var highScore = 0;
// var collisions = 0;
var speed = 1900;

var svg = d3.select("body")
    .append("svg")
      .style("width", width)
      .style("height", height)
      .style("background-color", "aliceblue")

// Create Enemies
var updateEnemies = function(data) {

  var enemies = svg.selectAll(".enemy")
    .data(data, function(d) { return d.id; });

  enemies.enter()
    .append("svg:image")
      .attr("xlink:href", "shuriken.png")      
      .attr("width", enemySize)
      .attr("height", enemySize)
      .classed("enemy", true)

  enemies.exit()
    .remove();

  enemies.transition()
    .duration(speed)
    .tween("collisionTween", function(d) {

      var enemy = d3.select(this);
      var startPositionX = Number(enemy.attr("x"));
      var startPositionY = Number(enemy.attr("y"));
      var endPositionX = d.x;
      var endPositionY = d.y;

      return function(time) {

        checkForCollision();
        var newX = Math.floor(startPositionX + (endPositionX - startPositionX) * time);
        var newY = Math.floor(startPositionY + (endPositionY - startPositionY) * time);  
        enemy.attr("x", newX);
        enemy.attr("y", newY);
      }
    });
};

var colors = ['blue', 'red', 'orange', 'pink', 'purple', 'black', 'green', 'brown']

var updatePlayers = function(data) {
  var players = svg.selectAll(".player")
    .data(data, function(d) {return d.id;});

  players.enter()
    .append("circle")
    .attr("r", 10)
    .each(function(d) {
      d3.select(this).classed("class" + d.id, true)
    })
    .classed("player", true)
    .classed("draggable", true);

  players.exit()
    .remove()

  players.attr("cx", function(d) { return d.cx; })
    .attr("cy", function(d) { return d.cy; })
    .attr("fill", function(d) {
      return colors[d.id];
    });
};

socket.on("allPlayerPos", function(data) {
  updatePlayers(data);
});

var checkForCollision = function() {
  var enemies = svg.selectAll(".enemy");
  var tempPlayer = d3.select(".class" + id);
  var playerXPosition = Math.floor(tempPlayer.attr("cx")); 
  var playerYPosition = Math.floor(tempPlayer.attr("cy"));

  enemies.each(function(d) {
    var enemy = d3.select(this);
    var enemyXPosition = +enemy.attr("x") + enemySize / 2;
    var enemyYPosition = +enemy.attr("y") + enemySize / 2;

    var distance = Math.sqrt((enemyXPosition - playerXPosition) * (enemyXPosition - playerXPosition) + (enemyYPosition - playerYPosition) * (enemyYPosition - playerYPosition));
    if (distance < enemySize) {
      player.collide();
    }  
  });
}  

socket.on('enemyData', function (data) {
  updateEnemies(data);
});

setInterval(function() {
  score++;
  d3.select(".current span")
    .text(score);

  if (score > highScore) {
    highScore = score;
    d3.select(".high span")
    .text(highScore);
  }

  d3.select(".collisions span")
    .text(player.collisions);

}, 50)

    





