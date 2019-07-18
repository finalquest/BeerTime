import { connect } from 'react-redux';
import BeerListScreen from '../screens/BeerListScreen';
import getBeers from '../model/actions/getBeers';

const mapStateToProps = () => ({ });

const mapDispatchToProps = dispatch => ({
  onMounted: () => dispatch(getBeers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BeerListScreen);
