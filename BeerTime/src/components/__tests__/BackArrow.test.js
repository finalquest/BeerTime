import React from 'react';
import { shallow } from 'enzyme';
import BackArrow from '../BackArrow';

describe('BackArrow test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<BackArrow />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onPress', () => {
    const onPress = jest.fn();
    const wrapper = shallow(<BackArrow onPress={onPress} />);
    wrapper.find('TouchableOpacity').prop('onPress')();
    expect(onPress).toBeCalled();
  });
});
