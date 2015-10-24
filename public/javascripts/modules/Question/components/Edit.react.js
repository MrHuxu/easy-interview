import $ from 'jquery';
import NProgress from 'nprogress';
import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import history from '../../../router/history';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import marked from 'marked';
import UserStore from '../../User/stores/UserStore';
import QuestionActions from '../actions/QuestionActions';
import QuestionStore from '../stores/QuestionStore';
import { QuestionEvent } from '../../Common/events';
import { requestQuestions, updateQuestion, newQuestion } from '../actions/QuestionActions';
import { connect } from 'react-redux';

class Edit extends Component {
  constructor (props) {
    super(props);
    this.hasPermission = true;
    this.state = {
      creator_id  : UserStore.getId(),
      difficulty  : 0,
      interviewee : '',
      category    : '',
      title       : '',
      question    : '',
      answer      : ''
    };

    this.saveQuestion = this.saveQuestion.bind(this);

    if (this.props.params.questionId) this.loadQuestion();
  }

  goBack () {
    history.goBack();
  }

  saveQuestion () {
    var questionId = this.props.params.questionId;
    questionId ? this.props.dispatch(updateQuestion({
      condition: {_id: questionId},
      content: this.state
    })) : this.props.dispatch(newQuestion(this.state));
  }

  loadQuestion () {
    this.props.dispatch(requestQuestions({ _id: this.props.params.questionId }));
  }

  componentWillReceiveProps () {
    var question = this.props.questions[0];
    // this.hasPermission = question.creator._id === UserStore.getId();
    this.hasPermission = true;

    $('.ui.rating').rating(this.hasPermission ? 'enable' : 'disable').rating('set rating', question.difficulty)
    $('.question-interviewee').addClass(this.hasPermission ? '' : 'disabled').dropdown('set selected', question.interviewee);
    $('.question-category').addClass(this.hasPermission ? '' : 'disabled').dropdown('set selected', question.category);

    if (!this.hasPermission) {
      $('.edit-area label').css({opacity: 0.5});
    }

    this.state.creator_id = question.creator._id;
    NProgress.done();
    this.setState(question);
  }

  componentDidMount () {
    $('.ui.rating').rating('setting', 'onRate', (value) => {
      this.setState({difficulty: value});
    });

    $('.question-interviewee').dropdown('setting', 'onChange', (value) => {
      this.setState({interviewee: value});
    });

    $('.question-category').dropdown('setting', 'onChange', (value) => {
      this.setState({category: value});
    });

    let callback = this.loadQuestion;
    QuestionEvent.addListener('LOAD_QUESTION', callback);
  }

  componentWillUnmount () {
    let callback = this.loadQuestion;
    QuestionEvent.removeListener('LOAD_QUESTION', callback);
  }

  renderEditArea () {
    return (
      <div className = 'eight wide column ui form edit-area'>
        <h3>Input</h3>
        <div className="ui horizontal divider"><i className="write icon"></i></div>
        <div className='field'>
          <label>Difficulty</label>
          <div className="ui star rating" data-max-rating="5"></div>
        </div>
        <div className='two fields'>
          <div className='field'>
            <label>Interviewee</label>
            <select className={`ui dropdown question-interviewee`}>
              <option value=''>Select Interviewee</option>
              <option value='Campus'>Campus</option>
              <option value='Social'>Social</option>
            </select>
          </div>
          <div className='field'>
            <label>Category</label>
            <select className={`ui dropdown question-category`}>
              <option value=''>Select Category</option>
              <option value='Algorithms'>Algorithms</option>
              <option value='Basic'>Basic</option>
              <option value='Database'>Database</option>
              <option value='Logic'>Logic</option>
              <option value='Programming'>Programming</option>
              <option value='Personality'>Personality</option>
            </select>
          </div>
        </div>
        <div className='field'>
          <label>Title</label>
          <input type='text' valueLink={this.linkState('title')} disabled={this.hasPermission ? '' : 'disabled'}/>
        </div>
        <div className='field'>
          <label>Question</label>
          <textarea valueLink={this.linkState('question')} disabled={this.hasPermission ? '' : 'disabled'}/>
        </div>
        <div className='field'>
          <label>Answer</label>
          <textarea type='text' valueLink={this.linkState('answer')} disabled={this.hasPermission ? '' : 'disabled'}/>
        </div>
        <div className='field'>
          <button type='submit' className={`ui button teal ${this.hasPermission ? '' : 'disabled'}`} onClick={this.saveQuestion}>Save</button>
        </div>
      </div>
    );
  }

  render () {
    return (
      <div className='ui stackable grid'>
        <div className="ui horizontal divider"></div>
        <div className='three wide column'></div>
        <div className='ten wide column'>
          <div className='ui grid'>
            <div className='sixteen wide column'>
              <button className='ui blue button' onClick={this.goBack}>{'<< Back'}</button>
            </div>
            {this.renderEditArea()}
            <div className='eight wide column ui form'>
              <h3>Preview</h3>
              <div className="ui horizontal divider"><i className="wizard icon"></i></div>
              <div className='field'>
                <label>Difficulty: {this.state.difficulty}</label>
              </div>
              <div className='four fields'>
                <div className='field'>
                  <label>Interviewee:</label>
                </div>
                <div className='field'>
                  <p>{this.state.interviewee}</p>
                </div>
                <div className='field'>
                  <label>Category:</label>
                </div>
                <div className='field'>
                  <p>{this.state.category}</p>
                </div>
              </div>
              <div className='field'>
                <div className='ui piled segment'>
                  <h4 className='ui header'>Title</h4>
                  <p>{this.state.title}</p>
                  <div className='ui divider'></div>
                  <h4 className='ui header'>Question</h4>
                  <span dangerouslySetInnerHTML={{__html: marked(this.state.question || '')}} />
                  <div className='ui divider'></div>
                  <h4 className='ui header'>Answer</h4>
                  <span dangerouslySetInnerHTML={{__html: marked(this.state.answer || '')}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

reactMixin(Edit.prototype, LinkedStateMixin);

function mapStateToProps (state) {
  return state;
}

export default connect(mapStateToProps)(Edit);