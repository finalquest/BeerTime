import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import BeerDetail from '../BeerDetail';

const mockStore = configureStore();
const initialState = {};

const navigation = {
  getParam: (p) => {
    switch (p) {
      case 'context':
        return { key: '123' };
      case 'form':
        return 'debin';
      default:
        return undefined;
    }
  },
};

describe('BeerList test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <BeerDetail navigation={navigation} />,
      { context: { store: mockStore(initialState) } },
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should dispatch back', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(
      <BeerDetail navigation={navigation} />,
      { context: { store } },
    );
    wrapper.find('BeerDetailScreen').prop('onBack')();
    expect(store.getActions()).toEqual([{ type: 'Navigation/BACK', key: null, immediate: undefined }]);
  });
});
