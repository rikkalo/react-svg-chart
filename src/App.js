import React, {Component} from 'react';
import Chart from './Chart.js';

class App extends Component {

  render () {
    const points = [
      {value: 0, date: 1420056000, delta:0.51},
      {value: 86, date: 1421424000, delta:0.45},
      {value: 28, date: 1421624000, delta:0.78},
      {value: 30, date: 1421984000, delta:0.21},
      {value: 56, date: 1422984000, delta:0.65},
      {value: 40, date: 1430424000, delta:0.83},
      {value: 32, date: 1432424010, delta:0.21},
      {value: 80, date: 1437681600, delta:0.43},
      {value: 13, date: 1439081600, delta:0.32},
      {value: 60, date: 1443124800, delta:0.43},
      {value: 21, date: 1449259200, delta:0.64},
      {value: 35, date: 1451405600, delta:0.23}
    ];
    const startDate = 1420056000;
    const endDate = 1451505600;
    const maxValue = 86;
    return (
      <div className="App">
        <Chart points={points} startDate={startDate} endDate={endDate} maxValue={maxValue}/>
      </div>
    )
  }
}

export default App;
