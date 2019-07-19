import React from 'react';
import { shallow } from 'enzyme';
import Input from '../TextInput';


describe('TextInput test suite', () => {
  it('renders as expected with standar props', () => {
    const props = {
      label: 'label',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        height: 30,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
      },
      onChange: () => {},
      error: '',
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange', () => {
    const onPress = jest.fn();
    const props = {
      label: 'label',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        height: 30,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
      },
      onChange: onPress,
    };
    const wrapper = shallow(<Input {...props} />);
    wrapper.find('TextInput').prop('onChangeText')();
    expect(onPress).toBeCalled();
  });
});
