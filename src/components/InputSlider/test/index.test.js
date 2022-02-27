import React from 'react';
import renderer from 'react-test-renderer';

import InputSlider from '../index';

describe('InputSlider', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <InputSlider
        name="some-name"
        value={0}
        label="some-label"
        onChange={jest.fn()}
        min={0}
        max={10}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
