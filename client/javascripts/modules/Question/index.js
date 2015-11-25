import Edit from './components/Edit.react';
import Preview from './components/Preview.react';
import { rootStore } from '../../rootStore';
import { requestQuestions } from './actions/QuestionActions';

module.exports = {
  path: 'question',
  childRoutes: [{
    path      : 'new',
    component : Edit
  }, {
    path      : ':questionId/edit',
    component : Edit,
    onEnter   : (nextState, replaceState) => {
      rootStore.dispatch(requestQuestions({ _id: nextState.params.questionId }));
    }
  }, {
    path      : ':role/view',
    component : Preview,
    onEnter   : (nextState, replaceState) => {
      var selectedIds = rootStore.getState().selection.map(question => question.id);
      rootStore.dispatch(requestQuestions({ _id: { $in: selectedIds } }));
    }
  }]
};