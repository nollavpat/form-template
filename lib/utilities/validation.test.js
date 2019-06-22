const {
  isString,
  isArray,
  isArrayWithType,
  isArrayWithRegex,
  isArrayAndNotEmpty,
} = require('./validations');

describe('#isString', () => {
  test('returns true if args passed is type string', () => {
    expect(isString('string')).toBeTruthy();
  });

  test('returns false if args passed is not type string', () => {
    expect(isString(1)).toBeFalsy();
    expect(isString(null)).toBeFalsy();
    expect(isString([])).toBeFalsy();
    expect(isString({})).toBeFalsy();
    expect(isString(true)).toBeFalsy();
    expect(isString(false)).toBeFalsy();
  });
});

describe('#isArray', () => {
  test('returns true if args passed is an instance of an array', () => {
    expect(isArray([])).toBeTruthy();
  });

  test('returns false if args passed is an instance of an array', () => {
    expect(isArray(null)).toBeFalsy();
    expect(isArray('string')).toBeFalsy();
    expect(isArray(1)).toBeFalsy();
    expect(isArray({})).toBeFalsy();
    expect(isArray(true)).toBeFalsy();
    expect(isArray(false)).toBeFalsy();
  });
});

describe('#isArrayAndNotEmpty', () => {
  test('returns true if args passed is an instance of an array and not empty', () => {
    expect(isArrayAndNotEmpty([1])).toBeTruthy();
  });

  test('returns false if args passed is an instance of an array', () => {
    expect(isArray(null)).toBeFalsy();
    expect(isArray('string')).toBeFalsy();
    expect(isArray(1)).toBeFalsy();
    expect(isArray({})).toBeFalsy();
    expect(isArray(true)).toBeFalsy();
    expect(isArray(false)).toBeFalsy();
    expect(isArrayAndNotEmpty([])).toBeFalsy();
  });
});

describe('#isArray', () => {
  test('returns true if args passed is an instance of an array', () => {
    expect(isArray([])).toBeTruthy();
  });

  test('returns false if args passed is an instance of an array', () => {
    expect(isArray(null)).toBeFalsy();
    expect(isArray('string')).toBeFalsy();
    expect(isArray(1)).toBeFalsy();
    expect(isArray({})).toBeFalsy();
    expect(isArray(true)).toBeFalsy();
    expect(isArray(false)).toBeFalsy();
  });
});

describe('#isArrayWithType', () => {
  test('returns true if args passed is an instance of an array and items has correct type', () => {
    expect(isArrayWithType([1, 2, 3], 'number')).toBeTruthy();
  });

  test('returns true for a empty array', () => {
    expect(isArrayWithType([], 'string')).toBeTruthy();
  });

  test('returns false if args passed is an instance of an array and items has incorrect type', () => {
    expect(isArrayWithType([1, 2, 3], 'string')).toBeFalsy();
    expect(isArrayWithType(['a', 'b', 'c'], 'number')).toBeFalsy();
  });
});

describe('#isArrayWithRegex', () => {
  test('returns true if args passed is an instance of an array and succeed the regex', () => {
    expect(isArrayWithRegex(['a', 'a'], /a/)).toBeTruthy();
  });

  test('returns true for a empty array', () => {
    expect(isArrayWithRegex([], /a/)).toBeTruthy();
  });

  test('returns false if args passed is an instance of an array and fails the regex', () => {
    expect(isArrayWithRegex(['a', 'a'], /b/)).toBeFalsy();
    expect(isArrayWithRegex([1, 2], /b/)).toBeFalsy();
  });
});
