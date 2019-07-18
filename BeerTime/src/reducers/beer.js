import { GET_BEERS } from '../model/const/actionNames';

const initialState = {
  beers: [],
};

const beer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case GET_BEERS: {
      const { value } = action;
      return { ...state, beers: value };
    }
    default:
      return state;
  }
};

export default beer;
