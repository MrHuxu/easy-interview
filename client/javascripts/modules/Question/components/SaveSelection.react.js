import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class SaveSelection extends Component {
  constructor (props) {
    super(props);

    this.showConfrimDialog = this.showConfrimDialog.bind(this);
  }

  showConfrimDialog () {
    $('.ui.modal').modal('show');
  }

  render () {
    return (
      <div>
        <div className="ui modal">
          <div className="header">Header</div>
          <div className="content">
            <p></p>
          </div>
          <div className="actions">
            <div className="ui approve button">Approve</div>
            <div className="ui cancel button">Cancel</div>
          </div>
        </div>
        <button className='ui grey button' onClick={this.showConfrimDialog}>Save as Paper</button>
      </div>
    );
  }
}

export default connect()(SaveSelection);