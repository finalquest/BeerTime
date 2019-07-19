import reducer from '../beer';
import {
  GET_BEERS, GET_BEERS_FILTER,
} from '../../model/const/actionNames';

describe('beer reducer test suite', () => {
  test('should return initial state', () => {
    const state = reducer(undefined, {});
    return expect(state).toEqual({
      beers: [],
      page: 1,
      endReached: false,
      name: undefined,
      fromBrewDate: '',
      toBrewDate: '',
    });
  });

  test('should update with beers', () => {
    const state = {
      beers: [{ data: 'key1' }],
      page: 1,
      endReached: false,
      name: undefined,
      fromBrewDate: '',
      toBrewDate: '',
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
      endReached: false,
      name: undefined,
      fromBrewDate: '',
      toBrewDate: '',
    };
    const nextState = reducer(
      {
        beers: [{ data: 'key2' }], page: 1, fromBrewDate: '', toBrewDate: '',
      },
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

  test('should mantain name if exist', () => {
    const state = {
      beers: [{ data: 'key2' }, { data: 'key1' }],
      page: 2,
      endReached: false,
      name: 'name',
    };
    const nextState = reducer(
      { beers: [{ data: 'key2' }], page: 1, name: 'name' },
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

  test('should reset name if is first page', () => {
    const state = {
      beers: [{ data: 'key1' }],
      page: 1,
      endReached: false,
      name: undefined,
      fromBrewDate: '',
      toBrewDate: '',
    };
    const nextState = reducer(
      { beers: [{ data: 'key2' }], page: 2, name: 'name' },
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

  test('should set name if search by filter', () => {
    const state = {
      beers: [{ data: 'key1' }],
      page: 1,
      endReached: false,
      name: 'name',
    };
    const nextState = reducer(
      { beers: [{ data: 'key2' }], page: 1, name: undefined },
      {
        type: GET_BEERS_FILTER,
        value: {
          result: [{ data: 'key1' }],
          page: 1,
          name: 'name',
        },
      },
    );

    expect(nextState).toEqual(state);
  });
});
