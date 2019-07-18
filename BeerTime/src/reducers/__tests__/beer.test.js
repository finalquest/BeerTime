import reducer from '../beer';
import {
  GET_BEERS,
} from '../../model/const/actionNames';

describe('fetching reducer test suite', () => {
  test('should return initial state', () => {
    const state = reducer(undefined, {});
    return expect(state).toEqual({ beers: [] });
  });

  test('should update with contexts', () => {
    const state = {
      beers: [{ data: 'key1' }],
    };
    const nextState = reducer(
      undefined,
      {
        type: GET_BEERS,
        value: [
          { data: 'key1' },
        ],
      },
    );

    expect(nextState).toEqual(state);
  });
});
