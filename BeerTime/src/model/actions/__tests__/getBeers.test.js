import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import apiMiddleware from '../../../middlewares/api';
import getBeers from '../getBeers';


const mockStore = configureStore([apiMiddleware, thunk]);
const initialState = {
};
const response = {
  data: 'data',
};

describe('getBeers test suite', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('expected action', () => {
    expect(getBeers()).toEqual({
      type: 'GET_BEERS',
      request: {
        url: 'https://api.punkapi.com/v2/beers',
        data: {
          page: 1,
          per_page: 10,
        },
      },
      value: {
        page: 1,
      },
    });
  });

  it('should dispatch without page param', () => {
    const body = JSON.stringify(response);
    fetch.once(body);
    const store = mockStore(initialState);
    return store.dispatch(getBeers()).then(() => {
      expect(fetch.mock.calls[0][0]).toEqual('https://api.punkapi.com/v2/beers?page=1&per_page=10');
      expect(store.getActions()).toMatchObject(
        [{ type: 'API_TRANSACTION_BEGIN', key: 'GET_BEERS' },
          {
            type: 'GET_BEERS',
            request: {
              url: 'https://api.punkapi.com/v2/beers',
              data: {
                page: 1,
                per_page: 10,
              },
            },
            value: { data: 'data' },
            error: undefined,
          },
          { type: 'API_TRANSACTION_END', key: 'GET_BEERS' }],
      );
    });
  });

  it('should dispatch with page param', () => {
    const body = JSON.stringify(response);
    fetch.once(body);
    const store = mockStore(initialState);
    return store.dispatch(getBeers(2)).then(() => {
      expect(fetch.mock.calls[0][0]).toEqual('https://api.punkapi.com/v2/beers?page=2&per_page=10');
      expect(store.getActions()).toMatchObject(
        [{ type: 'API_TRANSACTION_BEGIN', key: 'GET_BEERS' },
          {
            type: 'GET_BEERS',
            request: {
              url: 'https://api.punkapi.com/v2/beers',
              data: {
                page: 2,
                per_page: 10,
              },
            },
            value: { data: 'data' },
            error: undefined,
          },
          { type: 'API_TRANSACTION_END', key: 'GET_BEERS' }],
      );
    });
  });

  it('should dispatch with name param', () => {
    const body = JSON.stringify(response);
    fetch.once(body);
    const store = mockStore(initialState);
    return store.dispatch(getBeers(2, 'test')).then(() => {
      expect(fetch.mock.calls[0][0]).toEqual('https://api.punkapi.com/v2/beers?page=2&per_page=10&beer_name=test');
      expect(store.getActions()).toMatchObject(
        [{ type: 'API_TRANSACTION_BEGIN', key: 'GET_BEERS_FILTER' },
          {
            type: 'GET_BEERS_FILTER',
            request: {
              url: 'https://api.punkapi.com/v2/beers',
              data: {
                page: 2,
                per_page: 10,
                beer_name: 'test',
              },
            },
            value: { data: 'data' },
            error: undefined,
          },
          { type: 'API_TRANSACTION_END', key: 'GET_BEERS_FILTER' }],
      );
    });
  });

  it('should refresh if flag set', () => {
    const body = JSON.stringify(response);
    fetch.once(body);
    const store = mockStore(initialState);
    return store.dispatch(getBeers(2, 'test', true)).then(() => {
      expect(fetch.mock.calls[0][0]).toEqual('https://api.punkapi.com/v2/beers?page=2&per_page=10&beer_name=test');
      expect(store.getActions()).toMatchObject(
        [{ type: 'API_TRANSACTION_BEGIN', key: 'GET_BEERS' },
          {
            type: 'GET_BEERS',
            request: {
              url: 'https://api.punkapi.com/v2/beers',
              data: {
                page: 2,
                per_page: 10,
                beer_name: 'test',
              },
            },
            value: { data: 'data' },
            error: undefined,
          },
          { type: 'API_TRANSACTION_END', key: 'GET_BEERS' }],
      );
    });
  });
});
