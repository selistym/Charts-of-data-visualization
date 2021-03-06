var dataset = [{
        title: "Soft-serve",
        value: 286
    },
    {
        title: "Scooped",
        value: 472
    },
    {
        title: "No Preference",
        value: 318
    },
    {
        title: "Not Sure",
        value: 22
    }
];

var width = 360;
var height = 360;
var radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal(d3.schemeCategory20b);

var svg = d3.select('#donut')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
        ',' + (height / 2) + ')');

var donutWidth = 75;

var arc = d3.arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

var pie = d3.pie()
    .value(function (d) {
        return d.value;
    })
    .sort(null);

var legendRectSize = 11;
var legendSpacing = 7;

var div = d3.select("body").append("div")
    .attr("class", "tooltip-donut")
    .style("opacity", 0);

var path = svg.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d, i) {
        return color(d.data.title);

    })
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.95');
        div.transition()
            .duration(200)
            .style("opacity", .9);
        let num = d.value;
        div.html(num)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px");

    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
        div.transition()
            .duration('200')
            .style("opacity", 0);

    });
//do mouseover stuff on path

var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'circle-legend')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = height * color.domain().length / 2;
        var horz = -2 * legendRectSize - 13;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('circle')
    .style('fill', color)
    .style('stroke', color)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', '.4rem');

legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) {
        return d;
    });