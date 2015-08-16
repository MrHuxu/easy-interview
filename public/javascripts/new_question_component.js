var NewQuestion = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  statics: {
    willTransitionTo: function (transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('login');
      }
    }
  },

  getInitialState: function () {
    return {
      difficulty: 0,
      type: '',
      question: '',
      anwser: ''
    };
  },

  componentDidMount: function () {
    var self = this;
    $('.ui.rating').rating('setting', 'onRate', function (value) {
      self.setState({difficulty: value});
    });
    $('.ui.dropdown').dropdown('setting', 'onChange', function (value) {
      self.setState({type: value});
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
              <div className='two fields'>
                <div className='field'>
                  <label>Difficulty</label>
                  <div className="ui star rating" data-max-rating="5"></div>
                </div>
                <div className='field'>
                  <label>Type</label>
                  <select className="ui dropdown">
                    <option value=''>Select Type</option>
                    <option value='campus'>Campus</option>
                    <option value='social'>Social</option>
                  </select>
                </div>
              </div>
              <div className='field'>
                <label>Question</label>
                <input type='text' valueLink={this.linkState('question')}/>
              </div>
              <div className='field'>
                <label>Anwser</label>
                <input type='text' valueLink={this.linkState('anwser')}/>
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
                  <label>Type:</label>
                </div>
                <div className='field'>
                  <p>{this.state.type}</p>
                </div>
              </div>
              <div className='field'>
                <label>Question:</label>
                <p>{this.state.question}</p>
              </div>
              <div className='field'>
                <label>Anwser:</label>
                <p>{this.state.anwser}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
})