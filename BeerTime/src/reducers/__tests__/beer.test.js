import reducer from '../beer';
import {
  GET_BEERS,
} from '../../model/const/actionNames';

describe('beer reducer test suite', () => {
  test('should return initial state', () => {
    const state = reducer(undefined, {});
    return expect(state).toEqual({ beers: [], page: 1 });
  });

  test('should update with beers', () => {
    const state = {
      beers: [{ data: 'key1' }],
      page: 1,
    };
    const nextState = reducer(
      undefined,
      {
        type: GET_BEERS,
        value: {
          result: [{ data: 'key1' }],
          page: 1,
        },
      },
    );

    expect(nextState).toEqual(state);
  });

  test('should ammend new beers if page is > 1 with beers', () => {
    const state = {
      beers: [{ data: 'key2' }, { data: 'key1' }],
      page: 2,
    };
    const nextState = reducer(
      { beers: [{ data: 'key2' }], page: 1 },
      {
        type: GET_BEERS,
        value: {
          result: [{ data: 'key1' }],
          page: 2,
        },
      },
    );

    expect(nextState).toEqual(state);
  });
});
