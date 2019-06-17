const Field = require('../Field');

class Selection extends Field {
  constructor(label, inputType, values, options = {}) {
    super(label, inputType);
    const {defaultValues} = options;
    this._defaultValues = defaultValues
      ? defaultValues.map((value) => String(value))
      : [];
    this._values = values;
  }

  static get _schema() {
    return {
      values: {type: 'array'},
      defaultValues: {type: 'array', default: []},
    };
  }

  get values() {
    return this._values;
  }

  get defaultValues() {
    return this._defaultValues;
  }
}

module.exports = Selection;
