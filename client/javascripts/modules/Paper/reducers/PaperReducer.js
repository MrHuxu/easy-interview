import { SAVE_PAPER } from '../actions/PaperActions';

export function paper (state = {
  records: [{
    id: 1,
    name : 'paper1',
    duration : 120,
    interviewee : 'xhu',
    email : 'x@x.com',
    questions: [{
      id: 1,
      title: 'question1',
      question: 'question1-question',
      answer: 'question1-answer'
    }, {
      id: 2,
      title: 'question2',
      question: 'question2-question',
      answer: 'question2-answer'
    }]
  }, {
    id: 2,
    name : 'paper2',
    duration : 110,
    interviewee : 'zkzhao',
    email : 'z@z.com',
    questions: [{
      id: 3,
      title: 'question3',
      question: 'question3-question',
      answer: 'question3-answer'
    }, {
      id: 4,
      title: 'question4',
      question: 'question4-question',
      answer: 'question4-answer'
    }, {
      id: 5,
      title: 'question5',
      question: 'question5-question',
      answer: 'question5-answer'
    }]
  }]
}, action) {
  switch (action.type) {
    case SAVE_PAPER:
      return Object.assign({}, {
        records: [...state.records, action.content]
      });
      break;
  }
  return state;
};