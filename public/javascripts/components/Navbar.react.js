var React = require('react');
var $ = require('jquery');
window.jQuery = $; // Assure it's available globally.
require('../../bower_components/semantic-ui/dist/semantic.min.js');
var Router = require('react-router');
var Link = Router.Link;
var Message = require('./Message.react');
var AuthActions = require('../actions/AuthActions');
var AuthStore = require('../stores/AuthStore');
var AuthEvent = require('../events').AuthEvent;


var Navbar = React.createClass({
  mixins : [Router.Navigation],

  getInitialState: function () {
    return {username: ''};
  },

  componentDidMount: function () {
    AuthEvent.on('login', this.login);
  },

  login: function () {
    this.setState({username: AuthStore._username});
  },

  logout: function () {
    AuthActions.logout();
    this.setState({username: ''});
  },

  toDashboard: function () {
    this.transitionTo('dashboard');
  },

  render: function () {
    var actionItem = AuthStore.isLoggedIn() ? (
      <div>
        <p>
          Login as &nbsp;
          <Link to='/update_user'>{this.state.username}</Link> &nbsp;
        </p>
        <button className='ui button red' onClick={this.logout}>Logout</button>
      </div>
    ) : (
      <div>
        <div className="ui buttons">
          <Link className='ui button' to='/login'>Login</Link>
          <div className="or"></div>
          <Link className='ui positive button' to='/signup'>Signup</Link>
        </div>
      </div>
    );

    return (
      <div>
        <div className='ui transparent main menu navbar grid'>
          <div className='column'/>
          <div className='six wide column Logo'
               style    ={{cursor: 'pointer'}}
               onClick  ={this.toDashboard}
          >
            <h1>Easy Interview</h1>
            &nbsp;
            <img src='/favicon.ico' height='31' width='31'/>
          </div>
          <div className='five wide column'></div>
          <div className='action-item'>
            {actionItem}
          </div>
        </div>
        <Message />
        {this.props.children}
      </div>
    );
  }
});

module.exports = Navbar;