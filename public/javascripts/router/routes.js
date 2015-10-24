import CommonRoute from '../modules/Common';
import { reduxRouteComponent } from 'redux-router';
import TestList from '../modules/Common/components/TestList';
import { store } from '../modules/Question/stores/QuestionStore';

const rootRoute = {
  component: 'div',
  childRoutes: [{
    path: '/',
    component: TestList,
    childRoutes:[]
  }]
}

// const rootRoute = {
//   component: 'div',
//   childRoutes: [
//     CommonRoute
//   ]
// }

export default rootRoute;