import React from 'react';
import renderer from 'react-test-renderer';

import Content from '../Content';

describe('Content', () => {
  it('renders correctly', () => {
    const Foo = () => <div />;
    const tree = renderer.create(
      <Content><Foo /></Content>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
