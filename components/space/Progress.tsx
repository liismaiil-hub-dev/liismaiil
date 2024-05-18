import React, { Component } from 'react';

import { json } from 'd3';

import ChartWrapper from './ChartWrapper';
import Organisation from './Organisation';

class App extends Component {
  state = {
    data: [],
    activeName: null
  }

  componentDidMount() {
    json("")
      .then(data => this.setState({ data }))
      .catch(error => console.log(error));
  }

  updateName = (activeName) => this.setState({ activeName })

  updateData = (data) => this.setState({ data })

  renderChart() {
    if (this.state.data.length === 0) {
      return "No data yet"
    }
    return <ChartWrapper data={this.state.data} updateName={this.updateName} />
  }

  render() {
    return (
      <div className='text-gray'>
        <div>

        </div>
        <div md={6} xs={12}>{this.renderChart()}</div>
        <div md={6} xs={12}><Table data={this.state.data} updateData={this.updateData} activeName={this.state.activeName} /></div>

      </div>
    );
  }
}

export default App;
