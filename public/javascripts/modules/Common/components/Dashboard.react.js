import React, { Component } from 'react';
import QuestionActions from '../../Question/actions/QuestionActions';
import QuestionStore from '../../Question/stores/QuestionStore';
import QuestionList from './QuestionList.react';
import { Link } from 'react-router';

class Dashboard extends Component {
  constructor (props) {
    super(props);
    QuestionStore.initSearchConditions({});
  }

  componentDidMount () {
    QuestionActions.get(QuestionStore.getSearchConditions());
  }

  render () {
    return (
      <div className='ui stackable grid'>
        <div className='three wide column'></div>
        <div className='ten wide column'>
          <h1>Dashboard</h1>
          <p>This page show <strong>ALL</strong> questions, or you can go to your&nbsp;
            <Link to='/home'>homepage</Link> to deal with your own questions.
          </p>
          <QuestionList page={1}/>
        </div>
      </div>
    );
  }
}

export default Dashboard;