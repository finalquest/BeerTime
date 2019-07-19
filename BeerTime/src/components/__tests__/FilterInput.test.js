import React from 'react';
import { shallow } from 'enzyme';

import FilterInput from '../FilterInput';

describe('FilterInput test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<FilterInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
