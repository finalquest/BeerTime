import React from 'react';
import { shallow } from 'enzyme';

import Screen from '../BeerDetailScreen';

const beer = {
  name: 'name',
};

describe('BeerDetailScreen test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Screen beer={beer} />);
    expect(wrapper).toMatchSnapshot();
  });
});
