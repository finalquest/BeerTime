import { GET_BEERS } from '../model/const/actionNames';

const initialState = {
  beers: [],
  page: 1,
};

const beer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case GET_BEERS: {
      const { value: { result, page } } = action;
      const { beers: actualBears } = state;
      const totalBeers = page === 1 ? result : [...actualBears, ...result];
      return { ...state, beers: totalBeers, page };
    }
    default:
      return state;
  }
};

export default beer;
