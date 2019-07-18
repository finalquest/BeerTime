import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import navigation from '../../middlewares/navigation';
import AppNavigator from '../AppNavigator';

const middlewares = [navigation]; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);
const initialState = {
  nav: {
    key: 'splash',
    index: 0,
    routes: [{
      routeName: 'splash',
      key: 'splash',
    }],
  },
};

describe('AppNavigator test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <AppNavigator />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper).toMatchSnapshot();
  });
});
