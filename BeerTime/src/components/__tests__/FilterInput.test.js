import React from 'react';
import { shallow } from 'enzyme';

import FilterInput from '../FilterInput';

describe('FilterInput test suite', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);

  it('renders as expected', () => {
    const wrapper = shallow(<FilterInput />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should set inputvalue state on textInput onChange', () => {
    const wrapper = shallow(<FilterInput />);
    wrapper.find('TextInput').prop('onChange')('test');
    expect(setState).toBeCalledWith('test');
  });

  it('should call callback if ok button pressed', () => {
    const selected = jest.fn();
    const wrapper = shallow(<FilterInput onFilterSelected={selected} />);
    wrapper.find('TouchableOpacity').at(0).prop('onPress')();
    expect(selected).toBeCalled();
  });

  it('should call callback if ok button pressed', () => {
    const selected = jest.fn();
    const wrapper = shallow(<FilterInput onFilterCancel={selected} />);
    wrapper.find('TouchableOpacity').at(1).prop('onPress')();
    expect(selected).toBeCalled();
  });
});
