import React from 'react';
import { shallow } from 'enzyme';

import Label from '../Label';

describe('Label test suite', () => {
  afterEach(() => {
    // jest.clearAllMocks(); // Does not remove mockImplementation between tests

    jest.restoreAllMocks(); // What I want to do.
  });


  it('renders as expected', () => {
    const wrapper = shallow(<Label>HO</Label>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support style', () => {
    const wrapper = shallow(<Label style={{ backgroundColor: 'red' }}>HO</Label>).dive();
    expect(wrapper.find('TouchableText').prop('style')[0].backgroundColor).toEqual('red');
  });

  it('should change fontsize with ios platform', () => {
    const wrapper = shallow(<Label style={{ backgroundColor: 'red' }}>HO</Label>).dive();
    expect(wrapper.find('TouchableText').prop('style')[1].fontSize).toEqual(33);
  });

  it('should change fontsize with ios platform', () => {
    jest.mock('Platform', () => {
      const Platform = require.requireActual('Platform');
      Platform.OS = 'android';
      return Platform;
    });
    const wrapper = shallow(<Label style={{ backgroundColor: 'red' }}>HO</Label>).dive();
    expect(wrapper.find('TouchableText').prop('style')[1].fontSize).toEqual(30);
  });
});
