import React from 'react';
import { IntlProvider } from 'react-intl';
import renderer from 'react-test-renderer';

import { ButtonNextStep } from '../index';

describe('ButtonNextStep', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <IntlProvider
        locale="en"
        onError={(err) => {
          if (err.code === 'MISSING_TRANSLATION') {
            return;
          }
          throw err;
        }}
      >
        <ButtonNextStep intl={{}} onBack={jest.fn()} onClick={jest.fn()} disabled />
      </IntlProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
