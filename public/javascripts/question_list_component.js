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
    this.previews = [];
    QuestionStore.bind('load_question', this.loadQuestion);
  },

  componentWillUnmount: function () {
    QuestionStore.unbind('load_question', this.loadQuestion);
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
    }user_salt
  },

  render: function () {
    var self = this;
    var list = this.state.questions.length === 0 ? [] : this.state.questions.map(function (question) {
      return <Question attr={question} handleChange={self.handleChange.bind(this)}/>
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
})