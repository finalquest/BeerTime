import React from 'react';
import { shallow } from 'enzyme';

import Screen from '../BeerDetailScreen';

const beer = {
  name: 'name',
  tagline: 'tagline',
  description: 'description',
  abv: 'abv',
  volume: { value: 20, unit: 'unit' },
  food_pairing: ['food'],
};

describe('BeerDetailScreen test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Screen beer={beer} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected without food_pairing', () => {
    const newBeer = { ...beer, food_pairing: [] };
    const wrapper = shallow(<Screen beer={newBeer} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('food_pairing link should call openBrowser with correct text', () => {
    const openBrowser = jest.fn();
    const wrapper = shallow(<Screen beer={beer} openBrowser={openBrowser} />);
    wrapper.find('TouchableOpacity').prop('onPress')();
    expect(openBrowser).toBeCalledWith('food');
  });
});
