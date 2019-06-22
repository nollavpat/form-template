class FormTemplate {
  /**
   * FormTemplate is used to store form components
   * @param {String} title the title of the form
   * @param {Object} options extra options for the form
   * @param {Array.Field} options.initComponents an array of fields [Text, Checkbox, RadioButton]
   */
  constructor(title, options = {}) {
    const {initComponents} = options;

    this._components = initComponents || [];
    this._title = title;
  }

  /**
   * title returns the title of the form
   * @return {String}
   */
  get title() {
    return this._title;
  }

  // TODO: throw when same label
  /**
   * addComponent adds a new component to the form template
   * @param {Field} Field the new field
   */
  addComponent(Field) {
    const {label} = Field;
    if (this._components.find((component) => component.label === label)) {
      throw new Error('Label for the field already exists.');
    }
    Field.setIndex(this._components.length); // make it the last index
    this._components = this._components.concat(Field);
  }

  /**
   * removeCompenent removes one component with the given index
   * @param {Number} index the index of the component to be removed
   */
  removeComponent(index) {
    this._components = this._components.filter(
        (component) => component.index !== index
    );
  }

  /**
   * dropComponents drops all components in the form template
   */
  dropComponents() {
    this._components = [];
  }

  /**
   * getComponent returns the instance of the component with given index
   * @param {Number} index the index of the component to be removed
   * @return {Field} the found component
   */
  getComponent(index) {
    const componentFound = this._components.find(
        (component) => component.index === index
    );

    return componentFound || null;
  }

  /**
   * _sortedComponents returns the components of the forms sorted by their indexes
   * @return {Array.Field}
   */
  get _sortedComponents() {
    return this._components.sort((c1, c2) => {
      if (c1.index < c2.index) return -1;
      if (c1.index > c2.index) return 1;
      return 0;
    });
  }

  /**
   * isValid returns true when all Fields are true
   * @return {Boolean}
   */
  get isValid() {
    return this._sortedComponents.every((component) => component.isValid);
  }

  /**
   * @typedef {Object} ComponentOptions
   * @property {Boolean} isValid if all components are valid
   * @property {Array.<Object>} raw array of objects, object properties varry to inputType of the component
   * @property {Function} toString JSON.stringify of raw
   * @property {Array.<Object>} errors array of errors containing the field name and error message
   */
  /**
   * getComponents the options when getting the components
   * @return {ComponentOptions}
   */
  getComponents() {
    const {_sortedComponents, isValid} = this;

    return {
      isValid,
      raw: _sortedComponents.map((component) => component.raw),
      toString: () =>
        JSON.stringify(_sortedComponents.map((component) => component.raw)),
      errors: _sortedComponents.map((component) => ({
        field: component.label,
        errors: component.validationErrors,
      })),
    };
  }
}

module.exports = FormTemplate;
