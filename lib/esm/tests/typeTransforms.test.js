import * as z from 'zod';
import { zToStringArray, zToBoolean, zToNumber } from '../typeTransforms';
/**
 ** zToBoolean Tests
 */
test('Transformer: zToBoolean returns true as expected', () => {
    expect(zToBoolean.parse(true)).toBe(true);
    expect(zToBoolean.parse('true')).toBe(true);
    expect(zToBoolean.parse('x')).toBe(true);
    expect(zToBoolean.parse('[x]')).toBe(true);
    expect(zToBoolean.parse('y')).toBe(true);
    expect(zToBoolean.parse('yes')).toBe(true);
    expect(zToBoolean.parse('1')).toBe(true);
    expect(zToBoolean.parse(1)).toBe(true);
});
test('Transformer: zToBoolean returns false as expected', () => {
    expect(zToBoolean.parse(false)).toBe(false);
    expect(zToBoolean.parse('false')).toBe(false);
    expect(zToBoolean.parse(' ')).toBe(false);
    expect(zToBoolean.parse('[ ]')).toBe(false);
    expect(zToBoolean.parse('n')).toBe(false);
    expect(zToBoolean.parse('no')).toBe(false);
    expect(zToBoolean.parse('0')).toBe(false);
    expect(zToBoolean.parse(0)).toBe(false);
});
test('Transformer: zToBoolean Numbers other than 1 and 0 throw Zod Errors', () => {
    try {
        expect(zToBoolean.parse(5)).toBe('this toBe is not called when it the function throws - its not toBe :)');
    }
    catch (err) {
        expect(err.errors[0].message).toBe('Cannot coerce value to boolean.');
    }
});
test('Transformer: zToBoolean Arrays throw Zod Errors', () => {
    try {
        expect(zToBoolean.parse(['hello', 'Mr', 'Wolf'])).toBe('_');
    }
    catch (err) {
        expect(err.errors[0].message).toBe('Cannot coerce value to boolean.');
    }
});
test('Transformer: zToBoolean Object throw Zod Errors', () => {
    try {
        expect(zToBoolean.parse({ id: 1234, name: 'Lewis, Mr Lewis' })).toBe('_');
    }
    catch (err) {
        expect(err.errors[0].message).toBe('Cannot coerce value to boolean.');
    }
});
/**
 ** zToString Tests
 */
test('Transformer: zToStringArray parses comma seperated strings with no spaces', () => {
    const num = zToStringArray.parse('hello,bob,its,me');
    expect(num).toStrictEqual(['hello', 'bob', 'its', 'me']);
});
test('Transformer: zToStringArray parses comma seperated strings with spaces', () => {
    const num = zToStringArray.parse('hello, bob, its, me');
    expect(num).toStrictEqual(['hello', 'bob', 'its', 'me']);
});
/**
 ** zToNumber Tests
 */
test('Transformer: zToNumber parses positive decimal strings', () => {
    expect(zToNumber.parse('1.4')).toBe(1.4);
    expect(zToNumber.parse('-1.4')).toBe(-1.4);
    expect(zToNumber.parse('1')).toBe(1);
    expect(zToNumber.parse('-1')).toBe(-1);
});
test('Transformer: when zToNumber is passed a number it returns it', () => {
    expect(zToNumber.parse(1)).toBe(1);
    expect(zToNumber.parse(-1)).toBe(-1);
    expect(zToNumber.parse(333)).toBe(333);
});
test('Transformer: when zToNumber is passed a bool it returns 1 or 0', () => {
    expect(zToNumber.parse(true)).toBe(1);
    expect(zToNumber.parse(false)).toBe(0);
});
test('Transformer: zToNumber returns the recieved value if it could not transform it', () => {
    const val = zToNumber.parse(1);
    expect(val).toBe(1);
});
test('Transformer: zToNumber within a Zod object parses a js object', () => {
    const zTest = z.object({
        num: zToNumber
    });
    const data = {
        num: '1.4'
    };
    const zData = zTest.parse(data);
    expect(zData.num).toBe(1.4);
});
test('Transformer: zToNumber within a Zod object works with JSON.parse()', () => {
    const zTest = z.object({
        num: zToNumber
    });
    const data = `{
		"num": "1.4"
	}`;
    const zData = zTest.parse(JSON.parse(data));
    expect(zData.num).toBe(1.4);
});
