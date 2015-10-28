import React, { Component } from 'react';
import QuestionList from '../../Question/components/QuestionList.react';
import { Link } from 'react-router';
import { requestQuestions, setCondition } from '../../Question/actions/QuestionActions';
import { changePage } from '../../Question/actions/PaginationActions';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch(changePage(1));
    this.props.dispatch(setCondition({}));
    this.props.dispatch(requestQuestions({}));
  }

  render () {
    return (
      <div>
        <QuestionList />
      </div>
    );
  }
}

export default connect()(Dashboard);