import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import BeerList from '../BeerList';

const mockStore = configureStore();
const initialState = {
  beer: {
    beers: [],
  },
  fetching: {},
};

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
        request: { url: 'https://api.punkapi.com/v2/beers?page=1&per_page=10' },
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
        request: { url: 'https://api.punkapi.com/v2/beers?page=2&per_page=10' },
      }],
    );
  });
});
