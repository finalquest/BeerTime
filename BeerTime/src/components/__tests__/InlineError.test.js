import React from 'react';
import { shallow } from 'enzyme';

import InlineError from '../InlineError';

describe('InlineError test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<InlineError error="pepe" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Label')).toHaveLength(1);
  });

  it('renders as expected with no error', () => {
    const wrapper = shallow(<InlineError error="" />);
    expect(wrapper.find('Label')).toHaveLength(0);
  });
});
