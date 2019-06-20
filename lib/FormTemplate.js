class FormTemplate {
  /**
   *
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
   * @return {String} the title
   */
  get title() {
    return this._title;
  }

  // TODO: throw when same label
  /**
   *
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
   *
   * @param {Number} index the index of the component to be removed
   */
  removeComponent(index) {
    this._components = this._components.filter(
        (component) => component.index !== index
    );
  }

  /**
   *
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
   * @return {Array.Field} return the sorted components based on their indexes
   */
  get _sortedComponents() {
    return this._components.sort((c1, c2) => {
      if (c1.index < c2.index) return -1;
      if (c1.index > c2.index) return 1;
      return 0;
    });
  }

  /**
   * @return {Boolean} returns true when all Fields are true
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
   * @return {ComponentOptions} the options when getting the components
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
