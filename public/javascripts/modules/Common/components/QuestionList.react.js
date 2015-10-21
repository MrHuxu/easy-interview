import $ from 'jquery';
import NProgress from 'nprogress';
import React, { Component } from 'react';
import Router, { Link } from 'react-router';
import QuestionFilter from './QuestionFilter.react';
import UserStore from '../../User/stores/UserStore';
import QuestionActions from '../../Question/actions/QuestionActions';
import QuestionStore from '../../Question/stores/QuestionStore';
import { QuestionEvent } from '../events';

class Question extends Component {
  constructor (props) {
    super(props);

    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  deleteQuestion (questionId) {
    QuestionActions.destroy({_id: questionId});
  }

  handleChange (isChecked) {
    isChecked ? QuestionActions.selectQuestion(this.props.attr.id) : QuestionActions.unselectQuestion(this.props.attr.id);
  }

  componentDidMount () {
    $(`.${this.props.attr.id}`)
    .checkbox(QuestionStore.isSelected(this.props.attr.id) ? 'set checked' : 'set unchecked')
    .checkbox({
      onChecked: () => this.handleChange(true),
      onUnchecked: () => this.handleChange(false)
    });
  }

  render () {
    var hasPermission = this.props.attr.creator && this.props.attr.creator._id === UserStore.getId();
    return (
      <tr>
        <td className='collapsing'>
          <div className={`ui fitted toggle checkbox ${this.props.attr.id}`}>
            <input type="checkbox"/>
          </div>
        </td>
        <td><Link to={`/question/${this.props.attr.id}/edit`}>{this.props.attr.title}</Link></td>
        <td>{this.props.attr.creator.username}</td>
        <td>{this.props.attr.creator.position}</td>
        <td>{this.props.attr.difficulty}</td>
        <td>{this.props.attr.interviewee}</td>
        <td>{this.props.attr.category}</td>
        <td><i className = {hasPermission ? 'remove circle icon' : 'lock icon'}
               onClick   = {hasPermission ? this.deleteQuestion.bind(null, this.props.attr.id) : null}>
            </i></td>
      </tr>
    );
  }
}

class Selected extends Component {
  constructor (props) {
    super(props);
    this.state = {questions: QuestionStore.getSelectedQuestions()};
    this.refreshSelectedBtns = this.refreshSelectedBtns.bind(this);
  }

  componentDidMount () {
    QuestionEvent.addListener('SELECTION_CHANGE', this.refreshSelectedBtns);
  }

  componentWillUnmount () {
    QuestionEvent.removeListener('SELECTION_CHANGE', this.refreshSelectedBtns);
  }

  refreshSelectedBtns () {
    this.setState({questions: QuestionStore.getSelectedQuestions()});
  }

  chooseSelected (id) {
    QuestionActions.get({
      $and: [
        { _id: id },
        QuestionStore.getSearchConditions()
      ]
    });
  }

  showAllSelected () {
    QuestionActions.get({
      $and: [
        QuestionStore.getSearchConditions(),
        { _id: {$in: QuestionStore.getSelectedQuestionIds()} }
      ]
    });
  }

  render () {
    var questionBtns = this.state.questions.map(
      (question) => <button className='ui sm yellow button selected' onClick={this.chooseSelected.bind(null, question.id)} data-id={question.id}>{question.title}</button>
    );
    return (
      <span>
        <button className='ui sm olive button' onClick={this.showAllSelected}>Selected >></button>
        {questionBtns}
      </span>
    );
  }
};

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
      pageBtns.push(<a className={i ? `item page${i + 1}` : `item page${i + 1} active`} onClick={this.changePage.bind(null, i + 1)}>{i + 1}</a>);
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
  }

  paginateQuestions (page) {
    return QuestionStore.getQuestions().slice(10 * (page - 1), 10 * page);
  }

  componentDidMount () {
    QuestionEvent.addListener('LOAD_QUESTION', this.loadQuestion.bind(this));
  }

  componentWillUnmount () {
    QuestionEvent.removeListener('LOAD_QUESTION', this.loadQuestion.bind(this));
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
    var self = this;
    var list = this.state.questions.length === 0 ? [] : this.state.questions.map(function (question) {
      return <Question key={question.id} attr={question}/>
    });

    return (
      <div>
        <QuestionFilter />
        <Selected />
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
        <Pagination pageCount={QuestionStore.getQuestions().length / 10} changePage={this.handlePageChange.bind(this)}/>
        <div className='two wide column'>
            <Link className="ui blue button" to='/question/interviewee/view' onClick={this.loadPreview}>View</Link>
            <Link className="ui blue button" to='/question/interviewer/view' onClick={this.loadPreview}>View With Answer</Link>
        </div>
      </div>
    );
  }
}

export default QuestionList;