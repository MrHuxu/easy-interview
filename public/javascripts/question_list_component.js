var Question = React.createClass({
  render: function () {
    return (
      <tr>
        <td className="collapsing">
          <div className="ui fitted toggle checkbox">
            <input type="checkbox"/> <label></label>
          </div>
        </td>
        <td>{this.props.attr.title}</td>
        <td>{this.props.attr.difficulty}</td>
        <td>{this.props.attr.interviewee}</td>
        <td>{this.props.attr.category}</td>
        <td>{this.props.attr.updatedAt}</td>
      </tr>
    );
  }
})

var QuestionList = React.createClass({
  getInitialState: function () {
    return {questions: QuestionStore.getQuestions()};
  },

  componentDidMount: function () {
    QuestionStore.bind('load_question', this.loadQuestion);
  },

  componentWillUnmount: function () {
    QuestionStore.unbind('load_question', this.loadQuestion);
  },

  loadQuestion: function () {
    this.setState({questions: QuestionStore.getQuestions()});
  },

  render: function () {
    var list = this.state.questions.map(function (question) {
      return <Question attr={question}/>
    });
    return (
      <table className="ui red table">
        <thead>
          <tr>
            <th> </th>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Interviewee</th>
            <th>Category</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    );
  }
})