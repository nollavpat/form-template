const {RADIO_BUTTON, CHECKBOX, TEXT} = require('./utilities/constants');
const {sliceObject, isComponentsValid} = require('./utilities/');
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

  return new Selection(label, RADIO_BUTTON, {
    ...options,
    values,
    defaultValues: [0],
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

  return new Selection(label, CHECKBOX, {...options, values});
}

/**
 *
 * @param {String} title
 * @param {Object} options the additional options for the radio button field
 * @param {String} options.initComponents the init components in string
 * @return {FormTemplate} returns new Form Template
 */
function createFormTemplate(title, options = {}) {
  if (!title) {
    throw new Error('Invalid parameters');
  }

  let {initComponents} = options;

  if (initComponents) {
    try {
      const fieldKeys = ['label', 'inputType'];

      initComponents = JSON.parse(initComponents).map((component, index) => {
        const [{label, inputType}, options] = sliceObject(
            fieldKeys,
            component
        );
        let instanceComponent;

        switch (inputType) {
          case TEXT:
            instanceComponent = new Text(label, inputType, options);
            break;
          case RADIO_BUTTON:
          case CHECKBOX:
            instanceComponent = new Selection(label, inputType, options);
            break;
        }

        instanceComponent.setIndex(index);

        return instanceComponent;
      });

      if (!isComponentsValid(initComponents)) {
        throw new Error('Components are not valid');
      }
    } catch (error) {
      throw new Error(`Error occured: ${error}`);
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
