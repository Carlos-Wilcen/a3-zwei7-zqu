var margin = {top: 5, right: 5, bottom: 5, left: 30},
    width = 220 - margin.left - margin.right,
    height = 110 - margin.top - margin.bottom;

var formatYear = d3.time.format("%Y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var currentview = "pricechart";
function SwitchView()
{
  var button = d3.select("#SwitchButton")
  if(currentview === "pricechart")
  {
    console.log("Switch to percent chart!");  
    currentview = "percentchart";
    showpercentcharts();
    button.text("Show Retail & Farm Prices");
  }
  else if(currentview === "percentchart")
  {
    console.log("Switch to price chart!");  
    currentview = "pricechart";
    showpricecharts();
    button.text("Show Farm/Retail Percentage");
  }
}

function showpricecharts()
{
  d3.select("#columns").selectAll(".svgrow").remove();
  // Price Charts
  // dairies
  pricechart("#dairycolumn", "data/butter.csv", "butter");
  pricechart("#dairycolumn", "data/cheese.csv", "cheese");
  pricechart("#dairycolumn", "data/ice_cream.csv", "ice cream");
  pricechart("#dairycolumn", "data/whole_milk.csv", "whole milk");

  // vegetables
  pricechart("#veggicolumn", "data/broccoli.csv", "broccoli");
  pricechart("#veggicolumn", "data/iceberg_lettuce.csv", "iceberg lettuce");
  pricechart("#veggicolumn", "data/potatoes.csv", "potatoes");
  pricechart("#veggicolumn", "data/tomatoes.csv", "tomatoes");

  // fruits 
  pricechart("#fruitcolumn1", "data/apples.csv", "apples");
  pricechart("#fruitcolumn1", "data/grapefruit.csv", "grapefruit");
  pricechart("#fruitcolumn1", "data/grapes.csv", "grapes");
  pricechart("#fruitcolumn1", "data/lemons.csv", "lemons");
  pricechart("#fruitcolumn2", "data/oranges.csv", "oranges");
  pricechart("#fruitcolumn2", "data/peaches.csv", "peaches");
  pricechart("#fruitcolumn2", "data/pears.csv", "pears");
  pricechart("#fruitcolumn2", "data/strawberries.csv", "strawberries");

  // time axies
  drawtimeaxis();
}

function showpercentcharts()
{
  d3.select("#columns").selectAll(".svgrow").remove();
  // Percent Charts
  // dairies
  percentchart("#dairycolumn", "data/butter.csv", "butter");
  percentchart("#dairycolumn", "data/cheese.csv", "cheese");
  percentchart("#dairycolumn", "data/ice_cream.csv", "ice cream");
  percentchart("#dairycolumn", "data/whole_milk.csv", "whole milk");

  // vegetables
  percentchart("#veggicolumn", "data/broccoli.csv", "broccoli");
  percentchart("#veggicolumn", "data/iceberg_lettuce.csv", "iceberg lettuce");
  percentchart("#veggicolumn", "data/potatoes.csv", "potatoes");
  percentchart("#veggicolumn", "data/tomatoes.csv", "tomatoes");

  // fruits 
  percentchart("#fruitcolumn1", "data/apples.csv", "apples");
  percentchart("#fruitcolumn1", "data/grapefruit.csv", "grapefruit");
  percentchart("#fruitcolumn1", "data/grapes.csv", "grapes");
  percentchart("#fruitcolumn1", "data/lemons.csv", "lemons");
  percentchart("#fruitcolumn2", "data/oranges.csv", "oranges");
  percentchart("#fruitcolumn2", "data/peaches.csv", "peaches");
  percentchart("#fruitcolumn2", "data/pears.csv", "pears");
  percentchart("#fruitcolumn2", "data/strawberries.csv", "strawberries");
  
  // time axies
  drawtimeaxis();
}

function pricechart(column, individual_food, caption)
{

  var retailprice = d3.svg.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.retail); });

  var farmprice = d3.svg.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.farm); });

  var svgrow = d3.select(column).append("tr")
      .attr("class", "svgrow");

  var svg = svgrow.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv(individual_food, function(error, data) {
    data.forEach(function(d) {
      d.year = formatYear(d.year);
      d.retail = d.retail;
      d.farm = d.farm;
    });

    x.domain( [formatYear("2000"), formatYear("2012")] );
    var max = d3.extent(data, function(d) { return d.retail; });
    y.domain( [0, d3.max(max)] );

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
        /*
      .append("text")
        .attr("transform", "translate(-30,0), rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");
        */

    svg.append("path")
        .datum(data)
        .attr("class", "retailline")
        .attr("d", retailprice);

    svg.append("path")
        .datum(data)
        .attr("class", "farmline")
        .attr("d", farmprice);
    
    
    svg.append("text")
        .text(caption)
        .attr("x", 0)
        .attr("y", 15)
        .style("text-anchor", "start");
        
  });

}

function percentchart(column, individual_food, caption)
{

  var percentline = d3.svg.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.percent); });
  
  var svgrow = d3.select(column).append("tr")
      .attr("class", "svgrow");

  var svg = svgrow.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv(individual_food, function(error, data) {
    data.forEach(function(d) {
      d.year = formatYear(d.year);
      d.percent = d.percent;
    });

    x.domain( [formatYear("2000"), formatYear("2012")] );
    var max = d3.extent(data, function(d) { return d.percent; });
    y.domain( [0, d3.max(max)] );

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
        /*
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Farm/Retail %");
        */

    svg.append("path")
        .datum(data)
        .attr("class", "percentline")
        .attr("d", percentline);

    
    svg.append("text")
        .text(caption)
        .attr("x", 0)
        .attr("y", 15)
        .style("text-anchor", "start");
        
    
  });

}

function drawtimeaxis()
{
  x.domain( [formatYear("2000"), formatYear("2012")] );

  var svg = d3.select("#columns").selectAll(".datacolumn").append("tr")
    .attr("class", "svgrow")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  svg.append("g")
        .attr("class", "time axis")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(xAxis);


}
