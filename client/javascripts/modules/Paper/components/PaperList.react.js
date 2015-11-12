import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionPreview extends Component {
  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }

  render () {
    return (
      <div className='four fields'>
        <div className='field'>
          <label>Title:</label>
        </div>
        <div className='field'>
          <p>{this.props.question.title}</p>
        </div>
        <br />
        <div className='field'>
          <label>Question:</label>
        </div>
        <div className='field'>
          <p>{this.props.question.question}</p>
        </div>
        <br />
        <div className='field'>
          <label>Answer:</label>
        </div>
        <div className='field'>
          <p>{this.props.question.answer}</p>
        </div>
      </div>
    );
  }
}

class PaperList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedQuestion: {
        title: '',
        question: '',
        answer: ''
      }
    };

    this.chooseQuestion = this.chooseQuestion.bind(this);
  }

  chooseQuestion (paperId, questionId) {
    const { papers } = this.props;
    this.setState({
      selectedQuestion: papers.filter( paper =>
        paper.id === paperId
      )[0].questions.filter( question =>
        question.id === questionId
      )[0]
    });
  }

  componentDidMount () {
    $('.ui.accordion').accordion();
  }

  render () {
    const { papers } = this.props;

    var paperItems = papers.map((paper) => {
      var questionItems = paper.questions.map( question =>
        <div className='item' key={question.id} onClick={this.chooseQuestion.bind(null, paper.id, question.id)}>{question.title}</div>
      );
      return (
        <div key={paper.id}>
          <div className='title'>
            <i className='dropdown icon'></i>
            {paper.name}
            {paper.interviewee}
            {paper.time}
            {paper.email}
          </div>
          <div className='content'>
            <div className='ui middle aligned selection list'>
              {questionItems}
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div>
          <div className='ui header'>Papers</div>
          <div className='ui styled fluid accordion'>
            {paperItems}
          </div>
        </div>
        <div>
          <div className='ui header'>Question Preview</div>
          <QuestionPreview question={this.state.selectedQuestion} />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    papers: state.paper.records
  };
}

export default connect(mapStateToProps)(PaperList);