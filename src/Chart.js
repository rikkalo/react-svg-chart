import React, { Component } from 'react';

class Chart extends Component {
  constructor(props) {
   super(props);
   this.state = {
     tooltipTrigger: null,
     currentPoint: {},
     currentYears: '',
     labelBottomOffset: 55,
     labelLeftOffset: 35,
     RightOffset: 20
   }
 }

  graphComponent(points, start, end, maxValue) {
    let path ='';
    let dateRange = end - start;
    let width = 860 - this.state.labelLeftOffset - this.state.RightOffset;
    let height = 280 - this.state.labelBottomOffset;
    let max = (maxValue + maxValue*0.1);
    points.map((point, index) => {
      let x = Math.round((point['date']-start) * width / dateRange);
      console.log(x)
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
        <tspan x={this.state.labelLeftOffset + spaceXpx * i + spaceXpx / 2} y="245">{month[startDate.getMonth()]}</tspan>
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
        <line fill="none" stroke="#e6e7e9" x1="35" y1={y} x2="840" y2={y} strokeWidth="1" opacity="1" />
      );
      labels.push(
        <tspan key={i} x="18" y={y} >{spaceY*i}</tspan>
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

  handleHover(trigger) {
    console.log(trigger);
    console.log('sdfsdf')
    this.setState({
      tooltipTrigger: trigger,
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

  render() {
    return (
      <div className="chart">
      <svg width="860" height="280">
        {this.axisY(this.props.maxValue)}
        {this.axisX(this.props.startDate, this.props.endDate)}
        {this.numberYears(this.props.startDate, this.props.endDate)}

        {this.graphComponent(this.props.points, this.props.startDate, this.props.endDate, this.props.maxValue)}

        { this.props.points.map((point, i)=>{
          return <rect onMouseOver={this.handleHover.bind(this,point)}
          onMouseLeave={this.handleLeave.bind(this)}
          key={i} x={point['date']} y={point['value']} width="10" height="100" fill="rgb(0,0,255)" stroke="red" strokeWidth="3" opacity="0.1"/>
        })
        }

        {this.state.tooltipTrigger ? <circle cx={this.state.tooltipTrigger.date} cy={this.state.tooltipTrigger.value} r="4" fill="#78a1c1" stroke="#f6f7f9" strokeWidth="2" opacity="1"></circle> : null}
        {this.state.tooltipTrigger ? <line fill="none" stroke="#d7d7d7" x1={this.state.tooltipTrigger.date} y1={this.state.tooltipTrigger.value} x2="453" y2="225" strokeDasharray="4,4" strokeWidth="1" opacity="1" /> : null}
      </svg>
      {this.state.tooltipTrigger ? <div className='tooltip'>value:{this.state.tooltipTrigger.value}, date:{this.state.tooltipTrigger.date}</div> : null}
      </div>
    );
  }
}

export default Chart;
