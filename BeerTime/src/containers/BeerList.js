import { connect } from 'react-redux';
import BeerListScreen from '../screens/BeerListScreen';
import getBeers from '../model/actions/getBeers';
import { GET_BEERS } from '../model/const/actionNames';

const mapStateToProps = ({ beer: { beers = [] }, fetching }) => {
  const refreshing = fetching[`${GET_BEERS}`];
  return {
    beers,
    refreshing,
  };
};
const mapDispatchToProps = dispatch => ({
  onMounted: () => dispatch(getBeers()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BeerListScreen);
