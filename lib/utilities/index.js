/**
 *
 * @param {Array.<String>} listOfKeys array of keys you want to separate from object
 * @param {Object} targetObject any object
 * @return {Array.<Object>} returns two object, one with the list of keys and the remaining keys of target object
 */
function sliceObject(listOfKeys, targetObject) {
  const filteredObject = {};
  const remainingObject = {};

  if (!Array.isArray(listOfKeys) || typeof targetObject !== 'object') {
    throw new Error('Invalid parameters');
  }

  Object.entries(targetObject).forEach(([key, value]) => {
    if (listOfKeys.includes(key)) {
      filteredObject[key] = value;
    } else {
      remainingObject[key] = value;
    }
  });

  return [filteredObject, remainingObject];
}

/**
 *
 * @param {Array.<Field>} components the form will consist of these
 * @return {Boolean} returns whether all components are valid
 */
function isComponentsValid(components) {
  return components.every((component) => {
    try {
      return component.isValid;
    } catch (_) {
      return false;
    }
  });
}

module.exports = {
  sliceObject,
  isComponentsValid,
};
