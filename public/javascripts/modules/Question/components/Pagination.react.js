import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions/PaginationActions';

class Pagination extends Component {
  constructor (props) {
    super(props);
    this.changePage = this.changePage.bind(this);
  }

  changePage (page) {
    $('.item').removeClass('active');
    $(`.item.page${page}`).addClass('active');
    this.props.dispatch(changePage(page));
  }

  render () {
    var pageBtns = [];
    for (var i = 0; i < this.props.pageCount; ++i) {
      pageBtns.push(<a className={i ? `item page${i + 1}` : `item page${i + 1} active`} onClick={this.changePage.bind(null, i + 1)} key={i + 1}>{i + 1}</a>);
    }
    return (
      <div className="ui borderless menu">
        {pageBtns}
      </div>
    )
  }
};

export default connect()(Pagination);