import React, { Component } from 'react';
import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.
require('../../bower_components/semantic-ui/dist/semantic.min.js');
import { Link } from 'react-router';
import Navbar from './Navbar.react';
import Message from './Message.react';
import Dashboard from './Dashboard.react';
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';
import { AuthEvent } from '../events';

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
};

export default App;