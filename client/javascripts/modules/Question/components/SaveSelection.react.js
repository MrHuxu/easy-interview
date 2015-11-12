import $ from 'jquery';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { savePaper } from '../../Paper/actions/PaperActions';

class SaveSelection extends Component {
  constructor (props) {
    super(props);

    this._overlayTarget = document.getElementById('modal-area');
    this._overlay = (
      <div>
        <div className='ui small modal'>
          <div className='header'>
            Save Selection as Paper
          </div>
          <div className='content'>
            <form className='ui form'>
              <div className='two fields'>
                <div className='field'>
                  <label>Paper Name</label>
                  <input className='paper-name' type='text'/>
                </div>
                <div className='field'>
                  <label>Duration</label>
                  <div className='ui right labeled input'>
                    <input className='paper-duration' type="number"/>
                    <div className='ui label'>
                      min(s)
                    </div>
                  </div>
                </div>
              </div>
              <div className='two fields'>
                <div className='field'>
                  <label>Interviewee</label>
                  <input className='paper-interviewee' type='text'/>
                </div>
                <div className='field'>
                  <label>Email</label>
                  <input className='paper-email' type='text'/>
                </div>
              </div>
            </form>
          </div>
          <div className='actions'>
            <button className='ui teal right labeled icon approve button'>
              <i className='save icon'></i>
              Save
            </button>
            <button className='ui cancel red button'>Cancel</button>
          </div>
        </div>
      </div>
    );

    this.showConfrimDialog = this.showConfrimDialog.bind(this);
    this.saveInputName = this.saveInputName.bind(this);
  }

  showConfrimDialog () {
    $('.small.modal')
    .modal('show')
    .modal('setting', 'onApprove', () => {
      this.saveInputName();
    });
  }

  saveInputName () {
    var inputName = $('.paper-name')[0].value;
    this.props.dispatch(savePaper({
      name        : $('.paper-name')[0].value,
      duration    : $('.paper-interviewee')[0].value,
      interviewee : $('.paper-interviewee')[0].value,
      email       : $('.paper-email')[0].value
    }));
  }

  componentDidMount () {
    this._overlayInstance = ReactDom.render(this._overlay, this._overlayTarget);
  }

  componentWillUnmount () {
    ReactDom.unmountComponentAtNode(this._overlayTarget);
    this._overlayInstance = null;
    $('.small.modal').remove();
  }

  render () {
    return <button className='ui grey button' onClick={this.showConfrimDialog}>Save as Paper</button>;
  }
}

export default connect()(SaveSelection);