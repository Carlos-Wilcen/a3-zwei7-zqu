function showbarchart()
{
	var width = 300;
	var height = 200;
	var offset_x = 220*4 + 60;
	var offset_y = 110*4 - height;

	var svg = d3.select("svg");

	var barchart = svg.append("g")
	   .attr("class", "barchart")
	   .attr("transform", "translate(" + offset_x + ", " + offset_y + ")");

	var x = d3.scale.ordinal()
	    .domain(["-", "retail", "farm", "."])
        .rangePoints([0, width]);

	var y = d3.scale.linear()
	    .rangeRound([height, 0])
	    .domain([0,500]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .tickFormat(d3.format(".2s"));

	barchart.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

    barchart.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    
    var palette = ["#FF0000", "#FF6600", "#FF9900", "#FFCC00",
                    "#003300", "#006600", "#009900", "#00CC00",
                    "#CC0066", "#CC3366", "#CC6666", "#CC9966",
                    "#999966", "#996666", "#993366", "#990066"];
    for(var j=0; j<16; j++)
    {
      barchart.append("rect")
        .attr("width", 40)
        .attr("x", x("retail")-20)
        .attr("class", "retailrect")
        .attr("fill", palette[j]);	
    }

    for(var j=0; j<16; j++)
    {
      barchart.append("rect")
        .attr("width", 40)
        .attr("x", x("farm")-20)
        .attr("y", 10)
        .attr("class", "farmrect")
        .attr("fill", palette[j]);	
    }
      
    
    
    


    
}
