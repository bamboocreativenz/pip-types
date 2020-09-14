"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const z = __importStar(require("zod"));
const boolean_1 = require("../boolean");
/**
 * Checks
 */
test.each(['true', 'x', '[x]', 'y', 'yes', '1'])('isBooleanTrueString returns true for %s', input => {
    expect(boolean_1.isBooleanTrueString(input)).toBeTruthy();
});
test.each(['yes,it,does', 'y yes i think so, certainly', 'x marks the spot', '2'])('isBooleanTrueString returns false for %s', input => {
    expect(boolean_1.isBooleanTrueString(input)).toBeFalsy();
});
test.each(['false', ' ', '[ ]', 'n', 'no', '0'])('isBooleanFalseString returns true for %s', input => {
    expect(boolean_1.isBooleanFalseString(input)).toBeTruthy();
});
test.each(['no,it,does not', 'no i do not think so, mate', 'false pretenses', '100'])('isBooleanFalseString returns false for %s', input => {
    expect(boolean_1.isBooleanFalseString(input)).toBeFalsy();
});
test('isBooleanNumber returns true & false as expected', () => {
    expect(boolean_1.isBooleanNumber(1)).toBe(true);
    expect(boolean_1.isBooleanNumber(0)).toBe(true);
    expect(boolean_1.isBooleanNumber(-1)).toBe(false);
    expect(boolean_1.isBooleanNumber(3)).toBe(false);
    expect(boolean_1.isBooleanNumber(0.01)).toBe(false);
    expect(boolean_1.isBooleanNumber(100)).toBe(false);
});
test.each(['true', 'x', '[x]', 'y', 'yes', '1', 1, 'false', ' ', '[ ]', 'n', 'no', '0', 0])('canOnlyBeBoolean checks if %s can be coerced to a boolean', input => {
    expect(boolean_1.canOnlyBeBoolean(input)).toBeTruthy();
});
test.each(['hello', 'd', '[d]', 'sup', 10])('canOnlyBeBoolean returns false when passed %s', input => {
    expect(boolean_1.canOnlyBeBoolean(input)).toBeFalsy();
});
test.each([true, [true], ['true'], '[true]', '["true"]', 1, [1], '[x]', 'yes'])('canOnlyBeBooleanArray checks if %s can be coerced to a BooleanArray', input => {
    expect(boolean_1.canOnlyBeBooleanArray(input)).toBeTruthy();
});
/**
 * Coercions
 */
test.each([1, '1', true, 'x', '[x]', 'y', 'yes'])('Transformer: zToBoolean parses %d to true as expected', input => {
    expect(boolean_1.zToBoolean.parse(input)).toBeTruthy();
});
test.each([0, '0', false, ' ', '[ ]', 'n', 'no'])('Transformer: zToBoolean parses %d to false as expected', input => {
    expect(boolean_1.zToBoolean.parse(input)).toBeFalsy();
});
test.each([5, ['hello', 'Mr', 'Wolf'], { id: 1234, name: 'Lewis, Mr Lewis' }])("Transformer: zToBoolean returns an error as it can't coerce %d", input => {
    try {
        expect(boolean_1.zToBoolean.parse(input));
    }
    catch (err) {
        expect(err.errors[0].message).toBe('Cannot coerce value to Boolean.');
    }
});
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
    const uut = boolean_1.zToBooleanArray.parse(input);
    expect(z.array(z.boolean()).check(uut)).toBeTruthy();
});
/**
 * Transforms
 */
test('Coerce: coerceBoolean returns true as expected', () => {
    expect(boolean_1.coerceBoolean('true')).toBe(true);
    expect(boolean_1.coerceBoolean('x')).toBe(true);
    expect(boolean_1.coerceBoolean('[x]')).toBe(true);
    expect(boolean_1.coerceBoolean('y')).toBe(true);
    expect(boolean_1.coerceBoolean('yes')).toBe(true);
    expect(boolean_1.coerceBoolean('1')).toBe(true);
    expect(boolean_1.coerceBoolean(1)).toBe(true);
});
test('Coerce: coerceBoolean returns false as expected', () => {
    expect(boolean_1.coerceBoolean('false')).toBe(false);
    expect(boolean_1.coerceBoolean(' ')).toBe(false);
    expect(boolean_1.coerceBoolean('[ ]')).toBe(false);
    expect(boolean_1.coerceBoolean('n')).toBe(false);
    expect(boolean_1.coerceBoolean('no')).toBe(false);
    expect(boolean_1.coerceBoolean('0')).toBe(false);
    expect(boolean_1.coerceBoolean(0)).toBe(false);
});
