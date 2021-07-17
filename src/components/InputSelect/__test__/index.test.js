import React from 'react';
import renderer from 'react-test-renderer';

import InputSelect from '../index';

describe('InputOptionSelect', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <InputSelect
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
