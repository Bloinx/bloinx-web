import React from 'react';
import renderer from 'react-test-renderer';

import InputSwitch from '../index';

describe('InputSwitch', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <InputSwitch
        name="some-name"
        label="some-label"
        checked
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
