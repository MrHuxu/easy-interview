import $ from 'jquery';
import NProgress from 'nprogress';
import React, { Component } from 'react';
import Router, { Link } from 'react-router';
import QuestionFilter from './QuestionFilter.react';
import Question from './Question.react';
import Selection from './Selection.react';
import UserStore from '../../User/stores/UserStore';
import QuestionActions from '../../Question/actions/QuestionActions';
import QuestionStore from '../../Question/stores/QuestionStore';
import { QuestionEvent } from '../../Common/events';
import { connect } from 'react-redux';

class Pagination extends Component {
  constructor (props) {
    super(props);
    this.changePage = this.changePage.bind(this);
  }

  changePage (page) {
    $('.item').removeClass('active');
    $(`.item.page${page}`).addClass('active');
    this.props.changePage(page);
  }

  render () {
    var pageBtns = [];
    for (var i = 0; i < this.props.pageCount; ++i) {
      pageBtns.push(<a className={i ? `item page${i + 1}` : `item page${i + 1} active`} onClick={this.changePage.bind(null, i + 1)} key={i + 1}>{i + 1}</a>);
    }
    return (
      <div className="ui borderless menu">
        {pageBtns}
      </div>
    )
  }
};

class QuestionList extends Component {
  constructor (props) {
    super(props);
    this.state = { questions: this.paginateQuestions(1) };

    this.paginateQuestions = this.paginateQuestions.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.loadPreview = this.loadPreview.bind(this);
    this.loadQuestion = this.loadQuestion.bind(this);
  }

  paginateQuestions (page) {
    return QuestionStore.getQuestions().slice(10 * (page - 1), 10 * page);
  }

  componentDidMount () {
    let callback = this.loadQuestion;
    QuestionEvent.addListener('LOAD_QUESTION', callback);
  }

  componentWillUnmount () {
    let callback = this.loadQuestion;
    QuestionEvent.removeListener('LOAD_QUESTION', callback);
  }

  handlePageChange (page) {
    this.setState({questions: this.paginateQuestions(page)});
  }

  loadQuestion () {
    NProgress.done();
    this.setState({questions: this.paginateQuestions(1)});
  }

  loadPreview () {
    QuestionActions.get({
      _id: { $in: QuestionStore.getSelectedQuestionIds() }
    });
  }

  render () {
    var list = this.props.questions.length === 0 ? [] : this.props.questions.map(function (question) {
      return <Question key={question.id} attr={question}/>
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
        <Pagination pageCount={this.props.questions.length / 10} changePage={this.handlePageChange.bind(this)}/>
        <div className='two wide column'>
            <Link className="ui blue button" to='/question/interviewee/view' onClick={this.loadPreview}>View</Link>
            <Link className="ui blue button" to='/question/interviewer/view' onClick={this.loadPreview}>View With Answer</Link>
        </div>
      </div>
    );
  }
};

function mapStateToProps (state) {
  return state;
}

export default connect(mapStateToProps)(QuestionList);