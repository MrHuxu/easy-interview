var mongoose = require('./mongo_config');
var Schema = mongoose.Schema;
var timestamp = require('mongoose-timestamp');

var QuestionSchema = Schema({
  creator     : {
    type      : Schema.Types.ObjectId,
    ref       : 'User'
  },
  difficulty  : Number,
  interviewee : {
    type      : String,
    enum      : ['Campus', 'Social']
  },
  category    : {
    type      : String,
    enum      : ['Algorithms', 'Basic', 'Database', 'Logic', 'Programming', 'Personality']
  },
  title       : String,
  question    : {
    type      : String,
    text      : true
  },
  answer      : {
    type      : String,
    text      : true
  }
});

QuestionSchema.plugin(timestamp);

var Question = mongoose.model('Question', QuestionSchema);

Question.saveWithCreator = (args) => {
  var promise = new Question({
    creator: args.creator_id,
    difficulty: args.difficulty,
    interviewee: args.interviewee,
    category: args.category,
    title: args.title,
    question: args.question,
    answer: args.answer
  }).save();
  promise.then((question) => {
    var User = require('./user');
    User.findOne({_id: question.creator}, (err, user) => {
      user.questions.push(question._id);
      user.save();
    });
    resolve(question);
  }, (err) => {
    reject(err);
  });
  return promise;
}

module.exports = Question;