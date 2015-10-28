import $ from 'jquery';
import NProgress from 'nprogress';
import React, { Component } from 'react';
import Router, { Link } from 'react-router';
import QuestionFilter from './QuestionFilter.react';
import Selection from './Selection.react';
import SingleQuestion from './SingleQuestion.react';
import Pagination from './Pagination.react';
import QuestionActions from '../../Question/actions/QuestionActions';
import { QuestionEvent } from '../../Common/events';
import { connect } from 'react-redux';

class QuestionList extends Component {
  constructor (props) {
    super(props);
    this.state = { questions: [] };

    this.loadPreview = this.loadPreview.bind(this);
  }

  loadPreview () {
    QuestionActions.get({
      _id: { $in: QuestionStore.getSelectedQuestionIds() }
    });
  }

  componentDidMound () {

  }

  render () {
    const { questions, pagination } = this.props;
    var pagedQuestions = questions.slice(10 * (pagination.page - 1), 10 * pagination.page);
    var list = pagedQuestions.length === 0 ? [] : pagedQuestions.map(function (question) {
      return <SingleQuestion key={question.id} attr={question}/>
    });

    return (
      <div>
        <QuestionFilter />
        <Selection />
        <table className="ui red table">
          <thead>
            <tr>
              <th> </th>
              <th>Title</th>
              <th>Creator</th>
              <th>Position</th>
              <th>Difficulty</th>
              <th>Interviewee</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
        <Pagination pageCount={this.props.questions.length / 10}/>
        <div className='two wide column'>
            <Link className="ui blue button" to='/question/interviewee/view' onClick={this.loadPreview}>View</Link>
            <Link className="ui blue button" to='/question/interviewer/view' onClick={this.loadPreview}>View With Answer</Link>
        </div>
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    initCondition : state.question.initCondition,
    questions     : state.question.entities,
    pagination    : state.pagination
  };
}

export default connect(mapStateToProps)(QuestionList);