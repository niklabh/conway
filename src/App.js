import React, { Component } from 'react';
import logo from './logo.svg';
import Conway from './Conway'

import './App.css';


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      step: 0
    }

    this.life = new Conway(100, 100)
  }

  generate = () => {
    this.life.seed()
    this.setState({ step: 1 })
  }

  run = () => {
    this.i = setInterval(()=>this.step(), 1000)
  }

  pause = () => {
    clearInterval(this.i)
  }

  step = () => {
    this.life.step()
    this.setState({ step: this.state.step + 1 })
  }

  clear = () => {
    this.life.clear()
    this.setState({ step: 0 })
  }

  componentDidMount() {

  }

  onSelect = (e) => {
    if (this.life[e.target.value]) {
      this.life.clear()
      this.life[e.target.value]()
      this.setState({ step: 0 })
    }
  }

  render() {
    return (
      <div className="App">
        <div className='header'>
          <h3 className="title">Conway Game of life</h3>
          <select className='input' onChange={this.onSelect}>
            <option value="">Select</option>
            <option value="glider">Glider</option>
          </select>
          <button className='btn input' onClick={this.generate}> Generate </button>
          <button className='btn input' onClick={this.run}> Run </button>
          <button className='btn input' onClick={this.pause}> Pause </button>
          <button className='btn input' onClick={this.step}> Step </button>
          <button className='btn input' onClick={this.clear}> Clear </button>
          <div className='step'>{this.state.step}</div>
        </div>
        <div className="App-intro">
          {this.life.board.map((row, i) => (
            <div className='row' key={i}>
              {row.map((col, j) => (
                <div key={j} className='cell' style={{ backgroundColor: col ? 'red' : 'white' }}>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
