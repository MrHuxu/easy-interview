import React, { Component } from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar.react';
import Message from './Message.react';
import Dashboard from './Dashboard.react';

class App extends Component {
  render () {
    return (
      <div>
        <Navbar />
        <Message />
        {this.props.children || <Dashboard />}
      </div>
    );
  }
}

export default App;