import React from 'react';
import renderer from 'react-test-renderer';

import Aside from '../Aside';

describe('Aside', () => {
  it('renders correctly', () => {
    const Foo = () => <div />;
    const tree = renderer.create(
      <Aside><Foo /></Aside>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
