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
        <td>{this.props.attr.difficulty}</td>
        <td>{this.props.attr.interviewee}</td>
        <td>{this.props.attr.category}</td>
        <td>{this.props.attr.updatedAt}</td>
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
        <label>Team</label>
        <select className="ui dropdown signup-team">
          <option value="">Select Team</option>
          <option value="UI">UI</option>
          <option value="Ad Serving">Ad Serving</option>
          <option value='Forecasting'>Forecasting</option>
          <option value='Reporting'>Reporting</option>
        </select>
        <label>Position</label>
        <select className="ui dropdown signup-position">
          <option value="">Select Position</option>
          <option value='DEV'>DEV</option>
          <option value='QA'>QA</option>
        </select>
        <label>Difficulty</label>
        <select className="ui dropdown signup-position">
          <option value="">Select Difficulty</option>
          <option value='DEV'>1</option>
          <option value='QA'>2</option>
        </select>
        <label>Interviewee</label>
        <select className="ui dropdown signup-position">
          <option value="">Select Interviewee</option>
          <option value='Campus'>Campus</option>
          <option value='Social'>Social</option>
        </select>
        <label>Category</label>
        <select className="ui dropdown signup-position">
          <option value="">Select Category</option>
          <option value='Algorighms'>Algorighms</option>
          <option value='Database'>Database</option>
          <option value='Shell'>Shell</option>
        </select>
        <table className="ui red table">
          <thead>
            <tr>
              <th> </th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Interviewee</th>
              <th>Category</th>
              <th>Updated at</th>
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