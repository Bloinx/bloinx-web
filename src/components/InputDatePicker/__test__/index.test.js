import React from 'react';
import renderer from 'react-test-renderer';

import InputDatePicker from '../index';

describe('InputDatePicker', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <InputDatePicker onChange={jest.fn()} label="some-label" name="some-name" value={new Date()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
