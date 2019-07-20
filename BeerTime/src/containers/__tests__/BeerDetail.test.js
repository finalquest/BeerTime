import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { Linking } from 'react-native';
import BeerDetail from '../BeerDetail';


const mockStore = configureStore();
const initialState = {};

const navigation = {
  getParam: () => undefined,
};

jest.mock('Linking', () => {
  const onCall = jest.fn();
  return {
    openURL: onCall,
    canOpenURL: () => true,
  };
});

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

  test('should open browser', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(
      <BeerDetail navigation={navigation} />,
      { context: { store } },
    );
    wrapper.find('BeerDetailScreen').prop('openBrowser')('test');
    expect(Linking.openURL).toBeCalledWith('https://www.allrecipes.com/search/results/?wt=test');
  });
});
