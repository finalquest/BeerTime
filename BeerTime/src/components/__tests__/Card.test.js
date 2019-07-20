import React from 'react';
import { shallow } from 'enzyme';

import Card from '../Card';

describe('Card test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Card beer={{ image_url: 'testUrl' }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call itemSelected', () => {
    const itemSelected = jest.fn();
    const wrapper = shallow(<Card
      beer={{ image_url: 'testUrl', id: 1 }}
      onItemSelected={itemSelected}
    />);
    wrapper.find('TouchableOpacity').at(0).prop('onPress')();
    expect(itemSelected).toBeCalledWith({ image_url: 'testUrl', id: 1 });
  });

  it('should call addToFavs', () => {
    const addToFavs = jest.fn();
    const wrapper = shallow(<Card
      beer={{ image_url: 'testUrl', id: 1 }}
      addToFavs={addToFavs}
    />);
    wrapper.find('TouchableOpacity').at(1).prop('onPress')();
    expect(addToFavs).toBeCalledWith(1);
  });
});
