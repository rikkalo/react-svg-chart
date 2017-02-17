import React, {Component} from 'react';

class Tooltip extends Component {
  render () {
    let hRect = 50;
    let wRect = 120;
    let width = 860 - this.props.rightOffset - this.props.labelLeftOffset;
    let x = this.props.point.x - (this.props.point.x > width - wRect ? wRect : 0) + 5;
    let y = this.props.point.y + (this.props.point.y > hRect + 10 ? -(hRect + 10) : 10);
    let d = new Date(this.props.point.point.date * 1000);
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
        <text x={x + 12} y={y + 20} textAnchor="start" stroke="none" fill="#9d9ea2" fontSize="12">{d.getDate()} {month[d.getMonth()]} {d.getFullYear()}</text>
        <text x={x + 15} y={y + 38} textAnchor="start" stroke="none" fill="#434c5b" fontSize="12">$ {this.props.point.point.value.toFixed(2).replace('.', ',')}</text>
        <text x={x + 68} y={y + 38} textAnchor="start" stroke="none" fill="#1e9d50" fontSize="12">{this.props.point.point.delta >= 0 ? '▼' : '▲'} {Math.abs(this.props.point.point.delta)}</text>
      </g>
    );
  }
}

export default Tooltip;
