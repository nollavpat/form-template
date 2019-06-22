const Selection = require('./Selection');
const {isArrayWithType} = require('../utilities/validations');

describe('Selection', () => {
  describe('#constructor()', () => {
    test('creates a new instance of Selection', () => {
      const t = new Selection('label');

      expect(t).toBeInstanceOf(Selection);
    });
  });

  describe('#values', () => {
    test('returns correct values', () => {
      const t = new Selection('label', 'RADIO', {values: [1, 2]});

      expect(t.values).toStrictEqual([1, 2]);
    });
  });

  describe('#defaultValues', () => {
    test('returns correct default values', () => {
      const t = new Selection('label', 'RADIO', {defaultValues: [1, 2]});

      expect(t.defaultValues).toStrictEqual([1, 2]);
    });
  });

  describe('#_schema', () => {
    test('returns correct schema', () => {
      expect(Selection._schema).toStrictEqual({
        values: {
          validator: isArrayWithType,
          arguements: ['string'],
          errorMessage: 'values not an array of string',
        },
      });
    });
  });
});
