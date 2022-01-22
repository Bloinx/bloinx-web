import React from 'react';
import renderer from 'react-test-renderer';

import DashboardLayout from '../index';

describe('DashboardLayout', () => {
  it('renders correctly', () => {
    const Foo = () => <div />;
    const tree = renderer.create(
      <DashboardLayout><Foo /></DashboardLayout>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
