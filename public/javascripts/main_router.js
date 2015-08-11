var Router = ReactRouter;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

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
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

var jwt = localStorage.getItem('jwt');
if (jwt) {
  LoginActions.loginUser(jwt);
}

Router.run(routes, function (Handler) {
//Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.getElementById('easy-interview'));
});