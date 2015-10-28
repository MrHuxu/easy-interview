import $ from 'jquery';
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
    const { currentPage } = this.props;

    var pageBtns = [];
    for (var i = 0; i < this.props.pageCount; ++i) {
      pageBtns.push(<a className={i + 1 === currentPage ? `item page${i + 1} active` : `item page${i + 1}`} onClick={this.changePage.bind(null, i + 1)} key={i + 1}>{i + 1}</a>);
    }
    return (
      <div className="ui borderless menu">
        {pageBtns}
      </div>
    )
  }
};

function mapStateToProps (state) {
  return {
    currentPage: state.pagination.page
  };
}

export default connect(mapStateToProps)(Pagination);