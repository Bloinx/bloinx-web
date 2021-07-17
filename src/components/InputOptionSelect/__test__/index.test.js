import React from 'react';
import renderer from 'react-test-renderer';

import InputOptionSelect from '../index';

describe('InputOptionSelect', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <InputOptionSelect
        name="some-name"
        value="1"
        label="some-label"
        options={[]}
        onChange={jest.fn()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
