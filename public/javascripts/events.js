var EventEmitter = require("events").EventEmitter;

export default {
  AuthEvent: new EventEmitter(),
  MessageEvent: new EventEmitter(),
  QuestionEvent: new EventEmitter()
};