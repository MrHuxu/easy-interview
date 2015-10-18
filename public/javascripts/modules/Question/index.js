import Edit from './components/Edit.react';
import Preview from './components/Preview.react';

module.exports = {
  path: 'question',
  childRoutes: [
    { path: 'new', component: Edit },
    { path: ':questionId/edit', component: Edit },
    { path: ':role/view', component: Preview }
  ]
};