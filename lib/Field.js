class Field {
  constructor(label, inputType) {
    this._label = String(label); // forces to be string
    this._inputType = String(inputType);
  }

  get index() {
    return this._index;
  }

  setIndex(i) {
    this._index = i;
  }

  get label() {
    return this._label;
  }

  get inputType() {
    return this._inputType;
  }

  static get _schema() {
    return {};
  }

  get validationErrors() {
    return Object.entries(this.constructor._schema).reduce(
        (result, [key, value]) => {
          switch (value.type) {
            case 'string':
              return typeof this[key] === 'string'
              ? result
              : result.concat({key, message: `${key} must be a string`});
            case 'array':
              const condition =
              this[key] instanceof Array &&
              (this[key].every((element) => typeof element === 'string') ||
                JSON.stringify(this[key]) === JSON.stringify(value.default));

              return condition
              ? result
              : result.concat({
                key,
                message: `${key} must be an array of strings`,
              });
            default:
              return result.concat({key, message: 'unsupported type'});
          }
        },
        []
    );
  }

  get isValid() {
    return this.validationErrors.length === 0;
  }

  get raw() {
    const commonProps = ['label', 'inputType', 'index'];
    const uniqueProps = Object.keys(this.constructor._schema);
    const allProps = [...commonProps, ...uniqueProps];
    return allProps.reduce(
        (prev, curr) => ({...prev, [curr]: this[curr]}),
        {}
    );
  }

  toString() {
    return JSON.stringify(this.raw);
  }
}

module.exports = Field;
