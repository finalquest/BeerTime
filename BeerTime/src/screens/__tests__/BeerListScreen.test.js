import React from 'react';
import { shallow } from 'enzyme';

import Screen from '../BeerListScreen';

describe('BeerListScreen test suite', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);

  it('renders as expected', () => {
    const wrapper = shallow(<Screen />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as expected with data', () => {
    const beers = [{
      name: 'name',
    },
    { name: 'name2' }];
    const wrapper = shallow(<Screen beers={beers} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('call onSelect with correct value', () => {
    const beers = [{
      name: 'name',
    },
    { name: 'name2' }];
    const onItemSelected = jest.fn();
    const wrapper = shallow(<Screen beers={beers} onItemSelected={onItemSelected} />);
    const renderItem = wrapper.find('FlatList').prop('renderItem');
    const wrapper2 = shallow(renderItem({ item: { name: 'test' } }));
    wrapper2.find('TouchableOpacity').prop('onPress')();
    expect(onItemSelected).toBeCalledWith({ name: 'test' });
  });

  it('should call onEndReached with page', () => {
    const mounted = jest.fn();
    const wrapper = shallow(<Screen page={2} onEndReached={mounted} />);
    wrapper.find('FlatList').prop('onEndReached')();
    expect(mounted).toBeCalledWith(2, { fromBrewDate: '', name: undefined, toBrewDate: '' });
  });

  it('should call onEndReached with page and name', () => {
    const mounted = jest.fn();
    const wrapper = shallow(<Screen page={3} name="name" fromBrewDate="brewDate" toBrewDate="toBrew" onEndReached={mounted} />);
    wrapper.find('FlatList').prop('onEndReached')();
    expect(mounted).toBeCalledWith(3, { name: 'name', fromBrewDate: 'brewDate', toBrewDate: 'toBrew' });
  });

  it('should update state when header onpress', () => {
    const wrapper = shallow(<Screen />);
    wrapper.find('FilterHeader').prop('onFilterPressed')();
    expect(setState).toBeCalledWith(true);
  });

  it('should update state when filter cancel', () => {
    const wrapper = shallow(<Screen />);
    wrapper.find('FilterInput').prop('onFilterCancel')();
    expect(setState).toBeCalledWith(false);
  });

  it('should call applyFIlter and hide modal', () => {
    const apply = jest.fn();
    const wrapper = shallow(<Screen applyFilter={apply} />);
    wrapper.find('FilterInput').prop('onFilterSelected')({ name: 'name' });
    expect(apply).toBeCalledWith({ name: 'name' });
    expect(setState).toBeCalledWith(false);
  });

  it('key extractor should return id of item', () => {
    const apply = jest.fn();
    const wrapper = shallow(<Screen applyFilter={apply} />);
    expect(wrapper.find('FlatList').prop('keyExtractor')({ id: 1 })).toEqual('1');
  });
});
