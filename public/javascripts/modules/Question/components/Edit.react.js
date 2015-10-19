import $ from 'jquery';
import React, { Component } from 'react';
import { History } from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import marked from 'marked';
import UserStore from '../../User/stores/UserStore';
import QuestionActions from '../actions/QuestionActions';
import QuestionStore from '../stores/QuestionStore';
import { QuestionEvent } from '../../Common/events';

var Edit = React.createClass({
  mixins: [LinkedStateMixin, History],

  saveQuestion: function () {
    var questionId = this.props.params.questionId;
    questionId ? QuestionActions.update({
      condition: {_id: questionId},
      content: this.state
    }) : QuestionActions.new(this.state);
  },

  loadQuestionContext: function () {
    QuestionActions.get({
      _id: this.props.params.questionId
    });
  },

  getInitialState: function () {
    if (this.props.params.questionId) {
      this.loadQuestionContext();
    }
    return {
      creator_id: UserStore.getId(),
      difficulty: 0,
      interviewee: '',
      category: '',
      title: '',
      question: '',
      answer: ''
    };
  },

  loadQuestion: function () {
    var self = this;
    var question = QuestionStore.getQuestions()[0];
    $('.ui.rating').rating('set rating', question.difficulty)
    $('.question-interviewee').dropdown('set selected', question.interviewee);
    $('.question-category').dropdown('set selected', question.category);
    this.state.creator_id = question.creator._id;
    this.setState(question);
  },

  componentDidMount: function () {
    var self = this;

    $('.ui.rating').rating('setting', 'onRate', function (value) {
      self.setState({difficulty: value});
    });

    $('.question-interviewee').dropdown('setting', 'onChange', function (value) {
      self.setState({interviewee: value});
    });

    $('.question-category').dropdown('setting', 'onChange', function (value) {
      self.setState({category: value});
    });

    QuestionEvent.on('load_question', this.loadQuestion);
  },

  renderEditArea: function () {
    return (
      <div className = 'eight wide column ui form'>
        <h3>Input</h3>
        <div className="ui horizontal divider"><i className="write icon"></i></div>
        <div className='field'>
          <label>Difficulty</label>
          <div className="ui star rating" data-max-rating="5"></div>
        </div>
        <div className='two fields'>
          <div className='field'>
            <label>Interviewee</label>
            <select className="ui dropdown question-interviewee">
              <option value=''>Select Interviewee</option>
              <option value='Campus'>Campus</option>
              <option value='Social'>Social</option>
            </select>
          </div>
          <div className='field'>
            <label>Category</label>
            <select className="ui dropdown question-category">
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
          <input type='text' valueLink={this.linkState('title')}/>
        </div>
        <div className='field'>
          <label>Question</label>
          <textarea valueLink={this.linkState('question')}/>
        </div>
        <div className='field'>
          <label>Answer</label>
          <textarea type='text' valueLink={this.linkState('answer')}/>
        </div>
        <div className='field'>
          <button type='submit' className='ui button teal' onClick={this.saveQuestion}>Save</button>
        </div>
      </div>
    );
  },

  render: function () {
    var hasPermission = !this.props.params.questionId || UserStore.getQuestions().indexOf(this.props.params.questionId) !== -1
    var editArea = hasPermission ? this.renderEditArea() : <div className='four wide column' />;

    return (
      <div className='ui stackable grid'>
        <div className="ui horizontal divider"></div>
        <div className='three wide column'></div>
        <div className='ten wide column'>
          <div className='ui grid'>
            <div className='sixteen wide column'>
              <button className='ui blue button' onClick={this.history.goBack}>{'<< Back'}</button>
            </div>
            {editArea}
            <div className='eight wide column ui form'>
              <h3>{hasPermission ? 'Preview' : 'Detail'}</h3>
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
});

export default Edit;