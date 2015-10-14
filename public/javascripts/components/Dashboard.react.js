import React, { Component } from 'react';
import $ from 'jquery';
window.jQuery = $; // Assure it's available globally.
require('../../bower_components/semantic-ui/dist/semantic.min.js');
import QuestionActions from '../actions/QuestionActions';
import QuestionList from './QuestionList.react';
import { Link } from 'react-router';

class Dashboard extends Component {
  componentDidMount () {
    QuestionActions.get({});
  }

  render () {
    return (
      <div className='ui stackable grid'>
        <div className='three wide column'></div>
        <div className='ten wide column'>
          <h1>Dashboard</h1>
          <p>This page show <strong>ALL</strong> questions, or you can go to your&nbsp;
            <Link to='/home'>homepage</Link> to deal with your own questions.
          </p>
          <QuestionList />
        </div>
      </div>
    );
  }
};

export default Dashboard;