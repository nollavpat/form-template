const {sliceObject, isComponentsValid} = require('./index');

describe('#sliceObject()', () => {
  test('returns an array of object', () => {
    const obj = {a: 1, b: 2, c: 3};
    const listOfKeys = ['a', 'b'];

    expect(sliceObject(listOfKeys, obj)).toBeInstanceOf(Array);
  });

  test('returns the filtered object based on the list of keys for 1st object', () => {
    const obj = {a: 1, b: 2, c: 3};
    const listOfKeys = ['a', 'b'];

    expect(sliceObject(listOfKeys, obj)[0]).toStrictEqual({a: 1, b: 2});
  });

  test('returns the object with remaining key based on the list of keys for 1st object', () => {
    const obj = {a: 1, b: 2, c: 3};
    const listOfKeys = ['a', 'b'];

    expect(sliceObject(listOfKeys, obj)[1]).toStrictEqual({c: 3});
  });

  test('throws an error for invalid parameters', () => {
    expect(() => {
      sliceObject(1, 1);
    }).toThrow();

    expect(() => {
      sliceObject([1, 2], 1);
    }).toThrow();

    expect(() => {
      sliceObject('asd', {});
    }).toThrow();
  });
});

describe('#isComponentsValid()', () => {
  test('returns true when all components are is valid', () => {
    const Component = {
      isValid: true,
    };

    expect(isComponentsValid([Component])).toBeTruthy();
  });

  test('returns false when one component is not valid', () => {
    const Component1 = {
      isValid: true,
    };
    const Component2 = {
      isValid: false,
    };

    expect(isComponentsValid([Component1, Component2])).toBeFalsy();
  });

  test('returns false when one component is not a component', () => {
    const Component1 = {
      isValid: true,
    };
    const Component2 = {};

    expect(isComponentsValid([Component1, Component2])).toBeFalsy();
  });
});
