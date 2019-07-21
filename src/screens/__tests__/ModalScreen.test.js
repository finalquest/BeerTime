import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import ModalScreen from '../ModalScreen';

describe('ModalScreen test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<ModalScreen><Text>Test</Text></ModalScreen>);
    expect(wrapper).toMatchSnapshot();
  });
});
