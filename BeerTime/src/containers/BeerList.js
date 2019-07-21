import { connect } from 'react-redux';
import BeerListScreen from '../screens/BeerListScreen';
import getBeers from '../model/actions/getBeers';
import { GET_BEERS, TOGGLE_FAVS } from '../model/const/actionNames';
import { navigateTo } from '../model/actions/navigation';
import { BEER_DETAIL } from '../model/const/routeNames';
import { updateBeerStorage, getBeersFromStorage } from '../utils/updateBeerStorage';

const toggleFavAction = { type: TOGGLE_FAVS };
const mapStateToProps = ({
  beer: {
    page, name, endReached, filteredBeers: beers = [], showFavs,
  }, fetching,
}) => {
  const refreshing = fetching[`${GET_BEERS}`];
  return {
    beers,
    refreshing,
    page,
    name,
    endReached,
    showFavs,
  };
};
const mapDispatchToProps = dispatch => ({
  onMounted: (page = 0) => {
    getBeersFromStorage(dispatch);
    return dispatch(getBeers(page + 1));
  },
  onEndReached: (page, filters) => dispatch(getBeers(page + 1, filters, true)),
  applyFilter: filters => dispatch(getBeers(1, filters)),
  onItemSelected: beer => dispatch(navigateTo(BEER_DETAIL, { beer })),
  addToFavs: (id) => {
    updateBeerStorage(id, dispatch);
  },
  toggleFavs: () => dispatch(toggleFavAction),
});
export default connect(mapStateToProps, mapDispatchToProps)(BeerListScreen);
