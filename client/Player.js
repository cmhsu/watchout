var Player = function() {
  var obj = {};

  var dragmove = function(d) {
    if (d3.event.x > 10 && d3.event.x < width - 10 && d3.event.y > 10 && d3.event.y < height - 10) {
      d3.select(".class" + id)
          .attr("cx", d3.event.x)
          .attr("cy", d3.event.y);
      
      socket.emit("playerPos", {
        cx: d3.event.x,
        cy: d3.event.y,
        id: id
      });
    }
  }

  obj.collisions = 0;
  obj.collide = _.throttle(function() {
    obj.collisions++;
    score = 0;
  }, 700, {trailing: false});

  // d3.select("svg").append("circle")
  //   .attr("cx", width * Math.random())
  //   .attr("cy", height * Math.random())
  //   .attr("r", 10)
  //   .attr("fill", "orange")
  //   .classed("player", true)
  //   .classed("draggable", true);

  var drag = d3.behavior.drag()
    .on("drag", dragmove);
  d3.select(".class" + id).call(drag);

  return obj;
};