import React, { Component } from 'react';
import './App.css';
import Routes from '../src/routes/Routes';
import Nav from './nav/Nav';
import { withRouter } from 'react-router-dom';


class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="App">
      {this.props.location.pathname === "/" ? null 
      : <Nav /> }
        <div>
          {Routes}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
