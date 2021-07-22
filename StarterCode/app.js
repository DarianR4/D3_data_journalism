// set the dimensions and margins of the graph
// var margin = {top: 10, right: 30, bottom: 30, left: 60},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");
// Load data from data.csv
// d3.csv("./data.csv").then(function(healthcareData) {

//     console.log(healthcareData)

var width = parseInt(d3.select("#scatter").style("width"));
var height = width - width / 4;
var margin = 20;
var labelArea = 110;
var tPadBottom = 40;
var tPadLeft = 40;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

var circleRadius;
function crGet() {
    if (width <= 530) {
        circleRadius = 5;
    }
    else {
        circleRadius = 10;
    }
}
crGet();

// labels for the X axis

svg.append("g").attr("class", "xText");

var xText = d3.select(".xText");

function xTextRefresh() {
    xText.attr(
        "transform",
        "translate(" +
        ((width - labelArea) / 2 + labelArea) +
        ", " +
        (height - margin - tPadBottom) + 
        ")"
    );
}
xTextRefresh();

// Chart 1 infor

xText
    .append("text")
    .attr("y", -26)
    .attr("data-name", "Poverty")
    .attr("data-axis", "x")
    .attr("class", "aText active x")
    .text("In Poverty (%)");

// Lables for Y axis

var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

svg.append("g").attr("class", "yText");

var yText = d3.select(".yText");
function yTextRefresh() {
    yText.attr(
        "transform",
        "translate(" + leftTextX + "," + leftTextY + ")rotate(-90)"
    );

}
yTextRefresh();

yText
    .append("text")
    .attr("y",26)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Lacks Healthcare (%)");


d3.csv("assets/data/data.csv").then(function (data) {

    visualize(data);

});