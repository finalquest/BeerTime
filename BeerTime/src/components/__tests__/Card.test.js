import React from 'react';
import { shallow } from 'enzyme';

import Card from '../Card';

describe('Card test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Card beer={{ image_url: 'testUrl' }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
