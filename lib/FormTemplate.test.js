const FormTemplate = require('./FormTemplate');

describe('FormTemplate', () => {
  describe('#constructor', () => {
    test('creates a new FormTemplate', () => {
      const ft = new FormTemplate('title');

      expect(ft).toBeInstanceOf(FormTemplate);
    });
  });

  describe('#addComponent()', () => {
    /* eslint-disable */
    class Field {
      constructor(label) {
        this.label = label;
      }

      setIndex(index) {
        this.index = index;
      }
    }

    test('adds new Field if no same label', () => {
      const ft = new FormTemplate('title');

      expect(ft._components.length).toEqual(0);
      ft.addComponent(new Field('a'));
      expect(ft._components.length).toEqual(1);
      ft.addComponent(new Field('b'));
      expect(ft._components.length).toEqual(2);
    });

    test('throws an error if label already exist', () => {
      const ft = new FormTemplate('title');

      expect(() => {
        ft.addComponent(new Field('a'));
        ft.addComponent(new Field('a'));
      }).toThrowError('Label for the field already exists.');
    });

    test('correctly adds the index of the new Field', () => {
      const ft = new FormTemplate('title');

      ft.addComponent(new Field('a'));
      expect(ft._components[0].index).toEqual(0);
      ft.addComponent(new Field('b'));
      expect(ft._components[1].index).toEqual(1);
    });
  });

  describe('#removeComponent()', () => {
    /* eslint-disable */
    class Field {
      constructor(label) {
        this.label = label;
      }

      setIndex(index) {
        this.index = index;
      }
    }

    test('successfully removes a component', () => {
      const f = new Field('a');
      f.setIndex(0);
      const ft = new FormTemplate('title', {
        initComponents: [f],
      });

      expect(ft._components.length).toEqual(1);
      ft.removeComponent(0);
      expect(ft._components.length).toEqual(0);
    });

    test('does not remove any component that did not match the given index', () => {
      const f = new Field('a');
      f.setIndex(0);
      const ft = new FormTemplate('title', {
        initComponents: [f],
      });

      expect(ft._components.length).toEqual(1);
      ft.removeComponent(-1);
      ft.removeComponent(2);
      ft.removeComponent(1);
      expect(ft._components.length).toEqual(1);
    });
  });

  describe('#getComponent()', () => {
    /* eslint-disable */
    class Field {
      constructor(label) {
        this.label = label;
      }

      setIndex(index) {
        this.index = index;
      }
    }

    test('successfully gets a component', () => {
      const f = new Field('a');
      f.setIndex(0);
      const ft = new FormTemplate('title', {
        initComponents: [f],
      });

      expect(ft.getComponent(0).index).toEqual(0);
    });

    test('returns null when no component found', () => {
      const f = new Field('a');
      f.setIndex(0);
      const ft = new FormTemplate('title', {
        initComponents: [f],
      });

      expect(ft.getComponent(-1)).toBeNull();
    });
  });

  describe('#_sortedComponents', () => {
    test('return the sorted components', () => {
      const f1 = { index: 1 };
      const f2 = { index: 0 };

      const ft = new FormTemplate('a', { initComponents: [f1, f2] });
      expect(ft._sortedComponents).toStrictEqual([f2, f1]);
    });

    test('return the sorted components', () => {
      const f1 = { index: 1 };
      const f2 = { index: 0 };
      const f3 = { index: -1 };
      const f4 = { index: 5 };

      const ft = new FormTemplate('a', { initComponents: [f1, f2, f3, f4] });
      expect(ft._sortedComponents).toStrictEqual([f3, f2, f1, f4]);
    });
  });

  describe('#isValid', () => {
    test('return false when one Field is not valid', () => {
      const f1 = { index: 1, isValid: false };
      const f2 = { index: 0, isValid: true };

      const ft = new FormTemplate('a', { initComponents: [f1, f2] });
      expect(ft.isValid).toBeFalsy();
    });

    test('return true when all Fields are valid', () => {
      const f1 = { index: 1, isValid: true };
      const f2 = { index: 0, isValid: true };

      const ft = new FormTemplate('a', { initComponents: [f1, f2] });
      expect(ft.isValid).toBeTruthy();
    });
  });

  describe('#getComponents()', () => {
    test('returns correct object', () => {
      const f1 = { index: 1, isValid: true, raw: 1 };
      const f2 = { index: 0, isValid: true, raw: 1 };

      const ft = new FormTemplate('a', { initComponents: [f1, f2] });
      const { raw, isValid, toString } = ft.getComponents();

      expect(raw).toStrictEqual([1, 1]);
      expect(isValid).toBeTruthy();
      expect(toString()).toEqual(JSON.stringify([1, 1]));
    });
  });

  describe('getters', () => {
    const ft = new FormTemplate('title');
    describe('#title', () => {
      test('returns correct title', () => {
        expect(ft.title).toEqual('title');
      });
    });
  });
});
