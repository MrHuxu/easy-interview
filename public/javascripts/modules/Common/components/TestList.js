import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestQuestions } from '../../Question/actions/QuestionActions';


class TestList extends Component {
  render () {
    const { dispatch, questions } = this.props;
    var q = questions.map(question => <h1>{question.title}</h1>);
    return (
      <div>
        <h1>hehe</h1>
        <button onClick={() => dispatch(requestQuestions({_id: '55d4c6e550f4c37d6929971d'}))}>test Button</button>
        {q}
      </div>
    );
  };
}

function select (state) {
  return state;
}

export default connect(select)(TestList);