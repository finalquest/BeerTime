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
        request: { url: 'https://api.punkapi.com/v2/beers' },
      }],
    );
  });
});
