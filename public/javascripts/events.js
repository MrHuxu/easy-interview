var EventEmitter = require("events").EventEmitter;

module.exports = {
  AuthEvent: new EventEmitter(),
  MessageEvent: new EventEmitter(),
  QuestionEvent: new EventEmitter()
};