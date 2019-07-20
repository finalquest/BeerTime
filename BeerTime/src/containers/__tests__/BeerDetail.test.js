import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import BeerDetail from '../BeerDetail';

const mockStore = configureStore();
const initialState = {};

describe('BeerList test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <BeerDetail />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper).toMatchSnapshot();
  });
});
