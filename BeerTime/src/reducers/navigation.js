import {
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import AppNavigator from '../navigation/root';

const navReducer = createNavigationReducer(AppNavigator);

const navigation = (state, action) => navReducer(state, action);

export default navigation;
