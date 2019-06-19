const {RADIO_BUTTON, CHECKBOX} = require('./utilities/constants');
const {Text, Selection} = require('./FieldTypes');
const FormTemplate = require('./FormTemplate');

/**
 *
 * @param {String} label the label of the text field
 * @param {Object} options the additional options for the text field
 * @param {String} options.placeholder the placeholder for the text field
 * @return {Text} returns new Text instance
 */
function createTextField(label, options = {}) {
  if (!label) {
    throw new Error('Invalid parameters');
  }

  return new Text(label, options);
}

/**
 *
 * @param {String} label the label of the radio button field
 * @param {Array.<String>} values the options for the user
 * @param {Object} options the additional options for the radio button field
 * @param {Array.<String>} options.defaultValues the selected option on init
 * @return {Selection} returns new Selection instance with input type radio button
 */
function createRadioButton(label, values, options = {}) {
  if (!label || (!values || !Array.isArray(values))) {
    throw new Error('Invalid parameters');
  }

  return new Selection(label, RADIO_BUTTON, values, {
    defaultValues: [0],
    ...options,
  });
}

/**
 *
 * @param {String} label the label of the checkbox field
 * @param {Array.<String>} values the options for the user
 * @param {Object} options the additional options for the checkbox field
 * @param {Array.<String>} options.defaultValues the selected option on init
 * @return {Selection} returns new Selection instance with input type checkbox
 */
function createCheckbox(label, values, options = {}) {
  if (!label || (!values || !Array.isArray(values))) {
    throw new Error('Invalid parameters');
  }

  return new Selection(label, CHECKBOX, values, options);
}

/**
 *
 * @param {String} title
 * @param {Object} options the additional options for the radio button field
 * @param {String} options.initComponents the init components in string
 * @return {FormTemplate} returns new Form Template
 */
function createFormTemplate(title, options = {}) {
  let {initComponents} = options;

  if (initComponents) {
    try {
      initComponents = JSON.parse(initComponents);
      initComponents = initComponents.map((components) => {});
    } catch (error) {
      throw new Error('Initialize components are not valid.');
    }
  } else {
    initComponents = [];
  }

  return new FormTemplate(title, {initComponents});
}

module.exports = {
  createTextField,
  createRadioButton,
  createCheckbox,
  createFormTemplate,
};
