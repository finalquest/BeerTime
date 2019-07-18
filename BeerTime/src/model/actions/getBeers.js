import { GET_BEERS } from '../const/actionNames';

const getBeers = (page = 1) => ({
  type: GET_BEERS,
  request: {
    url: `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`,
  },
  value: {
    page,
  },
});

export default getBeers;
