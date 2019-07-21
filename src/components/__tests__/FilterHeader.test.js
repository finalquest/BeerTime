import React from 'react';
import { shallow } from 'enzyme';

import FilterHeader from '../FilterHeader';

describe('FilterHeader test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<FilterHeader amount={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onFilter callback', () => {
    const filter = jest.fn();
    const wrapper = shallow(<FilterHeader amount={2} onFilterPressed={filter} />);
    wrapper.find('TouchableOpacity').at(1).prop('onPress')();
    expect(filter).toBeCalled();
  });
  it('should call onFav callback', () => {
    const filter = jest.fn();
    const wrapper = shallow(<FilterHeader amount={2} onFavPressed={filter} />);
    wrapper.find('TouchableOpacity').at(0).prop('onPress')();
    expect(filter).toBeCalled();
  });
});
