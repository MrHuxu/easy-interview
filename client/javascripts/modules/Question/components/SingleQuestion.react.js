import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { selectQuestion, unselectQuestion } from '../actions/SelectionActions';
import { deleteQuestion } from '../actions/QuestionActions';

class SingleQuestion extends Component {
  constructor (props) {
    super(props);

    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  deleteQuestion (questionId) {
    this.props.dispatch(deleteQuestion({_id: questionId}));
  }

  handleChange (isChecked) {
    isChecked ? this.props.dispatch(selectQuestion({
      id: this.props.attr.id,
      title: this.props.attr.title
    })) : this.props.dispatch(unselectQuestion(this.props.attr.id));
  }

  componentDidMount () {
    $(`.${this.props.attr.id}`)
    .checkbox(this.props.selectedIds.indexOf(this.props.attr.id) !== -1 ? 'set checked' : 'set unchecked')
    .checkbox({
      onChecked: () => this.handleChange(true),
      onUnchecked: () => this.handleChange(false)
    });
  }

  render () {
    const { userId } = this.props;
    var hasPermission = this.props.attr.creator && this.props.attr.creator._id === userId;
    return (
      <tr>
        <td className='collapsing'>
          <div className={`ui fitted toggle checkbox ${this.props.attr.id}`}>
            <input type="checkbox"/>
          </div>
        </td>
        <td><Link to={`/question/${this.props.attr.id}/edit`}>{this.props.attr.title}</Link></td>
        <td>{this.props.attr.creator.username}</td>
        <td>{this.props.attr.creator.position}</td>
        <td>{this.props.attr.difficulty}</td>
        <td>{this.props.attr.interviewee}</td>
        <td>{this.props.attr.category}</td>
        <td><i className = {hasPermission ? 'remove circle icon' : 'lock icon'}
               onClick   = {hasPermission ? this.deleteQuestion.bind(null, this.props.attr.id) : null}>
            </i></td>
      </tr>
    );
  }
}

function mapStateToProps (state) {
  return {
    userId      : state.user.id,
    selectedIds : state.selection.map(question => question.id)
  }
}

export default connect(mapStateToProps)(SingleQuestion);
