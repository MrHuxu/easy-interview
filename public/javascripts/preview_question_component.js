var PreviewSingleQuestion = React.createClass({
  render: function(){
    var reveal = this.props.role === "interviewer";
    var answer;
    if (reveal) {
      answer = <div className="ui raised segment"><p>{this.props.attr.anwser}</p></div>;
    }
    return(
      <tr>
        <td>
          <div className="ui sizer vertical segment">
            <div className="ui large header">{this.props.attr.title}</div>
            <div className="ui raised segment"><p>{this.props.attr.question}</p></div>
            {answer}
          </div>
        </td>
      </tr>
    )
  }
})
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
    QuestionStore.bind('load_question', this.loadQuestion);
  },

  componentWillUnmount: function () {
    QuestionStore.unbind('load_question', this.loadQuestion);
  },

	render: function () {
    var owner = this;
    var list = this.state.questions.map(function (question) {
      return <PreviewSingleQuestion attr={question} role={owner.state.role}/>
    });
		return(
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
})