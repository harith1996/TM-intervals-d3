import * as d3 from "d3";
import "d3-color";
import "d3-interpolate";
import "d3-scale-chromatic";
export default function scatterplot(root = "my_dataviz") {
	root = "#" + root;
	const margin = { top: 10, right: 30, bottom: 30, left: 60 },
		width = 800 - margin.left - margin.right,
		height = 700 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	const svg = d3
		.select(root)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	//Read the data
	// d3.csv(
	// 	"https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
	// ).then(function (data) {

	const yAxisName = "SensorReading";
	const xAxisName = "GrLivArea";
	const yAxisScale = 10000, yAxisMin= 30000;
	const yAxisRoundTo = 1000;
	const xAxisScale = 1000, xAxisMin = 500;
	let data = [...Array(1000).keys()].map((i) => {
		let item = {};
		let rand = Math.random() * yAxisScale + yAxisMin;
		let value = rand;
		if (rand % 1 > 0.9) {
			value = Math.floor(rand / yAxisRoundTo) * yAxisRoundTo;
		}
		item[yAxisName] = value;
		item[xAxisName] = Math.random() * xAxisScale + xAxisMin;
		return item;
	});
	// Add X axis
	const x = d3.scaleLinear().domain([0, 1.5 * xAxisScale + xAxisMin ]).range([0, width]);
	svg.append("g")
		.attr("transform", `translate(0, ${height})`)
		.call(d3.axisBottom(x));

	svg.append("text")
		.attr("class", "x label")
		.attr("text-anchor", "end")
		.attr("x", width)
		.attr("y", height - 6)
		.text("Area of venue (square feet)");

	// Add Y axis
	const y = d3.scaleLinear().domain([0, 1.5 * yAxisScale + yAxisMin]).range([height, 0]);
	svg.append("g").call(d3.axisLeft(y));
	svg.append("text")
		.attr("class", "y label")
		.attr("text-anchor", "end")
		.attr("y", 6)
		.attr("dy", ".75em")
		.attr("transform", "rotate(-90)")
		.text("Sensor Reading");

	// Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
	// Its opacity is set to 0: we don't see it by default.
	const tooltip = d3
		.select(root)
		.append("div")
		.style("opacity", 0)
		.attr("class", "tooltip")
		.style("background-color", "white")
		.style("border", "solid")
		.style("border-width", "1px")
		.style("border-radius", "5px")
		.style("padding", "10px")
		.style("position", "absolute");

	// A function that change this tooltip when the user hover a point.
	// Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
	const mouseover = function (event, d) {
		tooltip.style("opacity", 1);
	};

	const mousemove = function (event, d) {
		tooltip
			.html(
				`Sensor Reading: ${d[yAxisName]}`
			)
			.style("left", event.x + 20 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
			.style("top", event.y + 20 + "px");
	};

	// A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
	const mouseleave = function (event, d) {
		tooltip.transition().duration(200).style("opacity", 0);
	};

	// Add dots
	svg.append("g")
		.selectAll("dot")
		.data(
			data.filter(function (d, i) {
				return i < 50;
			})
		) // the .filter part is just to keep a few dots on the chart, not all of them
		.enter()
		.append("circle")
		.attr("cx", function (d) {
			return x(d[xAxisName]);
		})
		.attr("cy", function (d) {
			return y(d[yAxisName]);
		})
		.attr("r", 7)
		.style("fill", (d) => {
			if (d[yAxisName] % 1 === 0) {
				return "#DE521F";
			} else return "#69b3a2";
		})
		.style("opacity", 0.3)
		.style("stroke", "white")
		.on("mouseover", mouseover)
		.on("mousemove", mousemove)
		.on("mouseleave", mouseleave);
	return svg;
}
