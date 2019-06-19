const {
  createTextField,
  createRadioButton,
  createCheckbox,
  createFormTemplate,
} = require('./index');
const {Text, Selection} = require('../lib/FieldTypes');
const FormTemplate = require('./FormTemplate');
const {sliceObject, isComponentsValid} = require('./utilities');

jest.mock('../lib/FieldTypes/');
jest.mock('./FormTemplate');
jest.mock('./utilities');

describe('factoryFunctions', () => {
  describe('#createTextField()', () => {
    beforeEach(() => {
      Text.mockReset();
    });

    test('throws an error for an invalid paramter', () => {
      expect(() => {
        createTextField(null);
      }).toThrowError('Invalid parameters');
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
      }).toThrowError('Invalid parameters');
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
      }).toThrowError('Invalid parameters');
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

  describe('#createFormTemplate()', () => {
    beforeEach(() => {
      FormTemplate.mockReset();
      Text.mockReset();
      isComponentsValid.mockReset();
      sliceObject.mockReset();
    });

    test('throws an error for an invalid paramter', () => {
      expect(() => {
        createFormTemplate(null);
      }).toThrowError('Invalid parameters');
    });

    test('return a FormTemplate instance', () => {
      expect(createFormTemplate('joms')).toBeInstanceOf(FormTemplate);
    });

    test('return a FormTemplate instance with init components', () => {
      const components = [{label: 'asd', inputType: 'TEXT'}];
      isComponentsValid.mockImplementation(() => true);
      sliceObject.mockImplementation(() => [
        {label: 'as', inputType: 'TEXT'},
        {},
      ]);
      FormTemplate.mockImplementation(() => ({
        getComponents: () => ({raw: {label: 'as', inputType: 'TEXT'}}),
      }));
      const t = createFormTemplate('joms', {
        initComponents: JSON.stringify(components),
      });

      expect(t.getComponents().raw).toStrictEqual({
        label: 'as',
        inputType: 'TEXT',
      });
    });

    test('throws an syntax error when structure of init components is wrong', () => {
      expect(() => {
        createFormTemplate('joms', {initComponents: 'adsa'});
      }).toThrowError(/SyntaxError/);
    });

    test('throws an error when components are not valid', () => {
      const components = [{label: 'asd', inputType: 'TEXT'}];
      isComponentsValid.mockImplementation(() => false);
      sliceObject.mockImplementation(() => [
        {label: 'as', inputType: 'TEXT'},
        {},
      ]);

      expect(() => {
        createFormTemplate('joms', {
          initComponents: JSON.stringify(components),
        });
      }).toThrowError(/Components are not valid/);
    });
  });
});
