import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import BeerListScreen from '../screens/BeerListScreen';
import getBeers from '../model/actions/getBeers';
import { GET_BEERS, UPDATE_IDS } from '../model/const/actionNames';
import { navigateTo } from '../model/actions/navigation';
import { BEER_DETAIL } from '../model/const/routeNames';

const updateIdAction = id => ({ type: UPDATE_IDS, value: id });

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
  onItemSelected: beer => dispatch(navigateTo(BEER_DETAIL, { beer })),
  addToFavs: (id) => {
    AsyncStorage.getItem('beers').then((beer) => {
      const storedBeersId = beer ? JSON.parse(beer) : [];
      const index = storedBeersId.indexOf(id);
      let updatedId;
      if (index !== -1) {
        updatedId = storedBeersId.filter(item => item !== id);
        AsyncStorage.setItem('beers', JSON.stringify(updatedId));
      } else {
        updatedId = [...storedBeersId, id];
        AsyncStorage.setItem('beers', JSON.stringify(updatedId));
      }
      return dispatch(updateIdAction(updatedId));
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(BeerListScreen);
