const {TEXT} = require('../utilities/constants');
const {isString} = require('../utilities/validations');
const Field = require('../Field');

class Text extends Field {
  /**
   * Create a new field with input type TEXT
   * @param {String} label the label of the field
   * @param {Object} options the additional options for the field
   * @param {String} options.placeholder the placeholder for the field
   */
  constructor(label, options = {}) {
    super(label, TEXT);
    const {placeholder} = options;

    this._placeholder = placeholder || '';
  }

  /**
   * placeholder the placeholder of the field
   * @return {String}
   */
  get placeholder() {
    return this._placeholder;
  }

  /**
   * the validation schema of inputText: TEXT
   * @return {Object}
   */
  static get _schema() {
    return {
      placeholder: {
        validator: isString,
        arguements: [],
        errorMessage: 'placeholder not a string',
      },
    };
  }
}

module.exports = Text;
