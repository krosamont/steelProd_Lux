// Message to make it "readable" by shiny.
// jsondata is the message name 
Shiny.addCustomMessageHandler("jsondata",
function(message){
d3.select("svg").remove();

var id = '#multiLines';
// message represents data from R 
var data =  message;

//Define the canvas size
var margin = {top: 30, right: 250, bottom: 70, left: 50},
    width = 1260 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.timeParse("%Y");

// Set the ranges
var x = d3.scaleTime().range([0, width]);  
var y = d3.scaleLinear().range([height, 0]);

// Define the line
var priceline = d3.line()	
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.value); });

d3.select("*").style("box-sizing", "initial");
// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
    data.forEach(function(d) {
		d.year = parseDate(d.year);
		d.value = +d.value;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([0, 500000]);

    // Nest the entries by symbol
    var dataNest = d3.nest()
        .key(function(d) {return d.country;})
        .entries(data);

    // set the colour scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var formatComma = d3.format(",.2f");	
    legendSpace = width/dataNest.length; // spacing for the legend

	
	
    // Loop through each symbol / key
    dataNest.forEach(function(d,i) { 
	    
	
       var path = svg.append("path")
		    .attr("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); })
			.attr("class", "line")
			.attr("stroke-width", 2)
			.style("fill", "none")
            .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign an ID
            .attr("d", priceline(d.values));
			
		var totalLength = path.node().getTotalLength();

        path.attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);	
	
	var n = d.values.length-1
        // Add the Legend
        svg.append("text")
		   .style("fill", function() { // Add the colours dynamically
                return d.color; })
		   .attr("class", "legend")
		   .attr("transform", function() {return "translate(" + (x(d.values[n].year)+3) +","+  y(d.values[n].value) +")"} ) 
		   //.attr("x", function() {return x(d.values[n].year) +3})  // space legend
           //.attr("y", function() {return y(d.values[n].value) })
		   .style("font-size", "0px")
		   .transition()
		   .delay(2005)
		    .style("font-size", "14px")
		    .style("font-weight", 600) // style the legend
	        .text(d.key); 
	});
	
      svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Steel Products (t)")
      .attr("id", "label_y");

  // Add the X Axis
  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).tickSizeOuter([0]));
});