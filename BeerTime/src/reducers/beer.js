import { GET_BEERS, GET_BEERS_FILTER } from '../model/const/actionNames';

const initialState = {
  beers: [],
  page: 1,
  name: undefined,
  endReached: false,
};

const beer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case GET_BEERS: {
      const { value: { result, page } } = action;
      const { beers: actualBears } = state;
      const totalBeers = page === 1 ? result : [...actualBears, ...result];
      const name = page === 1 ? undefined : state.name;
      const endReached = result.length === 0;
      return {
        ...state, beers: totalBeers, page, name, endReached,
      };
    }
    case GET_BEERS_FILTER: {
      const { value: { result, page, name } } = action;
      const endReached = result.length === 0;
      return {
        beers: result, page, name, endReached,
      };
    }
    default:
      return state;
  }
};

export default beer;
