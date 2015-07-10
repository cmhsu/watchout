// start slingin' some d3 here.

// Create SVG
var width = 700;
var height = 500;
var enemyNum = 20;

var svg = d3.select("body")
    .append("svg")
      .style("width", width)
      .style("height", height)
      .style("background-color", "aliceblue")

// Create Enemies
var createEnemies = function(data) {

  var enemies = svg.selectAll(".enemy")
    .data(data, function(d) { return d.id; });

  enemies.enter()
    .append("circle")
    .attr("r", 10)
    .attr("fill", "blue")
    .classed("enemy", true);

  enemies.transition()
    .duration(1000)

    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })


  enemies.exit()
    .remove();

}

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

// Create Player
svg.append("circle")
  .attr("cx", width * Math.random())
  .attr("cy", height * Math.random())
  .attr("r", 10)
  .attr("fill", "orange")
  .classed("player", true)
  .classed("draggable", true);

var drag = d3.behavior.drag()
    .on("drag", dragmove)
d3.selectAll(".draggable").call(drag);


// Game Loop
setInterval(function() {

  // Create and assign new Enemy Data
  var enemyData = assignEnemyData();

  // Make them follow the data
  createEnemies(enemyData);

}, 1000);

setInterval(function() {
  var isCollision = checkForCollision();

}, 1);

function dragmove(d) {
  if (d3.event.x > 10 && d3.event.x < width - 10 && d3.event.y > 10 && d3.event.y < height - 10) {
    d3.select(".player")
        .attr("cx", d3.event.x)
        .attr("cy", d3.event.y);
    }
}

function checkForCollision() {
  var enemies = svg.selectAll(".enemy");
  var player = svg.selectAll(".player");
  var playerXPosition = player.attr("cx"); 
  var playerYPosition = player.attr("cy");
  var collision = false;
  enemies.each(function(d) {
    var enemy = d3.select(this)
    var enemyXPosition = enemy.attr("cx");
    var enemyYPosition = enemy.attr("cy");
    var distance = Math.sqrt((d.x - playerXPosition) * (d.x - playerXPosition) + (d.y - playerYPosition) * (d.y - playerYPosition));
    if (distance < 30) {
      alert('hiiiiiiiiiiiiiiii');
    }  
  });
  return collision;
}  
    





