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
  <Route handler={Dashboard}>
    <Route name="login" handler={Login}/>
    <Route name="home" handler={Home}/>
    <Route name='signup' handler={Signup}/>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

var username = localStorage.getItem('_easy_interview_username');
var token = localStorage.getItem('_easy_interview_token');
if (username && token) {
  Auth.login({
    username: username,
    token: token
  });
}

Router.run(routes, function (Handler) {
//Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.getElementById('easy-interview'));
});