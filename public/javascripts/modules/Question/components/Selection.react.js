import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestQuestions } from '../actions/QuestionActions';

class Selection extends Component {
  constructor (props) {
    super(props);

    this.chooseSelected = this.chooseSelected.bind(this);
    this.showAllSelected = this.showAllSelected.bind(this);
  }

  chooseSelected (id) {
    this.props.dispatch(requestQuestions({
      $and: [
        { _id: id },
        this.props.initCondition
      ]
    }));
  }

  showAllSelected () {
    this.props.dispatch(requestQuestions({
      $and: [
        { _id: {$in: this.props.selection.map(question => question.id)} },
        this.props.initCondition
      ]
    }));
  }

  render () {
    const { dispatch, selection } = this.props;
    var questionBtns = selection.map(
      (question) => <button className='ui sm yellow button selected' onClick={this.chooseSelected.bind(null, question.id)} key={question.id}>{question.title}</button>
    );
    return (
      <span>
        <button className='ui sm olive button' onClick={this.showAllSelected}>Selected >></button>
        {questionBtns}
      </span>
    );
  }
};


function mapStateToProps (state) {
  return {
    selection     : state.selection,
    initCondition : state.question.initCondition
  };
}

export default connect(mapStateToProps)(Selection);