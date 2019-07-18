import React from 'react';
import { shallow } from 'enzyme';

import Screen from '../BeerListScreen';

describe('BeerListScreen test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Screen />);
    expect(wrapper).toMatchSnapshot();
  });
});
