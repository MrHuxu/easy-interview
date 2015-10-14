var React = require('react');
var $ = require('jquery');
window.jQuery = $; // Assure it's available globally.
require('../../bower_components/semantic-ui/dist/semantic.min.js');
var Router = require('react-router');
var Link = Router.Link;
var QuestionFilter = require('./QuestionFilter.react');
var AuthStore = require('../stores/AuthStore');
var QuestionActions = require('../actions/QuestionActions');
var QuestionStore = require('../stores/QuestionStore');
var QuestionEvent = require('../events').QuestionEvent;

var Question = React.createClass({
  deleteQuestion: function (questionId) {
    QuestionActions.destroy({_id: questionId});
  },

  handleChange: function(event) {
    this.props.handleChange(this.props.attr.id, event.target.checked);
  },

  render: function () {
    var hasPermission = this.props.attr.creator && this.props.attr.creator._id === AuthStore.getId();
    return (
      <tr>
        <td className="collapsing">
          <div className="ui fitted toggle checkbox">
            <input type="checkbox"  onChange={this.handleChange}/> <label></label>
          </div>
        </td>
        <td><Link to='edit_question' params={{questionId: this.props.attr.id}}>{this.props.attr.title}</Link></td>
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
})

var QuestionList = React.createClass({

  getInitialState: function () {
    return {questions: QuestionStore.getQuestions()};
  },

  componentDidMount: function () {
    this.previews = [];
    QuestionEvent.on('load_question', this.loadQuestion);
  },

  loadQuestion: function () {
    this.setState({questions: QuestionStore.getQuestions()});
  },
  handleChange: function (id, value) {
    if (this.previews.indexOf(id) < 0 && value){
      this.previews.push(id);
    }else if (this.previews.indexOf(id) >=0){
      if (!value) {
        this.previews.splice(this.previews.indexOf(id), 1);
      }
    }
  },

  loadPreview: function () {
    var query = this.previews.map(function(select){
                  return {_id: select};
                });
    if (query.length > 0) {
      QuestionActions.get({
        $or:query 
      }); 
    }
  },

  render: function () {
    var self = this;
    var list = this.state.questions.length === 0 ? [] : this.state.questions.map(function (question) {
      return <Question key={question.id} attr={question} handleChange={self.handleChange}/>
    });
    return (
      <div>
        <QuestionFilter />
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
        <div className='two wide column'>
            <Link className="ui blue button" to='preview_question' params={{role: "interviewee"}} onClick={this.loadPreview}>View</Link>
            <Link className="ui blue button" to='preview_question' params={{role: "interviewer"}} onClick={this.loadPreview}>View With Answer</Link>
        </div>
      </div>
    );
  }
});

module.exports = QuestionList;