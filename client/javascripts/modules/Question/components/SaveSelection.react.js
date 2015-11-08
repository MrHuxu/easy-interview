import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePaper } from '../../Paper/actions/PaperActions';

class SaveSelection extends Component {
  constructor (props) {
    super(props);

    this.showConfrimDialog = this.showConfrimDialog.bind(this);
    this.saveInputName = this.saveInputName.bind(this);
  }

  showConfrimDialog () {
    $('.small.modal')
    .modal('show')
    .modal('setting', 'onShow', () => {
      $('.paper-name')[0].value = '';
    })
    .modal('setting', 'onApprove', () => {
      this.saveInputName();
    });
  }

  saveInputName () {
    var inputName = $('.paper-name')[0].value;
    this.props.dispatch(savePaper(inputName));
  }

  render () {
    return (
      <div>
        <div className='ui small modal'>
          <div className="header">
            Save Selection as Paper
          </div>
          <div className='content'>
            <label>Enter Paper Name: </label>
            <div className='ui action input'>
              <input type='text' className='paper-name'/>
            </div>
          </div>
          <div className='actions'>
            <button className='ui teal right labeled icon approve button'>
              <i className='save icon'></i>
              Save
            </button>
            <button className='ui cancel red button'>Cancel</button>
          </div>
        </div>
        <button className='ui grey button' onClick={this.showConfrimDialog}>Save as Paper</button>
      </div>
    );
  }
}

export default connect()(SaveSelection);