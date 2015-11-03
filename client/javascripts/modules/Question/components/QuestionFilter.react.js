import $ from 'jquery';
import React, { Component } from 'react';
import { requestQuestions } from '../actions/QuestionActions';
import { connect } from 'react-redux';

class QuestionFilter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username : '',
      onCancle : false
    };

    this.searchConditionKyes = ['team', 'position', 'difficulty', 'interviewee', 'category'];
    this.searchConditions = {};

    this.reloadQuestions = this.reloadQuestions.bind(this);
    this.cancleFilter = this.cancleFilter.bind(this);
  }

  reloadQuestions () {
    var self = this;
    const { initCondition } = this.props;
    this.props.dispatch(requestQuestions({
      $and: [
        self.searchConditions,
        initCondition
      ]
    }));
    this.state.onCancle = false;
  }

  cancleFilter () {
    this.state.onCancle = true;
    $('.ui.dropdown').dropdown('clear');
    this.searchConditions = {};
    this.reloadQuestions();
  }

  componentDidMount () {
    $('.filter-team').dropdown();
    $('.filter-position').dropdown();
    $('.filter-difficulty').dropdown('setting', 'onChange', (value) => {
      if (value.length > 0)
        this.searchConditions.difficulty = { $in: value };
      else
        delete this.searchConditions.difficulty;
      if (!this.state.onCancle) this.reloadQuestions();
    });
    $('.filter-interviewee').dropdown('setting', 'onChange', (value) => {
      if (value.length > 0)
        this.searchConditions.interviewee = { $in: value };
      else
        delete this.searchConditions.interviewee;
      if (!this.state.onCancle) this.reloadQuestions();
    });
    $('.filter-category').dropdown('setting', 'onChange', (value) => {
      if (value.length > 0)
        this.searchConditions.category = { $in: value };
      else
        delete this.searchConditions.category;
      if (!this.state.onCancle) this.reloadQuestions();
    });
  }

  render () {
    return (
      <div className="ui menu">
        <a className="item"><i className="filter icon"></i>Filters</a>
        <select multiple={[]} className="ui multiple dropdown compact filter-team">
          <option value="">Select Team</option>
          <option value="UI">UI</option>
          <option value="Ad Serving">Ad Serving</option>
          <option value='Forecasting'>Forecasting</option>
          <option value='Reporting'>Reporting</option>
        </select>
        <select multiple={[]} className="ui multiple dropdown compact filter-position">
          <option value="">Select Position</option>
          <option value='DEV'>DEV</option>
          <option value='QA'>QA</option>
        </select>
        <select multiple={[]} className="ui multiple dropdown compact filter-difficulty">
          <option value="">Select Difficulty</option>
          <option value='0'>0</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        <select multiple={[]} className="ui multiple dropdown compact filter-interviewee">
          <option value="">Select Interviewee</option>
          <option value='Campus'>Campus</option>
          <option value='Social'>Social</option>
        </select>
        <select multiple={[]} className="ui multiple dropdown compact filter-category">
          <option value="">Select Category</option>
          <option value='Algorithms'>Algorithms</option>
          <option value='Basic'>Basic</option>
          <option value='Database'>Database</option>
          <option value='Logic'>Logic</option>
          <option value='Programming'>Programming</option>
          <option value='Personality'>Personality</option>
        </select>
        <button className = "ui red button item"
                onClick   = {this.cancleFilter}>
          <i className='remove icon'></i>
        </button>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    initCondition: state.question.initCondition
  };
}

export default connect(mapStateToProps)(QuestionFilter);