import { GET_BEERS, GET_BEERS_FILTER } from '../const/actionNames';

const getBeers = (page = 1, name, onlyRefresh = false) => {
  const nameParams = name ? { beer_name: name } : {};
  const type = name && !onlyRefresh ? GET_BEERS_FILTER : GET_BEERS;
  return (
    {
      type,
      request: {
        url: 'https://api.punkapi.com/v2/beers',
        data: {
          page,
          per_page: 10,
          ...nameParams,
        },
      },
      value: {
        page,
        name,
      },
    });
};

export default getBeers;
