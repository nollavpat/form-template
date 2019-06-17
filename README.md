# form-template

A module that template forms.

## Installation

```bash
npm i -S @nollavpat/form-template
```

## Usage

```node
const {
  createTextField,
  createRadioButton,
  createCheckbox,
  createFormTemplate,
} = require('@nollavpat/form-template');

// create a template
const myTemplate = createFormTemplate('Application Form');

// create fields
const lastname = createTextField('Lastname', { placeholder: 'Enter Lastname' /* defaults to an empty string */});
const sex = createRadioButton('Sex', ['male', 'female'], { defaultValues: [0] /* defaults to [0]  */ })
const hobbies = createCheckbox('Hobbies', ['sleeping', 'eating', 'playing'], { defaultValues: [0, 1] /* default to an emptu array */ })

// add fields to a template
myTemplate.addComponent(lastname);
myTemplate.addComponent(sex);
myTemplate.addComponent(hobbies);

// remove a field
myTemplate.removeComponent(0); /* example on removing the lastname */

myTemplate.getComponents();
/*
* return an object
* {
*   isValid: Boolean,
*   raw: String,
*   toString: Function,
*   errors: []
* }
*/
```
