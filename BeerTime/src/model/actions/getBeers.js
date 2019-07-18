import { GET_BEERS } from '../const/actionNames';

const getBeers = () => ({
  type: GET_BEERS,
  request: {
    url: 'https://api.punkapi.com/v2/beers',
  },
});

export default getBeers;
