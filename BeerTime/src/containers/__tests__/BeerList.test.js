import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';


import BeerList from '../BeerList';

const mockStore = configureStore();
const initialState = {
  beer: {
    beers: [],
  },
  fetching: {},
};

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);


describe('BeerList test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <BeerList />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispacth getBeer action on onMount', () => {
    const store = mockStore({ ...initialState });
    const wrapper = shallow(
      <BeerList />,
      { context: { store } },
    );
    wrapper.find('BeerListScreen').prop('onMounted')();
    expect(store.getActions()).toEqual(
      [{
        type: 'GET_BEERS',
        value: {
          page: 1,
        },
        request: {
          url: 'https://api.punkapi.com/v2/beers',
          data: {
            page: 1,
            per_page: 10,
          },
        },
      }],
    );
  });

  it('should dispacth getBeer action with page + 1', () => {
    const store = mockStore({ ...initialState });
    const wrapper = shallow(
      <BeerList />,
      { context: { store } },
    );
    wrapper.find('BeerListScreen').prop('onMounted')(1);
    expect(store.getActions()).toEqual(
      [{
        type: 'GET_BEERS',
        value: {
          page: 2,
        },
        request: {
          url: 'https://api.punkapi.com/v2/beers',
          data: {
            page: 2, per_page: 10,
          },
        },
      }],
    );
  });

  it('should dispacth getBeer action when endreached', () => {
    const store = mockStore({ ...initialState });
    const wrapper = shallow(
      <BeerList />,
      { context: { store } },
    );
    wrapper.find('BeerListScreen').prop('onEndReached')(1, { name: 'name' });
    expect(store.getActions()).toEqual(
      [{
        type: 'GET_BEERS',
        request: {
          url: 'https://api.punkapi.com/v2/beers',
          data: {
            beer_name: 'name',
            page: 2,
            per_page: 10,
          },
        },
        value: {
          page: 2,
          name: 'name',
          toBrewDate: undefined,
          fromBrewDate: undefined,
        },
      }],
    );
  });

  it('should dispacth getBeer action when applyFilter', () => {
    const store = mockStore({ ...initialState });
    const wrapper = shallow(
      <BeerList />,
      { context: { store } },
    );
    wrapper.find('BeerListScreen').prop('applyFilter')({ name: 'name' });
    expect(store.getActions()).toEqual(
      [{
        type: 'GET_BEERS_FILTER',
        request: {
          url: 'https://api.punkapi.com/v2/beers',
          data: {
            beer_name: 'name',
            page: 1,
            per_page: 10,
          },
        },
        value: {
          page: 1,
          name: 'name',
          toBrewDate: undefined,
          fromBrewDate: undefined,
        },
      }],
    );
  });

  it('should dispacth getBeer action when item selected', () => {
    const store = mockStore({ ...initialState });
    const wrapper = shallow(
      <BeerList />,
      { context: { store } },
    );
    wrapper.find('BeerListScreen').prop('onItemSelected')({ name: 'name', tagline: 'tagline' });
    expect(store.getActions()).toEqual(
      [{
        type: 'Navigation/NAVIGATE',
        routeName: 'BEER_DETAIL',
        params: { beer: { name: 'name', tagline: 'tagline' } },
      }],
    );
  });
});
