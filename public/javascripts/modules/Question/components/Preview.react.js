import $ from 'jquery';
import NProgress from 'nprogress';
import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import marked from 'marked';
import QuestionStore from '../stores/QuestionStore';
import { QuestionEvent } from '../../Common/events';

var PreviewSingleQuestion = React.createClass({
  render: function(){
    var reveal = this.props.role === "interviewer";
    var answer;
    if (reveal) {
      answer = (
        <div className="ui raised segment">
          <p><b>Answer:</b></p>
          <span dangerouslySetInnerHTML={{__html: marked(this.props.attr.answer || '')}} />
        </div>
      );
    }
    return (
      <tr>
        <td>
          <div className="ui sizer vertical segment">
            <div className="ui raised segment">
              <p><b>Questions:</b></p>
              <span dangerouslySetInnerHTML={{__html: marked(this.props.attr.question || '')}} />
            </div>
            {answer}
          </div>
        </td>
      </tr>
    );
  }
});

var Preview = React.createClass({

  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    if (this.props.params.role) {
      this.role = this.props.params.role;
    }

    return {
      questions: [],
      role: this.role
    };
  },

  loadQuestion: function () {
    var question_previews = QuestionStore.getQuestions();
    NProgress.done();
    this.setState({questions: question_previews});
  },

  componentDidMount: function () {
    $('.action-item').hide();
    QuestionEvent.addListener('LOAD_QUESTION', this.loadQuestion);
  },

  componentWillUnmount: function () {
    $('.action-item').show();
    QuestionEvent.removeListener('LOAD_QUESTION', this.loadQuestion);
  },

  render: function () {
    var owner = this;
    var list = this.state.questions.map(function (question) {
      return <PreviewSingleQuestion key={question.id} attr={question} role={owner.state.role}/>
    });
    return (
      <div className="ui grid">
        <div className="two wide column"/>
        <div className="twelve wide column">
          <table className="ui table ">
            <tbody>
              {list}
            </tbody>
          </table>
        </div>
        <div className="two wide column"/>
      </div>
    );
  }
});

module.exports = Preview;