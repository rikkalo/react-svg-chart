import React, {Component} from 'react';

const MONTH = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

class Tooltip extends Component {
  render () {
    this.hRect = this.props.height || 50;
    this.wRect = this.props.width || 120;
    this.graphWidth = this.props.graphWidth || 800;
    this.x = this.props.point.x - (this.props.point.x > this.graphWidth - this.wRect ? this.wRect : 0) + 5;
    this.y = this.props.point.y + (this.props.point.y > this.hRect + 10 ? -(this.hRect + 10) : 10);
    this.point = this.props.point.point;
    this.date = new Date(this.point.date * 1000);
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
          x={this.x} y={this.y}
          width={this.wRect} height={this.hRect}
          rx="5" ry="5" fill="#fff"
          strokeWidth="3" filter="url(#f3)"
        />

        <text x={this.x + 12} y={this.y + 20} textAnchor="start" stroke="none" fill="#9d9ea2" fontSize="12">
          {this.date.getDate()} {MONTH[this.date.getMonth()]} {this.date.getFullYear()}
        </text>
        <text x={this.x + 15} y={this.y + 38} textAnchor="start" stroke="none" fill="#434c5b" fontSize="12">
          $ {this.point.value.toFixed(2).replace('.', ',')}
        </text>
        <text x={this.x + 68} y={this.y + 38} textAnchor="start" stroke="none" fill="#1e9d50" fontSize="12">
          {this.point.delta >= 0 ? '▼' : '▲'} {Math.abs(this.point.delta)}
        </text>
      </g>
    );
  }
}

export default Tooltip;
