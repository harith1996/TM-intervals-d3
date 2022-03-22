import * as d3 from "d3";
import "d3-color";
import "d3-interpolate";
import "d3-scale-chromatic";

export default function tmIntervals(
	extent = [0, 24],
	minIntervalLength = 1,
	unit = "hours"
) {
	let dateStart = new Date(2018, 11, 24, 10, 0, 0, 0);
	let intervalLengthInMs = 1 * 60 * 60 * 1000;
	let data = [...Array(1000).keys()].map((i) => {
		let item = {};
		item.start = dateStart.getTime();
		item.end = item.start + intervalLengthInMs;
		item.value = Math.random() * 1000 + 500;
        dateStart.setTime(dateStart.getTime() + intervalLengthInMs + 1);
		return item;
	});

    // Add X axis
    const x = d3.scaleLinear().domain([0, 24]).range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, 50000]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    
}
