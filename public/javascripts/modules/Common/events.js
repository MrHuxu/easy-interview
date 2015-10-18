import { EventEmitter } from 'events';

export default {
  AuthEvent: new EventEmitter(),
  MessageEvent: new EventEmitter(),
  QuestionEvent: new EventEmitter()
};