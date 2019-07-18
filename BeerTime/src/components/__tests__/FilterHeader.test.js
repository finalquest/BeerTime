import React from 'react';
import { shallow } from 'enzyme';

import FilterHeader from '../FilterHeader';

describe('FilterHeader test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<FilterHeader amount={2} />);
    expect(wrapper).toMatchSnapshot();
  });
});
