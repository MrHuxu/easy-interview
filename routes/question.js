var express = require('express');
var router = express.Router();
var Question = require('../models/question');
var User = require('../models/user');

router.post('/new_question', function (req, res) {
  Question.saveWithCreator(req.body);
});

router.post('/get_questions', function (req, res) {
  User.findOne({_id: req.body.creator_id})
      .populate('questions')
      .exec(function (err, user) {
        res.status(201).send(user.questions.map(function (question) {
          return {
            title: question.title,
            difficulty: question.difficulty,
            interviewee: question.interviewee,
            category: question.category,
            updatedAt: question.updatedAt
          };
        }));
      });
});

module.exports = router;