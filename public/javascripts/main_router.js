var Router = ReactRouter;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var RouterContainer = {
  set: function (router) {
    this._router = router;
  },

  get: function () {
    return this._router;
  }
}

var routes = (
  <Route handler={Navbar}>
    <Route name='dashboard' path='/' handler={Dashboard}/>
    <Route name="login" handler={Login}/>
    <Route name="home" handler={Home}/>
    <Route name='signup' handler={Signup}/>
    <Route name='new_question' path='/quesiton/new' handler={EditQuestion}/>
    <Route name='edit_question' path='/question/:questionId/edit' handler={EditQuestion}/>
    <Route name='preview_question' path='/question/:role/view' handler={PreviewQuestion}/>
  </Route>
);

var router = Router.create(routes);
RouterContainer.set(router);

var username = localStorage.getItem('_easy_interview_username');
var token = localStorage.getItem('_easy_interview_token');
if (username && token) {
  AuthActions.login({
    username: username,
    token: token
  });
}

Router.run(routes, function (Handler) {
//Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.getElementById('easy-interview'));
});