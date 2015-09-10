var Question = React.createClass({
  deleteQuestion: function (questionId) {
    QuestionActions.destroy({_id: questionId});
  },

  render: function () {
    var hasPermission = this.props.attr.creator._id === AuthStore.getId();
    return (
      <tr>
        <td className="collapsing">
          <div className="ui fitted toggle checkbox">
            <input type="checkbox"/> <label></label>
          </div>
        </td>
        <td><Link to='edit_question' params={{questionId: this.props.attr.id}}>{this.props.attr.title}</Link></td>
        <td>{this.props.attr.creator.username}</td>
        <td>{this.props.attr.creator.position}</td>
        <td>{this.props.attr.difficulty}</td>
        <td>{this.props.attr.interviewee}</td>
        <td>{this.props.attr.category}</td>
        <td><i className = {hasPermission ? 'remove circle icon' : 'lock icon'}
               onClick   = {hasPermission ? this.deleteQuestion.bind(this, this.props.attr.id) : null}>
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
      </div>
    );
  }
})