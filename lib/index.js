const {RADIO_BUTTON, CHECKBOX} = require('./utilities/constants');
const {Text, Selection} = require('./FieldTypes');
const FormTemplate = require('./FormTemplate');

function createTextField(label, options = {}) {
  return new Text(label, options);
}

function createRadioButton(label, values, options = {}) {
  return new Selection(label, RADIO_BUTTON, values, {
    defaultValues: [0],
    ...options,
  });
}

function createCheckbox(label, values, options = {}) {
  return new Selection(label, CHECKBOX, values, options);
}

function createFormTemplate(title, options = {}) {
  return new FormTemplate(title, options);
}

module.exports = {
  createTextField,
  createRadioButton,
  createCheckbox,
  createFormTemplate,
};
