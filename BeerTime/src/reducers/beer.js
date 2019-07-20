import {
  GET_BEERS, GET_BEERS_FILTER,
  UPDATE_IDS,
} from '../model/const/actionNames';

const initialState = {
  beers: [],
  page: 1,
  name: undefined,
  endReached: false,
  toBrewDate: '',
  fromBrewDate: '',
};

const updatedBeers = (beers, ids) => beers.map(item => (
  { ...item, selected: ids.indexOf(item.id) !== -1 }
));

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
      const endReached = result.length === 0;
      return {
        ...state,
        beers: updatedBeers(totalBeers, favoritesIds),
        page,
        name,
        fromBrewDate,
        toBrewDate,
        endReached,
        favoritesIds,
      };
    }
    case GET_BEERS_FILTER: {
      const {
        value: {
          result, page, name, fromBrewDate, toBrewDate,
        },
      } = action;
      const { favoritesIds = [] } = state;
      const endReached = result.length === 0;
      return {
        ...state,
        beers: updatedBeers(result, favoritesIds),
        page,
        name,
        endReached,
        fromBrewDate,
        toBrewDate,
      };
    }
    case UPDATE_IDS: {
      const {
        value: ids,
      } = action;

      return {
        ...state, beers: updatedBeers(state.beers, ids), favoritesIds: ids,
      };
    }
    default:
      return state;
  }
};

export default beer;
