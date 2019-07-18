import { connect } from 'react-redux';
import BeerListScreen from '../screens/BeerListScreen';
import getBeers from '../model/actions/getBeers';
import { GET_BEERS } from '../model/const/actionNames';

const mapStateToProps = ({ beer: { beers = [], page }, fetching }) => {
  const refreshing = fetching[`${GET_BEERS}`];
  return {
    beers,
    refreshing,
    page,
  };
};
const mapDispatchToProps = dispatch => ({
  onMounted: (page = 0) => dispatch(getBeers(page + 1)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BeerListScreen);
