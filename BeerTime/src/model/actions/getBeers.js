import { GET_BEERS, GET_BEERS_FILTER } from '../const/actionNames';

const validBrewDates = (from, to) => (from && from !== '') || (to && to !== '');

const getBeers = (page = 1, {
  name, fromBrewDate, toBrewDate,
} = {}, onlyRefresh = false) => {
  const nameParams = name ? { beer_name: name } : {};
  const toBrewParams = toBrewDate && toBrewDate !== '' ? { brewed_before: toBrewDate } : {};
  const fromBrewParams = fromBrewDate && fromBrewDate !== '' ? { brewed_after: fromBrewDate } : {};

  const type = (name || validBrewDates(fromBrewDate, toBrewDate)) && !onlyRefresh
    ? GET_BEERS_FILTER : GET_BEERS;
  return (
    {
      type,
      request: {
        url: 'https://api.punkapi.com/v2/beers',
        data: {
          page,
          per_page: 10,
          ...nameParams,
          ...toBrewParams,
          ...fromBrewParams,
        },
      },
      value: {
        page,
        name,
        toBrewDate,
        fromBrewDate,
      },
    });
};

export default getBeers;
