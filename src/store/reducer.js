import { combineReducers } from 'redux';
import beer from '../reducers/beer';
import navigation from '../reducers/navigation';
import fetching from '../reducers/fetching';


export default combineReducers({
  nav: navigation,
  fetching,
  beer,
});
