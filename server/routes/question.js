var express = require('express');
var router = express.Router();
var Question = require('../models/question');
var User = require('../models/user');

router.post('/new', (req, res) => {
  var promise = Question.saveWithCreator(req.body);
  promise.then((question) => {
    res.status(201).send({question: question});
  }, (err) => {
    res.status(500).send(err);
  });
});

router.post('/get', (req, res) => {
  var promise = Question.find(req.body)
                        .populate('creator', 'username team position')
                        .sort({updatedAt: 'desc'})
                        .exec();
  promise.then((questions) => {
    res.status(201).send(questions.map((question) => {
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
  }, (err) => {
    res.status(500).send(err);
  });
});

router.put('/update', (req, res) => {
  var promise = Question.update(req.body.condition, req.body.content).exec();
  promise.then(() => {
    res.status(201).send({
      operationSuccess: true
    });
  }, (err) => {
    res.status(500).send(err);
  });
});

router.delete('/destroy', (req, res) => {
  var promise = Question.remove(req.body).exec();
  promise.then(() => {
    res.status(201).send({
      operationSuccess: true
    });
  }, (err) => {
    res.status(500).send(err);
  });
});

module.exports = router;