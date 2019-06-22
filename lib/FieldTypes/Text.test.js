const Text = require('./Text');
const {isString} = require('../utilities/validations');

describe('Text', () => {
  describe('#constructor()', () => {
    test('creates a new instance of Text', () => {
      const t = new Text('label');

      expect(t).toBeInstanceOf(Text);
    });
  });

  describe('#placeholder', () => {
    test('returns correct placeholder', () => {
      const t = new Text('label', {placeholder: 'heh'});

      expect(t.placeholder).toBe('heh');
    });
  });

  describe('#_schema', () => {
    test('returns correct schema', () => {
      expect(Text._schema).toStrictEqual({
        placeholder: {
          validator: isString,
          arguements: [],
          errorMessage: 'placeholder not a string',
        },
      });
    });
  });
});
