class FormTemplate {
  constructor(title, options = {}) {
    const {initComponents} = options;

    this._components =
      initComponents && this.isComponentsValid(initComponents)
        ? this._getParseComponents(initComponents)
        : [];
    this.title = title;
  }

  _getParseComponents(components) {
    return JSON.parse(components);
  }

  isComponentsValid(components) {
    return components.every((component) => component.isValid);
  }

  addComponent(Field) {
    Field.setIndex(this._components.length); // make it the last index
    this._components = this._components.concat(Field);
  }

  removeComponent(index) {
    this._components = this._components.filter(
        (component) => component.index !== index
    );
  }

  get _sortedComponents() {
    return this._components.sort((c1, c2) => {
      if (c1.index < c2.index) return -1;
      if (c1.index > c2.index) return 1;
      return 0;
    });
  }

  get isValid() {
    return this._sortedComponents.every((component) => component.isValid);
  }

  getComponents() {
    const {_sortedComponents, isValid} = this;

    return {
      isValid,
      raw: _sortedComponents.map((component) => component.raw),
      toString: () =>
        JSON.stringify(
            _sortedComponents.map((component) => component.toString())
        ),
      errors: _sortedComponents.map((component) => ({
        field: component.label,
        errors: component.validationErrors,
      })),
    };
  }
}

module.exports = FormTemplate;
