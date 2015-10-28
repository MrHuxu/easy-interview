import $ from 'jquery';
import NProgress from 'nprogress';
import React, { Component } from 'react';
import marked from 'marked';

class PreviewSingleQuestion extends Component {
  render () {
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
};

class Preview extends Component {
  constructor (props) {
    super(props);

    if (this.props.params.role) {
      this.role = this.props.params.role;
    }
    this.state = {
      role      : this.role,
      questions : []
    };

    this.loadQuestion = this.loadQuestion.bind(this);
  }

  loadQuestion () {
    var question_previews = QuestionStore.getQuestions();
    NProgress.done();
    this.setState({questions: question_previews});
  }

  componentDidMount () {
    $('.action-item').hide();
  }

  componentWillUnmount () {
    $('.action-item').show();
  }

  render () {
    var list = this.state.questions.map((question) => {
      return <PreviewSingleQuestion key={question.id} attr={question} role={this.state.role}/>
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
};

export default Preview;