import React, { Component } from 'react';
import QuestionList from './QuestionList.react';
import { MessageDispatcher } from '../dispatcher/AppDispatcher';
import UserStore from '../../User/stores/UserStore';
import QuestionActions from '../../Question/actions/QuestionActions';
import QuestionStore from '../../Question/stores/QuestionStore';
import { Link } from 'react-router';

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userLoggedIn: UserStore.isLoggedIn(),
      username: UserStore.getUser(),
      token: UserStore.getToken()
    };
    QuestionStore.initSearchConditions({creator: UserStore.getId()});
  }

  componentDidMount () {
    QuestionActions.get(QuestionStore.getSearchConditions());
  }

  render () {
    return (
      <div className='ui stackable grid'>
        <div className='three wide column'></div>
        <div className='ten wide column'>
          <div className='ui stackable grid'>
            <div className='sixteen wide column'>
              <h2>Hello {this.state.username}</h2>
            </div>
            <div className='fourteen wide column'>
              <div className='ui grid'>
                <div className='three wide column'>
                  <p>Team: {UserStore._team}</p>
                </div>
                <div className='three wide column'>
                  <p>Position: {UserStore._position}</p>
                </div>
              </div>
            </div>
            <div className='two wide column'>
              <Link className='ui green small button' to='/question/new'>Create</Link>
            </div>
          </div>
          <div className="ui horizontal divider"><i className="tag icon"></i></div>
          <h5>Go to <strong><Link to='/'>Dashboard</Link></strong> to see all questions!</h5>
          <QuestionList page={1}/>
        </div>
      </div>
    );
  }
}

export default Home;