import $ from 'jquery';
import React from 'react';
import QuestionActions from '../../Question/actions/QuestionActions';
import QuestionStore from '../../Question/stores/QuestionStore';

var QuestionFilter = React.createClass({
  searchConditionKyes: ['team', 'position', 'difficulty', 'interviewee', 'category'],
  searchConditions: {},

  reloadQuestions: function () {
    QuestionActions.get(QuestionStore.getSearchConditions());
  },

  cancleFilter: function () {
    $('.ui.dropdown').dropdown('clear');
    this.searchConditions = {};
    this.reloadQuestions();
  },

  componentDidMount: function () {
    var self = this;
    $('.filter-team').dropdown();
    $('.filter-position').dropdown();
    $('.filter-difficulty').dropdown('setting', 'onChange', function (value) {
      self.searchConditions['difficulty'] = value;
      self.reloadQuestions();
    });
    $('.filter-interviewee').dropdown('setting', 'onChange', function (value) {
      self.searchConditions['interviewee'] = value;
      self.reloadQuestions();
    });
    $('.filter-category').dropdown('setting', 'onChange', function (value) {
      self.searchConditions['category'] = value;
      self.reloadQuestions();
    });
  },

  render: function () {
    return (
      <div className="ui menu">
        <a className="item"><i className="filter icon"></i>Filters</a>
        <select className="ui dropdown compact filter-team item">
          <option value="">Select Team</option>
          <option value="UI">UI</option>
          <option value="Ad Serving">Ad Serving</option>
          <option value='Forecasting'>Forecasting</option>
          <option value='Reporting'>Reporting</option>
        </select>
        <select className="ui dropdown compact filter-position item">
          <option value="">Select Position</option>
          <option value='DEV'>DEV</option>
          <option value='QA'>QA</option>
        </select>
        <select className="ui pointing dropdown compact filter-difficulty item">
          <option value="">Select Difficulty</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        <select className="ui dropdown compact filter-interviewee">
          <option value="">Select Interviewee</option>
          <option value='Campus'>Campus</option>
          <option value='Social'>Social</option>
        </select>
        <select className="ui dropdown compact filter-category">
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
});

module.exports = QuestionFilter;