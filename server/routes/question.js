var express = require('express');
var router = express.Router();
var Question = require('../models/question');
var User = require('../models/user');

router.post('/new', function (req, res) {
  Question.saveWithCreator(req.body, function (err, question) {
    res.status(201).send({question: question});
  });
});

router.post('/get', function (req, res) {
  Question.find(req.body)
    .populate('creator', 'username team position')
    .sort({updatedAt: 'desc'})
    .exec(function (err, questions) {
      res.status(201).send(questions.map(function (question) {
        return {
          id: question._id,
          title: question.title,
          creator: question.creator,
          difficulty: question.difficulty,
          interviewee: question.interviewee,
          category: question.category,
          question: question.question,
          answer: question.answer,
          updatedAt: question.updatedAt
        };
      }));
    });
});

router.put('/update', function (req, res) {
  Question.update(req.body.condition, req.body.content, function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send({
        operationSuccess: true
      });
    }
  })
});

router.delete('/destroy', function (req, res) {
  Question.remove(req.body, function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send({
        operationSuccess: true
      });
    }
  })
});

module.exports = router;