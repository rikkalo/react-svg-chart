import React, {Component} from 'react';
import Tooltip from './Tooltip.js';

class Chart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tooltipTrigger: null,
      labelBottomOffset: 55,
      labelLeftOffset: 35,
      rightOffset: 20
    }
  }

  graphComponent (points, start, end, maxValue) {
    let path = '';
    let dateRange = end - start;
    let width = 860 - this.state.rightOffset - this.state.labelLeftOffset;
    let height = 280 - this.state.labelBottomOffset;
    let max = (maxValue + maxValue * 0.1);
    points.map((point, index) => {
      let x = this.state.labelLeftOffset + ((point['date'] - start) * width / dateRange);
      let y = height - Math.round(point['value'] * height / max);
      return path += ((index ? 'L' : 'M') + x + ',' + y);
    })
    return <path fill="none" stroke="#78a1c1" d={path} strokeWidth="1" opacity="1"></path>;
  }

  axisX (start, end) {
    const month = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ];
    let labels = [];
    let startDate = new Date(start * 1000);
    let endDate = new Date(end * 1000);

    let startYear = startDate.getYear();
    let endYear = endDate.getYear();
    let years = endYear - startYear;

    let startMonth = startDate.getMonth();
    let endMonth = endDate.getMonth();
    let months = !years ? endMonth - startMonth + 1 : endMonth + (years * 12) - startMonth;

    let width = 860 - this.state.labelLeftOffset - this.state.rightOffset;
    let spaceXpx = width / months;

    for (let i = 0; i < months; i++) {
      labels.push(
        <tspan key={'tspan' + i}
          x={this.state.labelLeftOffset + spaceXpx * i + spaceXpx / 2} y="245">
          {month[startDate.getMonth()]}
        </tspan>
      )
      startDate.setMonth(startDate.getMonth() + 1);
    }

    return <text textAnchor="middle" stroke="none" fill="#9d9ea2" opacity="1" strokeWidth="0">
        {labels}
      </text>
  }

  axisY (maxValue) {
    let labels = [];
    let lines = [];
    let max = Math.round((maxValue + maxValue * 0.1));
    let spaceY = max / 4;
    spaceY = Math.floor(spaceY / 10) * 10;
    let start = 280 - this.state.labelBottomOffset;
    let spaceYpx = spaceY * start / max;
    for (let i = 0; i < 5; i++) {
      let y = Math.round(start - spaceYpx * i);
      lines.push(
        <line key={'line' + i} fill="none" stroke="#e6e7e9" x1="35" y1={y} x2="840" y2={y} strokeWidth="1" opacity="1" />
      )
      labels.push(
        <tspan key={'label' + i} x="18" y={y} >{spaceY * i}</tspan>
      )
    }
    return (
      <g>
        {lines}
        <text textAnchor="end" stroke="none" fill="#9d9ea2" opacity="1" strokeWidth="0">
          {labels}
        </text>
      </g>
    )
  }

  handleHover (point, x, y) {
    this.setState({
      tooltipTrigger: {point, x, y}
    })
  }

  handleLeave () {
    this.setState({
      tooltipTrigger: null
    })
  }

  numberYears (start, end) {
    let startYear = new Date(start * 1000).getFullYear();
    let endYear = new Date(end * 1000).getFullYear();
    let years = endYear - startYear;

    return <text textAnchor="start" stroke="none" fill="#9d9ea2" opacity="1" strokeWidth="0">
      <tspan x="50" y="267">{years ? startYear - endYear : startYear}</tspan>
    </text>
  }

  render () {
    let max = (this.props.maxValue + this.props.maxValue * 0.1);
    let dateRange = this.props.endDate - this.props.startDate;
    let graphWidth = 860 - this.state.rightOffset - this.state.labelLeftOffset;
    let graphHeight = 280 - this.state.labelBottomOffset;

    return (
      <div className="chart">
        <svg width="860" height="280">
          <rect x="0" y="0" width="860" height="280" fill="#f6f7f9" />
          {this.axisY(this.props.maxValue)}
          {this.axisX(this.props.startDate, this.props.endDate)}
          {this.numberYears(this.props.startDate, this.props.endDate)}

          {this.graphComponent(this.props.points, this.props.startDate, this.props.endDate, this.props.maxValue)}

          {this.state.tooltipTrigger ? <circle cx={this.state.tooltipTrigger.x} cy={this.state.tooltipTrigger.y} r="4" fill="#78a1c1" stroke="#f6f7f9" strokeWidth="2" opacity="1"></circle> : null}
          {this.state.tooltipTrigger ? <line fill="none" stroke="#d7d7d7" x1={this.state.tooltipTrigger.x} y1={this.state.tooltipTrigger.y} x2={this.state.tooltipTrigger.x} y2={graphHeight} strokeDasharray="4,4" strokeWidth="1" opacity="1" /> : null}

          {this.state.tooltipTrigger ? <Tooltip point={this.state.tooltipTrigger} labelLeftOffset={this.state.labelLeftOffset} rightOffset={this.state.rightOffset} /> : null}

          { this.props.points.map((point, i) => {
            let prevPoint = this.props.points[i ? i - 1 : i];
            let nextPoint = this.props.points[i < this.props.points.length - 1 ? i + 1 : i];

            let xp = this.state.labelLeftOffset + ((prevPoint['date'] - this.props.startDate) * graphWidth / dateRange);
            let xc = this.state.labelLeftOffset + ((point['date'] - this.props.startDate) * graphWidth / dateRange);
            let xn = this.state.labelLeftOffset + ((nextPoint['date'] - this.props.startDate) * graphWidth / dateRange);

            let yc = graphHeight - Math.round(point['value'] * graphHeight / max);

            let x1 = xp === xc ? xc : xc - (xc - xp) / 2;
            let x2 = xn === xc ? xc : xc + (xn - xc) / 2;

            return <rect onMouseOver={this.handleHover.bind(this, point, xc, yc)}
            onMouseLeave={this.handleLeave.bind(this)}
            key={i} x={x1} y={0} width={x2 - x1} height={graphHeight} strokeWidth="3" opacity="0"/>
          })
          }
        </svg>
      </div>
    )
  }
}

export default Chart;
