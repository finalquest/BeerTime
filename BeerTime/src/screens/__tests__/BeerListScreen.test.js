import React from 'react';
import { shallow } from 'enzyme';

import Screen from '../BeerListScreen';

describe('BeerListScreen test suite', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);

  it('renders as expected', () => {
    const wrapper = shallow(<Screen />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onEndReached with page', () => {
    const mounted = jest.fn();
    const wrapper = shallow(<Screen page={2} onEndReached={mounted} />);
    wrapper.find('FlatList').prop('onEndReached')();
    expect(mounted).toBeCalledWith(2, undefined);
  });

  it('should call onEndReached with page and name', () => {
    const mounted = jest.fn();
    const wrapper = shallow(<Screen page={3} name="name" onEndReached={mounted} />);
    wrapper.find('FlatList').prop('onEndReached')();
    expect(mounted).toBeCalledWith(3, 'name');
  });

  it('should update state when header onpress', () => {
    const wrapper = shallow(<Screen />);
    wrapper.find('FilterHeader').prop('onFilterPressed')();
    expect(setState).toBeCalledWith(true);
  });
});
