var React = require('react/addons');
var Route = require('react-router').Route;

var Navbar = require('../components/Navbar.react');
var Dashboard = require('../components/Dashboard.react');
var Login = require('../components/Login.react');
var Signup = require('../components/Signup.react');
var UpdateUser = require('../components/UpdateUser.react');
var Home = require('../components/Home.react');
var EditQuestion = require('../components/EditQuestion.react');
var EditQuestion = require('../components/EditQuestion.react');
var PreviewQuestion = require('../components/PreviewQuestion.react');

var routes = (
  <Route handler={Navbar}>
    <Route name='dashboard' path='/' handler={Dashboard}/>
    <Route name="login" handler={Login}/>
    <Route name='signup' handler={Signup}/>
    <Route name='update_user' handler={UpdateUser}/>
    <Route name="home" handler={Home}/>
    <Route name='new_question' path='/quesiton/new' handler={EditQuestion}/>
    <Route name='edit_question' path='/question/:questionId/edit' handler={EditQuestion}/>
    <Route name='preview_question' path='/question/:role/view' handler={PreviewQuestion}/>
  </Route>
);

module.exports = routes;