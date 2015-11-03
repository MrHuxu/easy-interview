import $ from 'jquery';
import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

class Edit extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username        : '',
      team            : '',
      position        : '',
      password        : '',
      confirmPassword : ''
    };
  }

  componentDidMount () {
    $('.signup-team').dropdown('setting', 'onChange', (value) => {
      this.setState({team: value});
    });
    $('.signup-position').dropdown('setting', 'onChange', (value) => {
      this.setState({position: value});
    });
  }

  render () {
    return (
      <div className='ui stackable grid'>
        <div className='four wide column'></div>
        <div className='eight wide column'>
          <div className="ui segments">
            <div className="ui top attached secondary segment">Signup</div>
            <div className="ui green segment">
              <form className="ui form">
                <h4 className="ui dividing header">User Profile</h4>
                <div className="two fields">
                  <div className="field">
                    <label>Name</label>
                    <input type="text" valueLink={this.linkState('username')}/>
                  </div>
                  <div className="field">
                    <label>Username</label>
                    <div className="ui right labeled input">
                      <input type="text" placeholder="Enter LDAP ID..."/>
                      <div className="ui basic label">
                        @freewheel.tv
                      </div>
                    </div>
                  </div>
                </div>
                <div className='two fields'>
                  <div className='field'>
                    <label>Team</label>
                    <select className="ui dropdown signup-team">
                      <option value="">Select Team</option>
                      <option value="UI">UI</option>
                      <option value="Ad Serving">Ad Serving</option>
                      <option value='Forecasting'>Forecasting</option>
                      <option value='Reporting'>Reporting</option>
                    </select>
                  </div>
                  <div className='field'>
                    <label>Position</label>
                    <select className="ui dropdown signup-position">
                      <option value="">Select Position</option>
                      <option value='DEV'>DEV</option>
                      <option value='QA'>QA</option>
                    </select>
                  </div>
                </div>
                <div className='field'>
                  <label>Password</label>
                  <input type='password' valueLink={this.linkState('password')}/>
                </div>
                <div className='field'>
                  <label>Confirm Password</label>
                  <input type='password' valueLink={this.linkState('confirmPassword')}/>
                </div>
                <div className='field'>
                  <button className='ui blue button small' type='button' onClick={this.props.action.bind(null, this.state)}>{this.props.btnLabel}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

reactMixin(Edit.prototype, LinkedStateMixin);

export default Edit;