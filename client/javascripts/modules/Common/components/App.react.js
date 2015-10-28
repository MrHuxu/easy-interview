import $ from 'jquery';
import React, { Component } from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar.react';
import Message from './Message.react';
import Dashboard from './Dashboard.react';

class App extends Component {
  componentDidMount () {
    $('.nav.item').click(function () {
      $.each($('.nav.item'), (index, item) => {
        item === this ? $(item).addClass('active') : $(item).removeClass('active');
      });
    });
  }

  render () {
    return (
      <div>
        <Navbar />
        <Message />
        <div className='ui stackable grid'>
          <div className='three wide column'></div>
          <div className='ten wide column'>
            <div className='ui secondary pointing menu'>
              <Link to='/' className='active nav item'>
                Dashboard
              </Link>
              <Link to='/home' className='nav item'>
                Homepage
              </Link>
            </div>
            {this.props.children || <Dashboard />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;