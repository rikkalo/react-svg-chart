import React, { Component } from 'react';

class Chart extends Component {
  render() {
    return (
      <svg width="860" height="280">
      <g>
        <line fill="none" stroke="#e6e7e9" x1="35" y1="225" x2="840" y2="225" strokeWidth="1" opacity="1" />
        <line fill="none" stroke="#e6e7e9" x1="35" y1="174" x2="840" y2="174" strokeWidth="1" opacity="1" />
        <line fill="none" stroke="#e6e7e9" x1="35" y1="123" x2="840" y2="123" strokeWidth="1" opacity="1" />
        <line fill="none" stroke="#e6e7e9" x1="35" y1="72" x2="840" y2="72" strokeWidth="1" opacity="1" />
        <line fill="none" stroke="#e6e7e9" x1="35" y1="21" x2="840" y2="21" strokeWidth="1" opacity="1" />

        <text textAnchor="end" stroke="none" fill="#9d9ea2" opacity="1" strokeWidth="0">
          <tspan x="18" y="225">0</tspan>
          <tspan x="18" y="174">20</tspan >
          <tspan x="18" y="123">40</tspan >
          <tspan x="18" y="72">60</tspan >
          <tspan x="18" y="21">80</tspan>
        </text>
      </g>
      <path fill="none" stroke="#78a1c1" d="M35,225L453,130L840,225" strokeWidth="1" opacity="1"></path>
      <line fill="none" stroke="#d7d7d7" x1="453" y1="130" x2="453" y2="225" strokeDasharray="4,4" strokeWidth="1" opacity="1" />
      <circle cx="453" cy="130" r="4" fill="#78a1c1" stroke="#f6f7f9" strokeWidth="2" opacity="1"></circle>



      <text textAnchor="middle" stroke="none" fill="#9d9ea2" opacity="1" strokeWidth="0">
        <tspan x="69" y="245">январь</tspan>
        <tspan x="138" y="245">февраль</tspan>
        <tspan x="207" y="245">март</tspan>
        <tspan x="276" y="245">апрель</tspan >
        <tspan x="345" y="245">май</tspan>
        <tspan x="414" y="245">июнь</tspan>
        <tspan x="473" y="245">июль</tspan>
        <tspan x="542" y="245">август</tspan>
        <tspan x="611" y="245">сентябрь</tspan>
        <tspan x="670" y="245">октябрь</tspan>
        <tspan x="739" y="245">ноябрь</tspan>
        <tspan x="808" y="245">декабрь</tspan>
      </text>

      <text textAnchor="start" stroke="none" fill="#9d9ea2" opacity="1" strokeWidth="0">
        <tspan x="50" y="267">2015</tspan>
      </text>

  </svg>
    );
  }
}

export default App;
