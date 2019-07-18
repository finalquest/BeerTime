import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import BeerList from '../BeerList';

const mockStore = configureStore();
const initialState = {
};

describe('BeerList test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <BeerList />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper).toMatchSnapshot();
  });
});
