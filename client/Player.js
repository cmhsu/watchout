var Player = function() {
  var obj = {};

  var dragmove = function(d) {
  if (d3.event.x > 10 && d3.event.x < width - 10 && d3.event.y > 10 && d3.event.y < height - 10) {
    d3.select(".player")
        .attr("cx", d3.event.x)
        .attr("cy", d3.event.y);
    }
  }

  obj.collisions = 0;
  obj.collide = _.throttle(function() {
    obj.collisions++;
    score = 0;
  }, 700, {trailing: false});

  d3.select("svg").append("circle")
    .attr("cx", width * Math.random())
    .attr("cy", height * Math.random())
    .attr("r", 10)
    .attr("fill", "orange")
    .classed("player", true)
    .classed("draggable", true);

  var drag = d3.behavior.drag()
    .on("drag", dragmove);
  d3.selectAll(".draggable").call(drag);


  return obj;
};