import React from 'react';
import renderer from 'react-test-renderer';

import InputAmount from '../index';

describe('InputAmount', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<InputAmount name="some-value" value={10} label="some-label" onChange={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
