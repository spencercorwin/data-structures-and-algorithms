// Create a function that takes a single number as input and draws a spiral of that size
// https://cdnjs.cloudflare.com/ajax/libs/d3/3.0.0/d3.min.js
// import d3 from 'd3';

const drawSpiral = () => {
    const size = document.getElementById('input').value;
    const width = 400;
    const height = 430;
    const start = 0;
    const end = 3;

    const svg = d3.select('#spiral')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2 + 8})`)

    const theta = r => 2 * Math.PI * r;
    const r = d3.min([width, height]) / 2 - 40;
    const points = d3.range(start, end + 0.001, (end - start) / 1000);

    const radius = d3.scale.linear()
    .domain([start, end])
    .range([0, r]);

    const spiral = d3.svg.line.radial()
    .interpolate('cardinal')
    .angle(theta)
    .radius(radius)

    /*
    svg.append('path')
    .data([points])
    .enter()
    .attr('class', 'spiral')
    .attr('d', line)
    */

    const path = svg.selectAll(".spiral")
    .data([points])
    .enter()
    .append("path")
    .attr("class", "spiral")
    .attr("d", spiral)
}