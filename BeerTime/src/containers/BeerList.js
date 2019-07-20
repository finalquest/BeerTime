import { connect } from 'react-redux';
import BeerListScreen from '../screens/BeerListScreen';
import getBeers from '../model/actions/getBeers';
import { GET_BEERS } from '../model/const/actionNames';
import { navigateTo } from '../model/actions/navigation';
import { BEER_DETAIL } from '../model/const/routeNames';

const mapStateToProps = ({
  beer: {
    beers = [], page, name, endReached,
  }, fetching,
}) => {
  const refreshing = fetching[`${GET_BEERS}`];
  return {
    beers,
    refreshing,
    page,
    name,
    endReached,
  };
};
const mapDispatchToProps = dispatch => ({
  onMounted: (page = 0) => dispatch(getBeers(page + 1)),
  onEndReached: (page, filters) => dispatch(getBeers(page + 1, filters, true)),
  applyFilter: filters => dispatch(getBeers(1, filters)),
  onItemSelected: () => dispatch(navigateTo(BEER_DETAIL)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BeerListScreen);
