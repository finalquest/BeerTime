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

  it('should call onMount with page', () => {
    const mounted = jest.fn();
    const wrapper = shallow(<Screen item={{ page: 1 }} onMounted={mounted} />);
    wrapper.find('FlatList').prop('onEndReached')();
    expect(mounted).toBeCalledWith(1);
  });

  it('should update state when header onpress', () => {
    const mounted = jest.fn();
    const wrapper = shallow(<Screen item={{ page: 1 }} onMounted={mounted} />);
    wrapper.find('FilterHeader').prop('onFilterPressed')();
    expect(setState).toBeCalledWith(true);
  });
});
