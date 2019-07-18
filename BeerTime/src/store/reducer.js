import { combineReducers } from 'redux';
import beer from '../reducers/beer';
import navigation from '../reducers/navigation';

export default combineReducers({
  nav: navigation,
  beer,
});
