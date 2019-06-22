const Field = require('../Field');
const {isArrayWithType} = require('../utilities/validations');

class Selection extends Field {
  /**
   * Create a new field with input type [RADIO, CHECKBOX]
   * @param {String} label the label of the field
   * @param {String} inputType the input type of the field
   * @param {Object} options the additional options for the field
   * @param {Array.<String>} options.defaultValues the default answer of the field
   * @param {Array.<String>} options.values the possible answers of the field
   */
  constructor(label, inputType, options = {}) {
    super(label, inputType);
    const {defaultValues, values} = options;
    this._defaultValues = defaultValues || [];
    this._values = values || [];
  }

  /**
   * the validation schema of inputText: TEXT
   * @return {Object}
   */
  static get _schema() {
    return {
      values: {
        validator: isArrayWithType,
        arguements: ['string'],
        errorMessage: 'values not an array of string',
      },
    };
  }

  /**
   * values the possible answers of the field
   * @return {Array.<String>}
   */
  get values() {
    return this._values;
  }

  /**
   * defaultValues the default answer of the field
   * @return {Array.<String>}
   */
  get defaultValues() {
    return this._defaultValues;
  }
}

module.exports = Selection;
