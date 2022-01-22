import React from 'react';
import renderer from 'react-test-renderer';

import Stepper from '../index';

describe('Stepper', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Stepper steps={[]} current={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
