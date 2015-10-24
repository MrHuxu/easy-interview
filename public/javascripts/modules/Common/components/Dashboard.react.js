import React, { Component } from 'react';
import QuestionStore from '../../Question/stores/QuestionStore';
import QuestionList from '../../Question/components/QuestionList.react';
import { Link } from 'react-router';
import { requestQuestions } from '../../Question/actions/QuestionActions';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor (props) {
    super(props);
    QuestionStore.initSearchConditions({});
  }

  componentDidMount () {
    this.props.dispatch(requestQuestions({}));
  }

  render () {
    return (
      <div className='ui stackable grid'>
        <div className='three wide column'></div>
        <div className='ten wide column'>
          <h1>Dashboard</h1>
          <Link to='/hehe'>Test</Link>
          <p>This page show <strong>ALL</strong> questions, or you can go to your&nbsp;
            <Link to='/home'>homepage</Link> to deal with your own questions.
          </p>
          <QuestionList page={1}/>
        </div>
      </div>
    );
  }
}

export default connect()(Dashboard);