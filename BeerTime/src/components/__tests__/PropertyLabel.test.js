import React from 'react';
import { shallow } from 'enzyme';
import PropertyLabel from '../PropertyLabel';

const localize = { value: v => v };
describe('PropertyLabel test suite', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<PropertyLabel name="test" value="v" />, localize);
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find('Label').at(0).prop('children')).toEqual('test');
  });
  it('supports separator', () => {
    const wrapper = shallow(<PropertyLabel name="test" value="v" separator=":" />, localize);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Label').at(0).prop('children')).toEqual('test:');
  });
  it('supports fontSize', () => {
    const wrapper = shallow(<PropertyLabel name="test" value="v" fontSize={9} />, localize);
    expect(wrapper.find('Label').at(0).prop('style')).toContainEqual({ fontSize: 9 });
  });
  it('supports nameStyles', () => {
    const style = { };
    const wrapper = shallow(
      <PropertyLabel name="test" value="v" nameStyles={style} />,
      localize,
    );
    expect(wrapper.find('Label').at(0).prop('style')).toContainEqual(style);
  });
  it('supports valueStyles', () => {
    const style = { };
    const wrapper = shallow(
      <PropertyLabel name="test" value="v" valueStyles={style} />,
      localize,
    );
    expect(wrapper.find('Label').at(1).prop('style')).toContainEqual(style);
  });
  it('supports custom component for value render', () => {
    const MyComponent = ({ children }) => children;
    const wrapper = shallow(
      <PropertyLabel name="test" value="v" Component={MyComponent} />,
      localize,
    );
    expect(wrapper.find('MyComponent').prop('children')).toEqual('v');
  });
  it('supports numberOfLines', () => {
    const wrapper = shallow(
      <PropertyLabel name="test" value="v" numberOfLines={12} />,
      localize,
    );
    expect(wrapper.find('Label').at(1).prop('numberOfLines')).toEqual(12);
  });

  it('supports ellipsizeMode', () => {
    const wrapper = shallow(
      <PropertyLabel name="test" value="v" ellipsizeMode="head" />,
      localize,
    );
    expect(wrapper.find('Label').at(1).prop('ellipsizeMode')).toEqual('head');
  });
});
