import {
  isStringArray,
  isStringArrayString,
  canOnlyBeString,
  jsonSchema,
  isBooleanTrueString,
  isBooleanFalseString,
  isBooleanNumber,
  canOnlyBeBoolean
} from '../typeChecks';

/**
 * Boolean
 */
test('isBooleanTrueString returns true as expected', () => {
  expect(isBooleanTrueString('true')).toBe(true)
  expect(isBooleanTrueString('x')).toBe(true)
  expect(isBooleanTrueString('[x]')).toBe(true)
  expect(isBooleanTrueString('y')).toBe(true)
  expect(isBooleanTrueString('yes')).toBe(true)
  expect(isBooleanTrueString('1')).toBe(true)
})

test('isBooleanFalseString returns true as expected', () => {
  expect(isBooleanFalseString('false')).toBe(true)
  expect(isBooleanFalseString(' ')).toBe(true)
  expect(isBooleanFalseString('[ ]')).toBe(true)
  expect(isBooleanFalseString('n')).toBe(true)
  expect(isBooleanFalseString('no')).toBe(true)
  expect(isBooleanFalseString('0')).toBe(true)
})

test('isBooleanNumber returns true & false as expected', () => {
  expect(isBooleanNumber(1)).toBe(true)
  expect(isBooleanNumber(0)).toBe(true)
  expect(isBooleanNumber(-1)).toBe(false)
  expect(isBooleanNumber(3)).toBe(false)
  expect(isBooleanNumber(0.01)).toBe(false)
  expect(isBooleanNumber(100)).toBe(false)
})

test('canOnlyBeBoolean returns true as expected', () => {
  expect(canOnlyBeBoolean('true')).toBe(true)
  expect(canOnlyBeBoolean('x')).toBe(true)
  expect(canOnlyBeBoolean('[x]')).toBe(true)
  expect(canOnlyBeBoolean('y')).toBe(true)
  expect(canOnlyBeBoolean('yes')).toBe(true)
  expect(canOnlyBeBoolean('1')).toBe(true)
  expect(canOnlyBeBoolean(1)).toBe(true)
  expect(canOnlyBeBoolean('false')).toBe(true)
  expect(canOnlyBeBoolean(' ')).toBe(true)
  expect(canOnlyBeBoolean('[ ]')).toBe(true)
  expect(canOnlyBeBoolean('n')).toBe(true)
  expect(canOnlyBeBoolean('no')).toBe(true)
  expect(canOnlyBeBoolean('0')).toBe(true)
  expect(canOnlyBeBoolean(0)).toBe(true)
})

test('canOnlyBeBoolean returns false as expected', () => {
  expect(canOnlyBeBoolean('hello')).toBe(false)
  expect(canOnlyBeBoolean('d')).toBe(false)
  expect(canOnlyBeBoolean('[d]')).toBe(false)
  expect(canOnlyBeBoolean('l')).toBe(false)
  expect(canOnlyBeBoolean('sup')).toBe(false)
  expect(canOnlyBeBoolean(10)).toBe(false)
})

/**
 * String
 */

test('canOnlyBeString returns true as expected', () => {
  expect(canOnlyBeString('true')).toBe(false)
  expect(canOnlyBeString('x')).toBe(false)
  expect(canOnlyBeString('[x]')).toBe(false)
  expect(canOnlyBeString('y')).toBe(false)
  expect(canOnlyBeString('yes')).toBe(false)
  expect(canOnlyBeString('1')).toBe(false)
  expect(canOnlyBeString(1)).toBe(false)
  expect(canOnlyBeString('false')).toBe(false)
  expect(canOnlyBeString(' ')).toBe(false)
  expect(canOnlyBeString('[ ]')).toBe(false)
  expect(canOnlyBeString('n')).toBe(false)
  expect(canOnlyBeString('no')).toBe(false)
  expect(canOnlyBeString('0')).toBe(false)
})

test('isStringArray returns true as expected', () => {
  expect(isStringArray(["yes", "it", "is"])).toBe(true)
})

test('isStringArray returns false as expected', () => {
  expect(isStringArray([1, 2, 3])).toBe(false)
  expect(isStringArray([true, false])).toBe(false)
  expect(isStringArray([{ a: 1 },{b: 2},{c: 3}])).toBe(false)
  expect(isStringArray([1, true, {a: 1}, 'b'])).toBe(false)
})

test('canOnlyBeString return false as expected', () => {
  expect(canOnlyBeString('0')).toBe(false)
  expect(canOnlyBeString('1')).toBe(false)
  expect(canOnlyBeString('1.1')).toBe(false)
  expect(canOnlyBeString('[1,2]')).toBe(false)
  expect(canOnlyBeString('true')).toBe(false)
  expect(canOnlyBeString('false')).toBe(false)
  expect(canOnlyBeString('[true,false]')).toBe(false)
  expect(canOnlyBeString('{a: "b"}')).toBe(false)
  expect(canOnlyBeString('{"a": "b"}')).toBe(false)
  expect(canOnlyBeString('["yes"]')).toBe(false)
})

test('isStringArrayString returns true for comma-seperated strings string', () => {
  expect(isStringArrayString("yes,it,is")).toBe(true)
  expect(isStringArrayString("yes , it, is ")).toBe(true)
  expect(isStringArrayString("yes,it is a fact,is")).toBe(true)
  expect(isStringArrayString("yes,an escaped\, comma, works")).toBe(true)
})

test('isStringArrayString handles double quoted values as expected', () => {
  expect(isStringArrayString('use, "double, ""quoted"" value", for commas')).toBe(true)
  expect(isStringArrayString('quate wrapped, "comma, value"')).toBe(true)
  expect(isStringArrayString('a,"  space wrapped  ", value')).toBe(true)
  expect(isStringArrayString(`embedded, "line breaks
  are", are quoted`)).toBe(true)
})

test('isStringArrayString returns true for comma-seperated string with numbers', () => {
  expect(isStringArrayString("this is,1 sentance, with a number")).toBe(true)
  expect(isStringArrayString("and, here is another 1, to check")).toBe(true)
})

test('isStringArrayString returns false for comma-seperated numbers string', () => {
  expect(isStringArrayString("0,0,0")).toBe(false)
  expect(isStringArrayString("1,2,3")).toBe(false)
  expect(isStringArrayString("1 , 2, 3 ")).toBe(false)
  expect(isStringArrayString("1,2 3,4")).toBe(false)
  expect(isStringArrayString("1,2\, 3, 4")).toBe(false)
  expect(isStringArrayString("0.1,1.1,0.9")).toBe(false)
  expect(isStringArrayString("00,100,0.9")).toBe(false)
})

test('isStringArrayString returns false for comma-seperated boolean string', () => {
  expect(isStringArrayString("true,false,true")).toBe(false)
  expect(isStringArrayString("true , false, true ")).toBe(false)
  expect(isStringArrayString("true,false true,true")).toBe(false)
  expect(isStringArrayString("true,false\, true, false")).toBe(false)
})

test('isStringArrayString returns false for comma-seperated object string', () => {
  expect(isStringArrayString("{a: 1},{b: 2},{a: 1}")).toBe(false)
  expect(isStringArrayString("{a: 1} , {b: 2}, {a: 1} ")).toBe(false)
  expect(isStringArrayString("{a: 1},{b: 2} {a: 1},{a: 1}")).toBe(false)
  expect(isStringArrayString("{a: 1},{b: 2}\, {a: 1}, {b: 2}")).toBe(false)
})

test('isStringArrayString returns false for mixed value comma-seperated string', () => {
  expect(isStringArrayString("yes,1,true,{a:1}")).toBe(false)
  expect(isStringArrayString("yes , 1, true, {a: 1}")).toBe(false)
  expect(isStringArrayString("yes, 1 2, true, {a: 1}")).toBe(false)
  expect(isStringArrayString("yes, 1 2\, 3, true, {a: 1}")).toBe(false)
})

/**
 * Number
 */



test.only('Type Check: jsonSchema parses json as expected', () => {
  const validJSON = JSON.stringify({ a: '1'})
  expect(jsonSchema.parse(validJSON)).toBe(validJSON)
})

test.only('Type Check: jsonSchema parses JS objects to valid JSON', () => {
  const uut = jsonSchema.parse({ id: 1234, name: 'Lewis, Mr Lewis' })
  expect(uut).toStrictEqual({ "id": 1234, "name": "Lewis, Mr Lewis"})
  expect(JSON.parse(JSON.stringify(uut))).toStrictEqual({ id: 1234, name: 'Lewis, Mr Lewis' })
})