// Create a function that takes a single number as input and draws a spiral of that size

const drawSpiral = () => {
    document.getElementById('spiral').innerHTML = '';
    const size = document.getElementById('input').value || 400;
    const start = 0;
    const end = 4;

    const svg = d3.select('#spiral')
    .append('svg')
    .attr('width', size)
    .attr('height', size)
    .append('g')
    .attr('transform', `translate(${size / 2}, ${size / 2 + 8})`)

    const theta = r => 2 * Math.PI * r;
    const r = size / 2;
    const points = d3.range(start, end + 0.001, (end - start) / 1000);

    const radius = d3.scaleLinear()
    .domain([start, end])
    .range([0, r]);

    const spiral = d3.lineRadial()
    .angle(theta)
    .radius(radius)

    svg.selectAll('path')
    .data([points])
    .enter()
    .append('path')
    .attr("fill", "none")
    .attr('stroke', 'red')
    .attr('stroke-width', '2px')
    .attr("d", spiral)
}