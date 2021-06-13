import React from 'react';
import * as d3 from 'd3';
import './chart.component.scss';

export default class ChartComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.updateChart();
    }

    componentDidMount() {
        this.svg = this.addNewSVG();
        this.initChart();
    }

    initChart() {
        let xScale = this.xScale(this.props.data);
        let yScale = this.yScale(this.props.data);
        this.svg.selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => this.props.swap ? 0 : xScale(d))
            .attr('y', (d, i) => yScale(i))
            .attr('width', (d, i) => this.props.width - xScale(d))
            .attr('height', (this.props.height / this.props.data.length))
            .style('fill', this.props.color || 'gray');
    }

    updateChart() {
        let xScale = this.xScale(this.props.data);
        let yScale = this.yScale(this.props.data);
        this.svg.selectAll('rect')
            .data(this.props.data)
            .join('rect')
            .attr('x', (d, i) => this.props.swap ? 0 : xScale(d))
            .attr('y', (d, i) => yScale(i))
            .attr('width', (d, i) => this.props.width - xScale(d))
            .attr('height', (this.props.height / this.props.data.length))
            .style('fill', this.props.color || 'gray');
    }

    addNewSVG() {
        d3.select('#chart-' + this.props.id)
            .selectAll('svg').remove();
        return d3.select('#chart-' + this.props.id)
            .append('svg')
            .attr('height', this.props.height || 400)
            .attr('width', this.props.width || 400);
    }

    yScale(dataset) {
        return d3.scaleLinear().domain([0, dataset.length]).range([20, this.props.height]).nice();
    }

    xScale(dataset) {
        return d3.scaleLinear().domain([0, d3.max(dataset)]).range([this.props.width, 0]).nice();
    }


    render() {
        return <div id={'chart-' + this.props.id} className='chart'>
        </div>
    }
}