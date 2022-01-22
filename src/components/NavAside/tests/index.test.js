import React from 'react';
import renderer from 'react-test-renderer';

import NavAside from '../index';

describe('NavAside', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NavAside />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
