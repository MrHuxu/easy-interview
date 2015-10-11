var Flux = require('flux');

module.exports = {
  AuthDispatcher     : new Flux.Dispatcher(),
  QuestionDispatcher : new Flux.Dispatcher(),
  MessageDispatcher  : new Flux.Dispatcher()
};