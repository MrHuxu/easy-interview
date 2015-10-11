var React = require('react/addons');
var $ = require('jquery');
window.jQuery = $; // Assure it's available globally.
require('../../bower_components/semantic-ui/dist/semantic.min.js');
var marked = require('marked');
var QuestionStore = require('../stores/QuestionStore');
var QuestionEvent = require('../events').QuestionEvent;

var PreviewSingleQuestion = React.createClass({
  render: function(){
    var reveal = this.props.role === "interviewer";
    var answer;
    if (reveal) {
      answer = (
        <div className="ui raised segment">
          <p><b>Answer:</b></p>
          <span dangerouslySetInnerHTML={{__html: marked(this.props.attr.answer)}} />
        </div>
      );
    }
    return (
      <tr>
        <td>
          <div className="ui sizer vertical segment">
            <div className="ui raised segment">
              <p><b>Questions:</b></p>
              <span dangerouslySetInnerHTML={{__html: marked(this.props.attr.question)}} />
            </div>
            {answer}
          </div>
        </td>
      </tr>
    );
  }
});

var PreviewQuestion = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    if (this.context.router.getCurrentParams().role) {
      this.role = this.context.router.getCurrentParams().role;
    }

    return {
      questions: [],
      role: this.role
    };
  },

  loadQuestion: function () {
    var question_previews = QuestionStore.getQuestions();
    this.setState({questions: question_previews});
  },

  componentDidMount: function () {
    $('.action-item').hide();
    QuestionEvent.on('load_question', this.loadQuestion);
  },

  componentWillUnmount: function () {
    $('.action-item').show();
  },

  render: function () {
    var owner = this;
    var list = this.state.questions.map(function (question) {
      return <PreviewSingleQuestion attr={question} role={owner.state.role}/>
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

module.exports = PreviewQuestion;