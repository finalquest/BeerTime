import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import FilterInput from '../FilterInput';

const mockStore = configureStore();
const initialState = {
  beer: {
    beers: [],
  },
  fetching: {},
};

describe('FilterInput test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <FilterInput />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper).toMatchSnapshot();
  });
});
