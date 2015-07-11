// start slingin' some d3 here.

// Create SVG
var width = 600;
var height = 400;
var enemyNum = 20;
var score = 0;
var highScore = 0;
// var collisions = 0;
var speed = 1300;


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
    .append("circle")
    .attr("r", 10)
    .attr("fill", "blue")
    .classed("enemy", true);

  enemies.exit()
    .remove();

  enemies.transition()
    .duration(speed)
    .tween("collisionTween", function(d) {

      var enemy = d3.select(this);
      var startPositionX = Number(enemy.attr("cx"));
      var startPositionY = Number(enemy.attr("cy"));
      var endPositionX = d.x;
      var endPositionY = d.y;

      return function(time) {

        checkForCollision();
        var newX = Math.floor(startPositionX + (endPositionX - startPositionX) * time);
        var newY = Math.floor(startPositionY + (endPositionY - startPositionY) * time);  
        enemy.attr("cx", newX);
        enemy.attr("cy", newY);
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
    var enemy = d3.select(this)
    var enemyXPosition = enemy.attr("cx");
    var enemyYPosition = enemy.attr("cy");

    var distance = Math.sqrt((enemyXPosition - playerXPosition) * (enemyXPosition - playerXPosition) + (enemyYPosition - playerYPosition) * (enemyYPosition - playerYPosition));
    if (distance < 15) {
      player.collide();
    }  
  });
}  

// var collide = _.throttle(function() {
//   collisions++;
//   score = 0;
// }, 700, {trailing: false});



// Create Player
// svg.append("circle")
//   .attr("cx", width * Math.random())
//   .attr("cy", height * Math.random())
//   .attr("r", 10)
//   .attr("fill", "orange")
//   .classed("player", true)
//   .classed("draggable", true);

// var drag = d3.behavior.drag()
//     .on("drag", dragmove);
// d3.selectAll(".draggable").call(drag);


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

// setInterval(function() {
//   var isCollision = checkForCollision();

// }, 16);

// function dragmove(d) {
//   if (d3.event.x > 10 && d3.event.x < width - 10 && d3.event.y > 10 && d3.event.y < height - 10) {
//     d3.select(".player")
//         .attr("cx", d3.event.x)
//         .attr("cy", d3.event.y);
//     }
// }


    





