var express = require('express');
var router = express.Router();
var Question = require('../models/question');
var User = require('../models/user');

router.post('/new_question', function (req, res) {
  Question.saveWithCreator(req.body, function () {
    res.status(201).send();
  });
});

router.post('/get_questions', function (req, res) {
  Question.find(req.body)
    .exec(function (err, questions) {
      res.status(201).send(questions.map(function (question) {
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