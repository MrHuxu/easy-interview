var React = require('react');
var $ = require('jquery');
window.jQuery = $; // Assure it's available globally.
require('../../bower_components/semantic-ui/dist/semantic.min.js');
var QuestionList = require('./QuestionList.react');
var MessageDispatcher = require('../dispatcher/AppDispatcher').MessageDispatcher;
var AuthStore = require('../stores/AuthStore');
var QuestionActions = require('../actions/QuestionActions');
var Link = require('react-router').Link;

var Home = React.createClass({
  getInitialState: function () {
    return this._getLoginState();
  },

  _getLoginState: function () {
    return {
      userLoggedIn: AuthStore.isLoggedIn(),
      username: AuthStore.getUser(),
      token: AuthStore.getToken()
    };
  },

  login: function () {
    this.setState(this._getLoginState());
  },

  componentDidMount: function () {
    QuestionActions.get({
      creator: AuthStore._id
    });
  },

  render: function () {
    return (
      <div className='ui stackable grid'>
        <div className='three wide column'></div>
        <div className='ten wide column'>
          <div className='ui stackable grid'>
            <div className='sixteen wide column'>
              <h2>Hello {this.state.username}</h2>
            </div>
            <div className='fourteen wide column'>
              <div className='ui grid'>
                <div className='three wide column'>
                  <p>Team: {AuthStore._team}</p>
                </div>
                <div className='three wide column'>
                  <p>Position: {AuthStore._position}</p>
                </div>
              </div>
            </div>
            <div className='two wide column'>
              <Link className='ui green small button' to='new_question'>Create</Link>
            </div>
          </div>
          <div className="ui horizontal divider"><i className="tag icon"></i></div>
          <h5>Go to <strong><Link to='/'>Dashboard</Link></strong> to see all questions!</h5>
          <QuestionList />
        </div>
      </div>
    );
  }
});

export default Home;