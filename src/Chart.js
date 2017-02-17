import React, {Component} from 'react';
import Tooltip from './Tooltip.js';

const MONTH = [
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

class Chart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tooltipTrigger: null
    }
  }

  graphComponent () {
    let path = this.points.map((point, index) => {
      let x = this.labelLeftOffset + ((point.date - this.props.startDate) * this.graphWidth / this.dateRange);
      let y = this.graphHeight - point.value * this.graphHeight / this.topValue;
      return ((index ? 'L' : 'M') + x + ',' + y);
    });
    return <path fill="none" stroke="#78a1c1" d={path.join('')} strokeWidth="1" opacity="1"></path>;
  }

  axisX () {
    let labels = [];
    let startDate = new Date(this.props.startDate * 1000);
    let endDate = new Date(this.props.endDate * 1000);

    let startYear = startDate.getYear();
    let endYear = endDate.getYear();
    let years = endYear - startYear;

    let startMonth = startDate.getMonth();
    let endMonth = endDate.getMonth();
    let months = !years ? endMonth - startMonth + 1 : endMonth + (years * 12) - startMonth;

    let spaceXpx = this.graphWidth / months;

    for (let i = 0; i < months; i++) {
      labels.push(
        <tspan key={'tspan' + i}
          x={this.labelLeftOffset + spaceXpx * i + spaceXpx / 2} y={this.graphHeight + 20}>
          {MONTH[startDate.getMonth()]}
        </tspan>
      );
      startDate.setMonth(startDate.getMonth() + 1);
    }

    return <text textAnchor="middle" stroke="none" fill="#9d9ea2" opacity="1" strokeWidth="0">
        {labels}
      </text>
  }

  axisY () {
    let labels = [];
    let lines = [];
    let spaceY = this.topValue / 4;
    spaceY = Math.floor(spaceY / 10) * 10;
    let spaceYpx = spaceY * this.graphHeight / this.topValue;
    for (let i = 0; i < 5; i++) {
      let y = this.graphHeight - spaceYpx * i;
      lines.push(
        <line
          key={'line' + i} fill="none" stroke="#e6e7e9" strokeWidth="1"
          x1={this.labelLeftOffset} y1={y} x2={this.width} y2={y}
        />
      )
      labels.push(
        <tspan key={'label' + i} x="18" y={y}>
          {spaceY * i}
        </tspan>
      )
    }
    return (
      <g>
        {lines}
        <text textAnchor="end" stroke="none" fill="#9d9ea2" strokeWidth="0">
          {labels}
        </text>
      </g>
    );
  }

  handleHover (point, x, y) {
    this.setState({
      tooltipTrigger: {point, x, y}
    });
  }

  handleLeave () {
    this.setState({
      tooltipTrigger: null
    });
  }

  numberYears () {
    let startYear = new Date(this.props.startDate * 1000).getFullYear();
    let endYear = new Date(this.props.endDate * 1000).getFullYear();
    let years = endYear - startYear;

    return <text textAnchor="start" stroke="none" fill="#9d9ea2" strokeWidth="0">
      <tspan x="50" y="267">{years ? startYear - endYear : startYear}</tspan>
    </text>
  }

  targetPoint() {
    return <circle
      cx={this.state.tooltipTrigger.x} cy={this.state.tooltipTrigger.y} r="4"
      fill="#78a1c1" stroke="#f6f7f9" strokeWidth="2" />;
  }

  dashLine() {
    return <line
      fill="none" stroke="#d7d7d7" strokeDasharray="4,4" strokeWidth="1"
      x1={this.state.tooltipTrigger.x} y1={this.state.tooltipTrigger.y}
      x2={this.state.tooltipTrigger.x} y2={this.graphHeight} />
  }

  render () {
    this.points = this.props.points || [];
    this.labelBottomOffset = 55;
    this.labelLeftOffset = 35;
    this.rightOffset = 20;
    this.width = this.props.width || 860;
    this.height = this.props.height || 280;
    this.graphWidth = this.width - this.rightOffset - this.labelLeftOffset;
    this.graphHeight = this.height - this.labelBottomOffset;
    this.maxValue = this.props.maxValue || Math.max.apply(null, this.points.map(p => p.value));
    this.topValue = this.maxValue + this.maxValue * 0.1;
    this.dateRange = this.props.endDate - this.props.startDate;

    return (
      <div className="chart">
        <svg width={this.width} height={this.height}>
          <rect x="0" y="0" width={this.width} height={this.height} fill="#f6f7f9" />
          {this.axisY()}
          {this.axisX()}
          {this.numberYears()}

          {this.graphComponent()}

          {this.state.tooltipTrigger ? this.targetPoint() : null }
          {this.state.tooltipTrigger ? this.dashLine() : null }

          {this.state.tooltipTrigger
            ? <Tooltip
              point={this.state.tooltipTrigger}
              graphWith={this.graphWidth} />
            : null
          }

          {this.points.map((point, i) => {
            let prevPoint = this.points[i ? i - 1 : i];
            let nextPoint = this.points[i < this.points.length - 1 ? i + 1 : i];

            let xp = this.labelLeftOffset + ((prevPoint.date - this.props.startDate) * this.graphWidth / this.dateRange);
            let xc = this.labelLeftOffset + ((point.date - this.props.startDate) * this.graphWidth / this.dateRange);
            let xn = this.labelLeftOffset + ((nextPoint.date - this.props.startDate) * this.graphWidth / this.dateRange);

            let yc = this.graphHeight - (point.value * this.graphHeight / this.topValue);

            let x1 = xp === xc ? xc : xc - (xc - xp) / 2;
            let x2 = xn === xc ? xc : xc + (xn - xc) / 2;

            return <rect
              onMouseOver={this.handleHover.bind(this, point, xc, yc)}
              onMouseLeave={this.handleLeave.bind(this)}
              key={i} x={x1} y={0} width={x2 - x1} height={this.graphHeight}
              strokeWidth="3" opacity="0"
            />
          })}
        </svg>
      </div>
    );
  }
}

export default Chart;
