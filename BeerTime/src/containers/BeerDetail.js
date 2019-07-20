import { connect } from 'react-redux';
import { back } from '../model/actions/navigation';
import BeerDetailScreen from '../screens/BeerDetailScreen';

const mapStateToProps = (_, { navigation: { getParam } }) => ({
  beer: getParam('beer'),
});
const mapDispatchToProps = dispatch => ({
  onBack: () => dispatch(back()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BeerDetailScreen);
