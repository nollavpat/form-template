const Field = require('./Field');

describe('Field', () => {
  describe('#constructor', () => {
    test('creates a new Field', () => {
      const f = new Field('label', 'text');

      expect(f).toBeInstanceOf(Field);
    });
  });

  describe('#index', () => {
    test('returns the index of the field', () => {
      const f = new Field('label', 'text');
      f._index = 0;
      expect(f.index).toBe(0);
    });
  });

  describe('#setIndex()', () => {
    test('sets the index of the field', () => {
      const f = new Field('label', 'text');
      expect(f.index).toBeUndefined();
      f.setIndex(0);
      expect(f.index).toBe(0);
    });
  });

  describe('#label', () => {
    test('returns the label of the field', () => {
      const f = new Field('label', 'text');

      expect(f.label).toBe('label');
    });
  });

  describe('#inputType', () => {
    test('returns the input type of the field', () => {
      const f = new Field('label', 'text');

      expect(f.inputType).toBe('text');
    });
  });

  describe('#schema', () => {
    test('return an empty object', () => {
      expect(Field._schema).toStrictEqual({});
    });
  });

  describe('#validationErrors', () => {
    test('returns an array', () => {
      /* eslint-disable */
      class Xfield extends Field {
        constructor(name) {
          super('label', 'text');
          this.name = name;
        }

        static get _schema() {
          return {
            name: {
              validator: (x) => x === 'a',
              arguements: [],
              errorMessage: 'not valid',
            },
          };
        }
      }
      const x = new Xfield('a');

      expect(x.validationErrors).toHaveLength(0);
      expect(x.validationErrors).toStrictEqual([]);
    });

    test('returns an array of error object for a not valid proprty', () => {
      /* eslint-disable */
      class Xfield extends Field {
        constructor(name, age) {
          super('label', 'text');
          this.name = name;
          this.age = age;
        }

        static get _schema() {
          return {
            name: {
              validator: (x) => x === 'a',
              arguements: [],
              errorMessage: 'not valid',
            },
            age: {
              validator: (x) => x === '11',
              arguements: [],
              errorMessage: 'not valid',
            },
          };
        }
      }
      const x = new Xfield('b');
      const errorObject1 = {
        path: 'name',
        errorMessage: 'not valid',
      };
      const errorObject2 = {
        path: 'age',
        errorMessage: 'not valid',
      };

      expect(x.validationErrors).toHaveLength(2);
      expect(x.validationErrors).toStrictEqual([errorObject1, errorObject2]);
    });
  });

  describe('#isValid', () => {
    test('returns true if no validation error', () => {
      /* eslint-disable */
      class Xfield extends Field {
        constructor(name) {
          super('label', 'text');
          this.name = name;
        }

        static get _schema() {
          return {
            name: {
              validator: (x) => x === 'a',
              arguements: [],
              errorMessage: 'not valid',
            },
          };
        }
      }
      const x = new Xfield('a');

      expect(x.isValid).toBeTruthy();
    });

    test('returns false if there is a validation error', () => {
      /* eslint-disable */
      class Xfield extends Field {
        constructor(name, age) {
          super('label', 'text');
          this.name = name;
          this.age = age;
        }

        static get _schema() {
          return {
            name: {
              validator: (x) => x === 'a',
              arguements: [],
              errorMessage: 'not valid',
            },
            age: {
              validator: (x) => x === '11',
              arguements: [],
              errorMessage: 'not valid',
            },
          };
        }
      }
      const x = new Xfield('b', 12);

      expect(x.isValid).toBeFalsy();
    });
  });

  describe('#raw', () => {
    test('returns correct object', () => {
      /* eslint-disable */
      class Xfield extends Field {
        constructor(name) {
          super('label', 'text');
          this.name = name;
        }

        static get _schema() {
          return {
            name: {
              validator: (x) => x === 'a',
              arguements: [],
              errorMessage: 'not valid',
            },
          };
        }
      }
      const x = new Xfield('a');
      const { label, inputType, name } = x;

      expect(x.raw).toStrictEqual({ label, inputType, name });

      const f = new Field('name', 'text');

      expect(f.raw).toStrictEqual({ label: 'name', inputType: 'text' });
    });
  });
});
