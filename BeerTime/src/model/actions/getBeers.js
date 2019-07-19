import { GET_BEERS } from '../const/actionNames';

const getBeers = (page = 1, name) => ({
  type: GET_BEERS,
  request: {
    url: 'https://api.punkapi.com/v2/beers',
    data: {
      page,
      per_page: 10,
    },
  },
  value: {
    page,
    name,
  },
});

export default getBeers;
