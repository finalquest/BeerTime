import {
  createReduxContainer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import AppNavigator from './root';

const App = createReduxContainer(AppNavigator);
const mapStateToProps = state => ({
  state: state.nav,
});

export default connect(mapStateToProps)(App);
