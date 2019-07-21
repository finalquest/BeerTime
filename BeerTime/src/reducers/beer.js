import {
  GET_BEERS, GET_BEERS_FILTER,
  UPDATE_IDS,
  TOGGLE_FAVS,
} from '../model/const/actionNames';

const initialState = {
  beers: [],
  page: 1,
  name: undefined,
  endReached: false,
  toBrewDate: '',
  fromBrewDate: '',
  showFavs: false,
  filteredBeers: [],
  favoritesIds: [],
};

const updatedBeers = (beers, ids = []) => beers.map(item => (
  { ...item, selected: ids.indexOf(item.id) !== -1 }
));

const filterBeers = (state) => {
  const { beers, showFavs = false } = state;
  if (showFavs) {
    const filteredBeers = beers.filter(item => item.selected === true);
    return { ...state, showFavs, filteredBeers };
  }

  return {
    ...state, showFavs, filteredBeers: beers,
  };
};

const beer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case GET_BEERS: {
      const { value: { result, page } } = action;
      const { beers: actualBears, favoritesIds = [] } = state;
      const totalBeers = page === 1 ? result : [...actualBears, ...result];
      const name = page === 1 ? undefined : state.name;
      const fromBrewDate = page === 1 ? '' : state.fromBrewDate;
      const toBrewDate = page === 1 ? '' : state.toBrewDate;
      const showFavs = page === 1 ? false : state.showFavs;
      const endReached = result.length === 0;

      return filterBeers({
        ...state,
        beers: updatedBeers(totalBeers, favoritesIds),
        page,
        name,
        fromBrewDate,
        toBrewDate,
        endReached,
        favoritesIds,
        showFavs,
      });
    }
    case GET_BEERS_FILTER: {
      const {
        value: {
          result, page, name, fromBrewDate, toBrewDate,
        },
      } = action;
      const { favoritesIds = [] } = state;
      const endReached = result.length === 0;
      const beers = updatedBeers(result, favoritesIds);
      return {
        ...state,
        beers,
        page,
        name,
        endReached,
        fromBrewDate,
        toBrewDate,
        showFavs: false,
        filteredBeers: beers,
      };
    }
    case UPDATE_IDS: {
      const {
        value: storeIds,
      } = action;

      const ids = storeIds === null ? [] : storeIds;
      return filterBeers({
        ...state, beers: updatedBeers(state.beers, ids), favoritesIds: ids,
      });
    }
    case TOGGLE_FAVS: {
      return filterBeers({ ...state, showFavs: !state.showFavs });
    }
    default:
      return state;
  }
};

export default beer;
