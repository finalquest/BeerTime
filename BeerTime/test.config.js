import Enzyme, { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';
import fetch from 'jest-fetch-mock';
import React from 'react';

const setHookState = newState => jest.fn();

const reactMock = require('react');

reactMock.useEffect = setHookState();

// React native config
jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  canOpenURL: jest.fn().mockReturnValue(true),
  getInitialURL: jest.fn().mockReturnValue(Promise.resolve()),
}));


jest.mock('NativeModules');

jest.mock('Image', () => {
  const RealComponent = jest.requireActual('Image');
  const React = require('React');
  class Image extends React.Component {
    render() {
      return React.createElement('Image', this.props, this.props.children);
    }
  }

  Image.propTypes = RealComponent.propTypes;
  Image.resizeMode = {
    contain: 'contain',
  };
  return Image;
});

jest.mock('TouchableOpacity', () => {
  const RealComponent = jest.requireActual('TouchableOpacity');
  const React = require('React');
  class TouchableOpacity extends React.Component {
    render() {
      return React.createElement('TouchableOpacity', this.props, this.props.children);
    }
  }

  TouchableOpacity.propTypes = RealComponent.propTypes;
  return TouchableOpacity;
});

// Whatwg-fetch mock
global.fetch = fetch;
global.navigator = {
  geolocation: {
    getCurrentPosition: () => Promise.resolve(),
  },
};

global.shallowRenderProp = (Element, params, config) => {
  const Parent = shallow(Element, config);
  const renderProp = Parent.prop('children');
  const ChildComponent = renderProp(params);

  const ChildElement = shallow(ChildComponent);
  return ChildElement;
};

global.shallowHOC = (Element, context) => {
  const wrapper = shallow(Element, { context });
  return wrapper.dive();
};

// Enyzme config
Enzyme.configure({ adapter: new Adapter() });

/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */
const originalConsoleError = console.error;
console.error = (message) => {
  if (message.startsWith('Warning:')) {
    return;
  }

  originalConsoleError(message);
};
