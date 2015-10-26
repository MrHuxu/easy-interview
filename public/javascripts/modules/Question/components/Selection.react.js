import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestQuestions } from '../actions/QuestionActions';

class Selection extends Component {
  constructor (props) {
    super(props);
  }

  chooseSelected (id) {
    // QuestionActions.get({
    //   $and: [
    //     { _id: id },
    //     QuestionStore.getSearchConditions()
    //   ]
  }

  showAllSelected () {
    // QuestionActions.get({
    //   $and: [
    //     QuestionStore.getSearchConditions(),
    //     { _id: {$in: QuestionStore.getSelectedQuestionIds()} }
    //   ]
    // });
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
    selection: state.selection
  };
}

export default connect(mapStateToProps)(Selection);