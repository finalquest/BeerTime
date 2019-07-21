import React from 'react';
// import { mount } from 'enzyme';
import { shallow } from 'enzyme';

import App from '../src/App';

describe('smoke test for doit', () => {
  it('renders correctly', () => {
    // mount(<App />);
    shallow(<App />);
  });
});
