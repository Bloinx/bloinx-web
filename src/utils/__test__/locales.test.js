import flattenMessages from '../locales';

describe('flattenMessages', () => {
  it('should return a flatten object', () => {
    const translations = {
      a: {
        b: {
          c: 'text',
        },
      },
    };
    const actual = flattenMessages(translations);
    const expected = { 'a.b.c': 'text' };
    expect(actual).toEqual(expected);
  });

  it('should return a empty object', () => {
    const actual = flattenMessages(null);
    expect(actual).toEqual({});
  });
});
