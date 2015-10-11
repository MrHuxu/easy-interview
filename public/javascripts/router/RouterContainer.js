var Router = require('react-router');
var routes = require('./routes');

var RouterContainer = {
  set: function (router) {
    this._router = router;
  },

  get: function () {
    return this._router;
  }
};

var router = Router.create(routes);
RouterContainer.set(router);

module.exports = RouterContainer;