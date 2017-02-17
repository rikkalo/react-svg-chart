import React, { Component } from 'react';
import './App.css';
import Chart from  './Chart.js'

class App extends Component {

  render() {
    //const points = [{value:40, date:1420833600 },{value:80, date:1430424000},{value:60, date:1437681600},{value:54, date:1437681600}];
    const points = [
      {value: 0, date:1420056000 },
      {value:40, date:1430424000 },
      {value:80, date:1437681600 },
      {value:60, date:1443124800 },
      {value:35, date:1451405600 }
    ];
    const startDate = 1420056000;
    const endDate = 1451505600;
    const maxValue = 86;
    return (
      <div className="App">
        <Chart points={points} startDate={startDate} endDate={endDate} maxValue={maxValue}/>
      </div>
    );
  }
}

export default App;
