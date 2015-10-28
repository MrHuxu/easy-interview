import $ from 'jquery';
import React, { Component } from 'react';
import marked from 'marked';
import { connect } from 'react-redux';

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
  }

  componentDidMount () {
    $('.action-item').hide();
  }

  componentWillUnmount () {
    $('.action-item').show();
  }

  render () {
    const { loadFinish } = this.props;
    var questions = loadFinish ? this.props.questions : [];
    var list = questions.map((question) => {
      return <PreviewSingleQuestion key={question.id} attr={question} role={this.props.params.role}/>
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

function mapStateToProps (state) {
  return {
    router     : state.router,
    loadFinish : state.selection.length === state.question.entities.length,
    questions  : state.question.entities
  };
}

export default connect(mapStateToProps)(Preview);