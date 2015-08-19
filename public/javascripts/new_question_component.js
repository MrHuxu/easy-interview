var NewQuestion = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  statics: {
    willTransitionTo: function (transition) {
      if (!AuthStore.isLoggedIn()) {
        transition.redirect('login');
      }
    }
  },

  saveQuestion: function () {
    QuestionActions.new(this.state);
  },

  getInitialState: function () {
    return {
      creator_id: AuthStore._id,
      difficulty: 0,
      interviewee: '',
      category: '',
      title: '',
      question: '',
      anwser: ''
    };
  },

  componentDidMount: function () {
    var self = this;
    $('.ui.rating').rating('setting', 'onRate', function (value) {
      self.setState({difficulty: value});
    });
    $('.question-interviewee').dropdown('setting', 'onChange', function (value) {
      self.setState({interviewee: value});
    });
    $('.question-category').dropdown('setting', 'onChange', function (value) {
      self.setState({category: value});
    });
  },

  render: function () {
    return (
      <div className='ui stackable grid'>
        <div className="ui horizontal divider"></div>
        <div className='three wide column'></div>
        <div className='ten wide column'>
          <div className='ui grid'>
            <div className='sixteen wide column'>
              <Link to='home' className='ui blue button'>{'<< Back to home'}</Link>
            </div>
            <div className='eight wide column ui form'>
              <h3>Input</h3>
              <div className="ui horizontal divider"><i className="write icon"></i></div>
              <div className='field'>
                <label>Difficulty</label>
                <div className="ui star rating" data-max-rating="5"></div>
              </div>
              <div className='two fields'>
                <div className='field'>
                  <label>Interviewee</label>
                  <select className="ui dropdown question-interviewee">
                    <option value=''>Select Interviewee</option>
                    <option value='Campus'>Campus</option>
                    <option value='Social'>Social</option>
                  </select>
                </div>
                <div className='field'>
                  <label>Category</label>
                  <select className="ui dropdown question-category">
                    <option value=''>Select Category</option>
                    <option value='Algorithms'>Algorithms</option>
                    <option value='Database'>Database</option>
                    <option value='Shell'>Shell</option>
                  </select>
                </div>
              </div>
              <div className='field'>
                <label>Title</label>
                <input type='text' valueLink={this.linkState('title')}/>
              </div>
              <div className='field'>
                <label>Question</label>
                <textarea valueLink={this.linkState('question')}/>
              </div>
              <div className='field'>
                <label>Anwser</label>
                <textarea type='text' valueLink={this.linkState('anwser')}/>
              </div>
              <div className='field'>
                <button type='submit' className='ui button teal' onClick={this.saveQuestion.bind(this)}>Save</button>
              </div>
            </div>
            <div className='eight wide column ui form'>
              <h3>Preview</h3>
              <div className="ui horizontal divider"><i className="wizard icon"></i></div>
              <div className='six fields'>
                <div className='field'>
                  <label>Difficulty:</label>
                </div>
                <div className='field'>
                  <p>{this.state.difficulty}</p>
                </div>
                <div className='field'>
                  <label>Interviewee:</label>
                </div>
                <div className='field'>
                  <p>{this.state.interviewee}</p>
                </div>
                <div className='field'>
                  <label>Category:</label>
                </div>
                <div className='field'>
                  <p>{this.state.category}</p>
                </div>
              </div>
              <div className='field'>
                <div className='ui piled segment'>
                  <h4 className='ui header'>Title</h4>
                  <p>{this.state.title}</p>
                  <h4 className='ui header'>Question</h4>
                  <p>{this.state.question}</p>
                  <h4 className='ui header'>Anwser</h4>
                  <p>{this.state.anwser}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
})