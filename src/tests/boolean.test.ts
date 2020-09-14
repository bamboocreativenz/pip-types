import * as z from 'zod'
import {
  canOnlyBeBoolean,
  canOnlyBeBooleanArray,
  coerceBoolean,
  isBooleanFalseString,
  isBooleanNumber,
  isBooleanTrueString,
  zToBoolean,
  zToBooleanArray,
} from '../boolean'

/**
 * Checks
 */
test.each(['true', 'x', '[x]', 'y', 'yes', '1'])('isBooleanTrueString returns true for %s', input => {
  expect(isBooleanTrueString(input)).toBeTruthy()
})

test.each(['yes,it,does', 'y yes i think so, certainly', 'x marks the spot', '2'])(
  'isBooleanTrueString returns false for %s',
  input => {
    expect(isBooleanTrueString(input)).toBeFalsy()
  }
)

test.each(['false', ' ', '[ ]', 'n', 'no', '0'])('isBooleanFalseString returns true for %s', input => {
  expect(isBooleanFalseString(input)).toBeTruthy()
})

test.each(['no,it,does not', 'no i do not think so, mate', 'false pretenses', '100'])(
  'isBooleanFalseString returns false for %s',
  input => {
    expect(isBooleanFalseString(input)).toBeFalsy()
  }
)

test('isBooleanNumber returns true & false as expected', () => {
  expect(isBooleanNumber(1)).toBe(true)
  expect(isBooleanNumber(0)).toBe(true)
  expect(isBooleanNumber(-1)).toBe(false)
  expect(isBooleanNumber(3)).toBe(false)
  expect(isBooleanNumber(0.01)).toBe(false)
  expect(isBooleanNumber(100)).toBe(false)
})

test.each(['true', 'x', '[x]', 'y', 'yes', '1', 1, 'false', ' ', '[ ]', 'n', 'no', '0', 0])(
  'canOnlyBeBoolean checks if %s can be coerced to a boolean',
  input => {
    expect(canOnlyBeBoolean(input)).toBeTruthy()
  }
)

test.each(['hello', 'd', '[d]', 'sup', 10])('canOnlyBeBoolean returns false when passed %s', input => {
  expect(canOnlyBeBoolean(input)).toBeFalsy()
})

test.each([true, [true], ['true'], '[true]', '["true"]', 1, [1], '[x]', 'yes'])(
  'canOnlyBeBooleanArray checks if %s can be coerced to a BooleanArray',
  input => {
    expect(canOnlyBeBooleanArray(input)).toBeTruthy()
  }
)

/**
 * Coercions
 */
test.each([1, '1', true, 'x', '[x]', 'y', 'yes'])('Transformer: zToBoolean parses %d to true as expected', input => {
  expect(zToBoolean.parse(input)).toBeTruthy()
})

test.each([0, '0', false, ' ', '[ ]', 'n', 'no'])('Transformer: zToBoolean parses %d to false as expected', input => {
  expect(zToBoolean.parse(input)).toBeFalsy()
})

test.each([5, ['hello', 'Mr', 'Wolf'], { id: 1234, name: 'Lewis, Mr Lewis' }])(
  "Transformer: zToBoolean returns an error as it can't coerce %d",
  input => {
    try {
      expect(zToBoolean.parse(input))
    } catch (err) {
      expect(err.errors[0].message).toBe('Cannot coerce value to Boolean.')
    }
  }
)

test.each([
  true,
  [true],
  [true, false],
  'true',
  'true,false,true',
  ['true'],
  ['true', 'false'],
  '[true]',
  '[true,false]',
  '["true"]',
  '["true","false"]',
  1,
  [1],
  [1, 0, 1],
  '[x]',
  '[x, ,x]',
  'yes,no,yes',
])('Transformer: zToBooleanArray parses acceptable %s to a Boolean[].', input => {
  const uut = zToBooleanArray.parse(input)
  expect(z.array(z.boolean()).check(uut)).toBeTruthy()
})

/**
 * Transforms
 */
test('Coerce: coerceBoolean returns true as expected', () => {
  expect(coerceBoolean('true')).toBe(true)
  expect(coerceBoolean('x')).toBe(true)
  expect(coerceBoolean('[x]')).toBe(true)
  expect(coerceBoolean('y')).toBe(true)
  expect(coerceBoolean('yes')).toBe(true)
  expect(coerceBoolean('1')).toBe(true)
  expect(coerceBoolean(1)).toBe(true)
})

test('Coerce: coerceBoolean returns false as expected', () => {
  expect(coerceBoolean('false')).toBe(false)
  expect(coerceBoolean(' ')).toBe(false)
  expect(coerceBoolean('[ ]')).toBe(false)
  expect(coerceBoolean('n')).toBe(false)
  expect(coerceBoolean('no')).toBe(false)
  expect(coerceBoolean('0')).toBe(false)
  expect(coerceBoolean(0)).toBe(false)
})
