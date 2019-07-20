import React from 'react';
import { shallow } from 'enzyme';

import Screen from '../BeerDetailScreen';

describe('BeerDetailScreen test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Screen />);
    expect(wrapper).toMatchSnapshot();
  });
});
