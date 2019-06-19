const {
  createTextField,
  createRadioButton,
  createCheckbox,
} = require('./index');
const {Text, Selection} = require('../lib/FieldTypes');

jest.mock('../lib/FieldTypes/');

describe('factoryFunctions', () => {
  describe('#createTextField()', () => {
    beforeEach(() => {
      Selection.mockReset();
    });

    test('throws an error for an invalid paramter', () => {
      expect(() => {
        createTextField(null);
      }).toThrow();
    });

    test('return a Text instance', () => {
      expect(createTextField('joms')).toBeInstanceOf(Text);
    });

    test('returns correct value of instance', () => {
      Text.mockImplementation(() => ({
        label: 'dog',
      }));
      expect(createTextField('dog')).toStrictEqual({label: 'dog'});
    });
  });

  describe('#createRadioButton()', () => {
    beforeEach(() => {
      Selection.mockReset();
    });

    test('throws an error for an invalid paramter', () => {
      expect(() => {
        createRadioButton(null);
      }).toThrow();
    });

    test('return a Selection instance', () => {
      expect(createRadioButton('joms', [])).toBeInstanceOf(Selection);
    });

    test('returns correct value of instance', () => {
      Selection.mockImplementation(() => ({
        label: 'dog',
      }));
      expect(createRadioButton('dog', [])).toStrictEqual({label: 'dog'});
    });
  });

  describe('#createCheckbox()', () => {
    beforeEach(() => {
      Selection.mockReset();
    });

    test('throws an error for an invalid paramter', () => {
      expect(() => {
        createCheckbox(null);
      }).toThrow();
    });

    test('return a Selection instance', () => {
      expect(createCheckbox('joms', [])).toBeInstanceOf(Selection);
    });

    test('returns correct value of instance', () => {
      Selection.mockImplementation(() => ({
        label: 'dog',
      }));
      expect(createCheckbox('dog', [])).toStrictEqual({label: 'dog'});
    });
  });
});
