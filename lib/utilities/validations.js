/**
 * isString test if string it type string
 * @param {String} string the string to be tested
 * @return {Boolean}
 */
function isString(string) {
  const type = typeof string;

  return type === 'string';
}

/**
 * isArray test if array is an instance of an array
 * @param {Array} array the array to be tested
 * @return {Boolean}
 */
function isArray(array) {
  return Array.isArray(array);
}

/**
 * isArrayAndNotEmpty test if array is an instance of an array and not empty
 * @param {Array} array the array to be tested
 * @return {Boolean}
 */
function isArrayAndNotEmpty(array) {
  return isArray(array) && array.length !== 0;
}

/**
 * isArrayWithType test if array is an instance of an array with item's type
 * @param {Array} array the array to be tested
 * @param {String} type the type of each item
 * @return {Boolean}
 */
function isArrayWithType(array, type) {
  return isArray(array) && array.every((item) => typeof item === type);
}

/**
 * isArrayWithRegex test if array is an instance of an array with item's regex
 * @param {Array} array the array to be tested
 * @param {RegExp} regex the rege of each item
 * @return {Boolean}
 */
function isArrayWithRegex(array, regex) {
  return (
    isArrayWithType(array, 'string') && array.every((item) => regex.test(item))
  );
}

module.exports = {
  isString,
  isArray,
  isArrayAndNotEmpty,
  isArrayWithType,
  isArrayWithRegex,
};
