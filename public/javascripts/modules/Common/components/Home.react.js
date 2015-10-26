import React, { Component } from 'react';
import QuestionList from '../../Question/components/QuestionList.react';
import { MessageDispatcher } from '../dispatcher/AppDispatcher';
import UserStore from '../../User/stores/UserStore';
import { changePage } from '../../Question/actions/PaginationActions';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Home extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch(changePage(1));
  }

  render () {
    const { username, position, team } = this.props.user;

    return (
      <div className='ui stackable grid'>
        <div className='three wide column'></div>
        <div className='ten wide column'>
          <div className='ui stackable grid'>
            <div className='sixteen wide column'>
              <h2>Hello {username}</h2>
            </div>
            <div className='fourteen wide column'>
              <div className='ui grid'>
                <div className='three wide column'>
                  <p>Team: {team}</p>
                </div>
                <div className='three wide column'>
                  <p>Position: {position}</p>
                </div>
              </div>
            </div>
            <div className='two wide column'>
              <Link className='ui green small button' to='/question/new'>Create</Link>
            </div>
          </div>
          <div className="ui horizontal divider"><i className="tag icon"></i></div>
          <h5>Go to <strong><Link to='/'>Dashboard</Link></strong> to see all questions!</h5>
          <QuestionList />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    user         : state.user,
    token        : state.user.token,
    userLoggedIn : state.user.id
  }
}
export default connect(mapStateToProps)(Home);