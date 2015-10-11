var React = require('react/addons');
var $ = require('jquery');
window.jQuery = $; // Assure it's available globally.
var semantic = require('../../bower_components/semantic-ui/dist/semantic.min.js');
var QuestionActions = require('../actions/QuestionActions');
var QuestionList = require('./QuestionList.react');
var Link = require('react-router').Link;

var Dashboard = React.createClass({
  componentDidMount: function () {
    QuestionActions.get({});
  },

  render: function () {
    return (
      <div className='ui stackable grid'>
        <div className='three wide column'></div>
        <div className='ten wide column'>
          <h1>Dashboard</h1>
          <p>This page show <strong>ALL</strong> questions, or you can go to your&nbsp;
            <Link to='home'>homepage</Link> to deal with your own questions.
          </p>
          <QuestionList />
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;