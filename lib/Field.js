class Field {
  /**
   * Field is the component added to the Form Template
   * @param {String} label the label of the field
   * @param {String} inputType the input type of the field
   */
  constructor(label, inputType) {
    this._label = String(label); // forces to be string
    this._inputType = String(inputType);
  }

  /**
   * index returns the index of the field inside the form
   * @return {Number}
   */
  get index() {
    return this._index;
  }

  /**
   * setIndex sets the index of the field inside the form
   * @param {Number} index the index of the field
   */
  setIndex(index) {
    this._index = index;
  }

  /**
   * label returns the label of the field
   * @return {String}
   */
  get label() {
    return this._label;
  }

  /**
   * inputType returns the input type of the field
   * @return {String}
   */
  get inputType() {
    return this._inputType;
  }

  /**
   * _schema will determine the schema of other properties extending the Field class
   * @typedef {Object} propertyValidator the basis for the validation
   * @property {Function} validator the function that will be called to know if property is valid
   * @property {Array} arguements the arguements of the validator
   * @property {String} errorMessage the messege when not valid
   *
   * @return {Object.<String, propertyValidator>} schema.proprty
   */
  static get _schema() {
    return {};
  }

  /**
   * @typedef {Object} errorObject
   * @property {String} path the name of the property
   * @property {String} errorMessage the error message
   *
   * validationErrors returns the validation error of each proprties
   * @return {Array.<errorObject>} the array of error message
   */
  get validationErrors() {
    return Object.entries(this.constructor._schema).reduce(
        (prevState, [path, propertyValidator]) => {
          const {validator, arguements, errorMessage} = propertyValidator;

          return validator(this[path], ...arguements)
          ? prevState
          : prevState.concat({path, errorMessage});
        },
        []
    );
  }

  /**
   * isValid returns true if no validation error
   * @return {Boolean}
   */
  get isValid() {
    return this.validationErrors.length === 0;
  }

  /**
   * raw returns the obejct with selected property
   * @return {Object}
   */
  get raw() {
    const commonProps = ['label', 'inputType'];
    const uniqueProps = Object.keys(this.constructor._schema);
    const allProps = [...commonProps, ...uniqueProps];
    return allProps.reduce(
        (prev, curr) => ({...prev, [curr]: this[curr]}),
        {}
    );
  }
}

module.exports = Field;
