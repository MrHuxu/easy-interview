var React = require('react');
var Route = require('react-router').Route;

var Navbar = require('../components/Navbar.react');
var Dashboard = require('../components/Dashboard.react');
var Login = require('../components/Login.react');
var Signup = require('../components/Signup.react');
var UpdateUser = require('../components/UpdateUser.react');
var Home = require('../components/Home.react');
var EditQuestion = require('../components/EditQuestion.react');
var PreviewQuestion = require('../components/PreviewQuestion.react');

var routes = (
  <Route component={Navbar}>
    <Route name='dashboard' path='/' component={Dashboard}/>
    <Route name="login" path='login' component={Login}/>
    <Route name='signup' path='signup' component={Signup}/>
    <Route name='update_user' path='update_user' component={UpdateUser}/>
    <Route name="home" path='home' component={Home}/>
    <Route name='new_question' path='/quesiton/new' component={EditQuestion}/>
    <Route name='edit_question' path='/question/:questionId/edit' component={EditQuestion}/>
    <Route name='preview_question' path='/question/:role/view' component={PreviewQuestion}/>
  </Route>
);

module.exports = routes;