import { validateEmail } from '../format';

describe('validateEmail', () => {
  it('validateEmail return a true email', () => {
    const email = 'a@a.com';
    const actual = validateEmail(email);
    expect(actual).toEqual(true);
  });

  it('validateEmail return a false email', () => {
    const email = 'some-email';
    const actual = validateEmail(email);
    expect(actual).toEqual(false);
  });
});
