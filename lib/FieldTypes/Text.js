const {TEXT} = require('../utilities/constants');
const Field = require('../Field');

class Text extends Field {
  constructor(label, options = {}) {
    super(label, TEXT);
    const {placeholder} = options;

    this._placeholder = placeholder || '';
  }

  get placeholder() {
    return this._placeholder;
  }

  static get _schema() {
    return {
      placeholder: {type: 'string'},
    };
  }
}

module.exports = Text;
