import React, { Component } from 'react';

class Chart extends Component {
  constructor(props) {
   super(props);
   this.state = {
     tooltipTrigger: null,
     labelBottomOffset: 55,
     labelLeftOffset: 35,
     RightOffset: 20
   }
 }

  graphComponent(points, start, end, maxValue) {
    let path ='';
    let dateRange = end - start;
    let width = 860 - this.state.RightOffset - this.state.labelLeftOffset;
    let height = 280 - this.state.labelBottomOffset;
    let max = (maxValue + maxValue*0.1);
    points.map((point, index) => {
      let x = this.state.labelLeftOffset + ((point['date']-start) * width / dateRange);
      let y = height - Math.round(point['value'] * height / max);
      path+=((index ? 'L' : 'M') + x + ',' + y);
    });
    return <path fill="none" stroke="#78a1c1" d={path} strokeWidth="1" opacity="1"></path>
  }


  axisX(start, end) {
    const month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let labels = [];
    let startDate = new Date(start*1000);
    let endDate = new Date(end*1000);

    let startYear = startDate.getYear();
    let endYear = endDate.getYear();
    let years = endYear - startYear;

    let startMonth = startDate.getMonth();
    let endMonth = endDate.getMonth();
    let months = !years ? endMonth - startMonth + 1 : endMonth + (years * 12) - startMonth;

    let width = 860 - this.state.labelLeftOffset - this.state.RightOffset;
    let spaceXpx = width / months;

    for (let i = 0; i < months; i++) {
      labels.push(
        <tspan key={'tspan' + i} x={this.state.labelLeftOffset + spaceXpx * i + spaceXpx / 2} y="245">{month[startDate.getMonth()]}</tspan>
      );
      startDate.setMonth(startDate.getMonth() + 1);
    }

    return <text textAnchor="middle" stroke="none" fill="#9d9ea2" opacity="1" strokeWidth="0">
        {labels}
      </text>
  }

  axisY(maxValue) {
    let labels = [];
    let lines = [];
    let max = Math.round((maxValue + maxValue*0.1));
    let spaceY = max/4;
    spaceY = Math.floor(spaceY/10)*10;
    let start = 280 - this.state.labelBottomOffset;
    let spaceYpx = spaceY*start/max;
    for (let i = 0; i < 5; i++) {
      let y = Math.round(start-spaceYpx*i);
      lines.push(
        <line key={'line' + i} fill="none" stroke="#e6e7e9" x1="35" y1={y} x2="840" y2={y} strokeWidth="1" opacity="1" />
      );
      labels.push(
        <tspan key={'label' + i} x="18" y={y} >{spaceY*i}</tspan>
      );
    }
    return (
      <g>
        {lines}
        <text textAnchor="end" stroke="none" fill="#9d9ea2" opacity="1" strokeWidth="0">
          {labels}
        </text>
      </g>
    );
  }

  handleHover(point, x, y) {
    console.log(point, x, y);
    this.setState({
      tooltipTrigger: { point, x, y },
    })
  }

  handleLeave() {
    this.setState({
      tooltipTrigger: null,
    })
  }

  numberYears(start, end) {
    let startYear = new Date(start * 1000).getFullYear();
    let endYear = new Date(end * 1000).getFullYear();
    let years = endYear - startYear;

    if (years) {
      return <text textAnchor="start" stroke="none" fill="#9d9ea2" opacity="1" strokeWidth="0">
        <tspan x="50" y="267">{startYear} - {endYear}</tspan>
      </text>
    } else {
      return <text textAnchor="start" stroke="none" fill="#9d9ea2" opacity="1" strokeWidth="0">
        <tspan x="50" y="267">{startYear}</tspan>
      </text>
    }
  }

  tooltip(point) {
    let hRect = 50;
    let wRect = 120;
    let width = 860 - this.state.RightOffset - this.state.labelLeftOffset;
    let x = point.x - (point.x > width - wRect ? wRect : 0) + 5;
    let y = point.y + (point.y > hRect + 10 ? -(hRect + 10) : 10);
    let d = new Date(point.point.date * 1000);
    let month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return (
      <g>
        <defs>
          <filter id="f3">
            <feOffset result="offOut" in="SourceAlpha" dx="0" dy="2" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" in="blurOut" result="opacity"/>
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="opacity" mode="normal" />
          </filter>
        </defs>
        <rect
          x={x} y={y}
          width={wRect} height={hRect}
          rx="5" ry="5" fill="#fff"
          strokeWidth="3" filter="url(#f3)"
        />
        <text x={x+12} y={y+20} textAnchor="start" stroke="none" fill="#9d9ea2" fontSize="12">{d.getDate()} {month[d.getMonth()]} {d.getFullYear()}</text>
        <text x={x+15} y={y+38} textAnchor="start" stroke="none" fill="#434c5b" fontSize="12">$ {point.point.value.toFixed(2).replace('.', ',')}</text>
        <text x={x+68} y={y+38} textAnchor="start" stroke="none" fill="#1e9d50" fontSize="12">{point.point.delta >= 0 ? '▼' : '▲'} {0.52 || Math.abs(point.point.delta)}</text>
      </g>
    );
  }

  render() {
    let max = (this.props.maxValue + this.props.maxValue*0.1);
    let dateRange = this.props.endDate - this.props.startDate;
    let width = 860 - this.state.RightOffset - this.state.labelLeftOffset;
    let height = 280 - this.state.labelBottomOffset;

    return (
      <div className="chart">
      <svg width="860" height="280">
        <rect x="0" y="0" width="860" height="280" fill="#f6f7f9" />
        {this.axisY(this.props.maxValue)}
        {this.axisX(this.props.startDate, this.props.endDate)}
        {this.numberYears(this.props.startDate, this.props.endDate)}

        {this.graphComponent(this.props.points, this.props.startDate, this.props.endDate, this.props.maxValue)}

        {this.state.tooltipTrigger ? <circle cx={this.state.tooltipTrigger.x} cy={this.state.tooltipTrigger.y} r="4" fill="#78a1c1" stroke="#f6f7f9" strokeWidth="2" opacity="1"></circle> : null}
        {this.state.tooltipTrigger ? <line fill="none" stroke="#d7d7d7" x1={this.state.tooltipTrigger.x} y1={this.state.tooltipTrigger.y} x2={this.state.tooltipTrigger.x} y2={height} strokeDasharray="4,4" strokeWidth="1" opacity="1" /> : null}

        {this.state.tooltipTrigger ? this.tooltip(this.state.tooltipTrigger) : null}

        { this.props.points.map((point, i)=>{
          let prevPoint = this.props.points[i ? i-1 : i];
          let nextPoint = this.props.points[i < this.props.points.length-1 ? i+1 : i];

          let xp = this.state.labelLeftOffset + ((prevPoint['date']-this.props.startDate) * width / dateRange);
          let xc = this.state.labelLeftOffset + ((point['date']-this.props.startDate) * width / dateRange);
          let xn = this.state.labelLeftOffset + ((nextPoint['date']-this.props.startDate) * width / dateRange);

          let yc = height - Math.round(point['value'] * height / max);

          let x1 = xp == xc ? xc : xc - (xc - xp)/2;
          let x2 = xn == xc ? xc : xc + (xn - xc)/2;

          return <rect onMouseOver={this.handleHover.bind(this,point,xc,yc)}
          onMouseLeave={this.handleLeave.bind(this)}
          key={i} x={x1} y={0} width={x2-x1} height={height}  strokeWidth="3" opacity="0"/>
        })
        }
      </svg>
      </div>
    );
  }
}

export default Chart;
