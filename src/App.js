import React, { Component } from 'react';
import './App.css';
import Routes from '../src/routes/Routes';
import Nav from './nav/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div>
          {Routes}
        </div>
      </div>
    );
  }
}

export default App;
