

var width = parseInt(d3.select("#scatter").style("width"));

var height = width - width / 3.9;

var margin = 20;

var labelArea = 110;

var tPadBot = 40;

var tPadLeft = 40;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

var circRadius;
function crGet() {
    if (width <= 530) {
        circRadius = 5;
    }
    else {
        circRadius = 10;
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
        (height - margin - tPadBot) +
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
    .attr("y", 26)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Lacks Healthcare (%)");


d3.csv("assets/data/data.csv").then(function (data) {

    visualize(data);

});

function visualize(theData) {
var curX = "poverty";
var curY = "healthcare";

var xMin;
var yMin;
var xMax;
var yMax;

var tooltip = d3
    .tip()
    .attr("class","d3-tip")
    .offset([40, -60])
    .html(function(d) {
        var theX;
        var theState = "<div>" + d.state + "</div>";
        var theY = "<div>" + curY + ": " + d[curY] + "%</div>";
        if (curX=== "poverty") {
            theX = "<div>" + curX + ": " + d[curX] + "%</div>";
        }
        else {
            theX = "<div>" + 
                curX +
                ": " +
                parseFloat(d[curX]).toLocaleString("en")+
                "</div>";
        }
        return theState + theX + theY;
    });
svg.call(tooltip);

function yMinMax() {
    yMin = d3.min(theData, function(d) {
        return parseFloat(d[curY])*0.90;
    })
    yMax = d3.min(theData, function(d) {
        return parseFloat(d[curY])*1.10;
    })
}

function xMinMax() {
    xMin = d3.min(theData, function(d) {
        return parseFloat(d[curX])*0.90;
    })
    xMax = d3.min(theData, function(d) {
        return parseFloat(d[curX])*1.10;
    })
}

function labelChange(axis, clickedText) {
    d3
        .selectAll(".aText")
        .filter(". " + axis)
        .filter(".active")
        .classed("active", false)
        .classed("inactive", true);

    clickedText.classed("inactive", false).classed("active",true);
}


xMinMax();
yMinMax();

var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range ([height - margin - labelArea, margin]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);
function tickCount() {
    if (width <= 500) {
        xAxis.ticks(5);
        yAxis.ticks(5);
    }
    else {
        xAxis.ticks(10);
        yAxis.ticks(10); 
    }
}
tickCount();

svg 
    .append("g")
    .call (xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
svg
    .append("g")
    .call (yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ",0)");

var  theCircles = svg.selectAll("g theCircles").data(theData).enter();

theCircles
    .append("circle")
    .attr("cx", function(d){
        return xScale(d[curX]);
    })
    .attr("cy", function(d){
        return xScale(d[curY]);
    })
    .attr("r", circRadius)
    .attr("class", function(d) {
        return "stateCircle" + d.abbr;
    })
    .on("mouseover", function(d) {
        tooltip.show(d. this);
        d3.select(this).style("stroke","#323232");
    })
    .on("mouseout", function(d) {
        tooltip.hide(d);
        d3.select(this).style("stroke","#e3e3e3");
    });

    theCircles
        .append("text")
        .text(function(d) {
            return d.abbr;
        })
        .attr("dx", function (d) {
            return xScale(d[curX]);
        })
        .attr("dy", function(d){
            return yScale(d[curY]) + circRadius/2.5;
        })
        .attr("font-size", circRadius)
        .attr("class", "stateText")

        .on("mousover", function(d) {
            tooltip.show(d);
            d3.select("." + d.abbr).style("stroke", "#323232");
        })
        .on("mouseout", function(d) {
            tooltip.hide(d);
            d3.select("." + d.abbr).style("stroke", "#e3e3e");
        });


}