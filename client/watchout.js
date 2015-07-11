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

var player = Player();

// Create Enemies
var createEnemies = function(data) {

  var enemies = svg.selectAll(".enemy")
    .data(data, function(d) { return d.id; });

  enemies.enter()
    .append("svg:image")
      .attr("xlink:href", "shuriken.png")      
      .attr("width", enemySize)
      .attr("height", enemySize)
      .classed("enemy", true)
    // .append("animateTransform")
    //   .attr("attributeType", "xml")
    //   .attr("attributeName", "transform")
    //   .attr("type", "rotate")
    //   .attr("from", function() {
    //     var enemy = d3.select(this);
    //     return "0 " + (enemy.attr("x") + 15) + " " + (enemy.attr("y") + 15);
    //   })
    //   .attr("to", function() {
    //     var enemy = d3.select(this);
    //     return "360 " + (enemy.attr("x") + 15) + " " + (enemy.attr("y") + 15);
    //   })
    //   .attr("dur", "4s")
    //   .attr("repeatCount", "indefinite")

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

var assignEnemyData = function() {

  var data = [];
  for (var i = 0; i < enemyNum; i++) {
    var enemy = {};
    enemy.id = i;
    enemy.x = width * Math.random();
    enemy.y = height * Math.random();
    data.push(enemy);
  }

  return data;
}

var checkForCollision = function() {
  var enemies = svg.selectAll(".enemy");
  var tempPlayer = d3.select(".player");
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

// Game Loop
var enemyData = assignEnemyData();
createEnemies(enemyData);

setInterval(function() {

  // Create and assign new Enemy Data
  var enemyData = assignEnemyData();

  // Make them follow the data
  createEnemies(enemyData);

}, speed);

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

    





