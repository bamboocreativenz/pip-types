import * as z from 'zod';
import * as yaml from 'yaml';
import { cond, stubFalse, stubTrue, isBoolean, isNumber, isArray, isObject } from 'lodash/fp';
import { parseCsv } from './common/parse-csv';
/**
 * Boolean
 */
export function isBooleanTrueString(v) {
    return /^(?:true|truee|x|\[x\]|y|yes|1)$/.test(v);
}
export function isBooleanFalseString(v) {
    return /^(?:false|falsee| |\[ \]|n|no|0)$/.test(v);
}
export function isBooleanNumber(v) {
    return Number(v) === 1 || Number(v) === 0;
}
export const canOnlyBeBoolean = cond([
    [isBoolean, stubTrue],
    [isBooleanTrueString, stubTrue],
    [isBooleanFalseString, stubTrue],
    [isBooleanNumber, stubTrue],
    [stubTrue, stubFalse]
]);
export function isBooleanArrayString(v) {
    return parseCsv(v)[0].every((item) => canOnlyBeBoolean(item));
}
/**
 * String
 */
export const canOnlyBeString = cond([
    [isNumber, stubFalse],
    [isBoolean, stubFalse],
    [isArray, stubFalse],
    [isObject, stubFalse],
    [isBooleanTrueString, stubFalse],
    [isBooleanFalseString, stubFalse],
    [isNumberString, stubFalse],
    [isObjectString, stubFalse],
    [isArrayString, stubFalse],
    // canOnlyBeString is the only cond function here that defaults to returning true.
    [stubTrue, stubTrue]
]);
export function isStringArrayString(v) {
    return parseCsv(v)[0].every((item) => canOnlyBeString(item));
}
/**
 * Number
 */
export function isNumberString(v) {
    return z.number().check(parseFloat(v.trim()));
}
export const canOnlyBeNumber = cond([
    [isBoolean, stubFalse],
    [isArray, stubFalse],
    [isObject, stubFalse],
    [isBooleanTrueString, stubFalse],
    [isBooleanFalseString, stubFalse],
    [isArrayString, stubFalse],
    [isObjectString, stubFalse],
    [isNumberString, stubTrue],
    [isNumber, stubTrue],
    [stubTrue, stubFalse]
]);
export function isNumberArrayString(v) {
    return parseCsv(v)[0].every((item) => canOnlyBeNumber(item));
}
/**
 * Object
 */
export function isObjectString(v) {
    try {
        return z.object({}).nonstrict().check(yaml.parse(v));
    }
    catch (error) {
        return false;
    }
}
export const canOnlyBeObject = cond([
    [isBoolean, stubFalse],
    [isNumber, stubFalse],
    [isArray, stubFalse],
    [isBooleanTrueString, stubFalse],
    [isBooleanFalseString, stubFalse],
    [isArrayString, stubFalse],
    [isObjectString, stubTrue],
    [isObject, stubTrue],
    [stubTrue, stubFalse]
]);
export function isObjectArrayString(v) {
    return parseCsv(v)[0].every((item) => canOnlyBeObject(item));
}
/**
 * Array
 */
export const canOnlyBeArray = cond([
    [isBoolean, stubFalse],
    [isNumber, stubFalse],
    [isObject, stubFalse],
    [isBooleanTrueString, stubFalse],
    [isBooleanFalseString, stubFalse],
    [isObjectString, stubFalse],
    [isArrayString, stubTrue],
    [isArray, stubTrue],
    [stubTrue, stubFalse]
]);
export function isArrayString(v) {
    try {
        return z.array(z.any()).check(yaml.parse(v));
    }
    catch (error) {
        return false;
    }
}
export function isTwoDimentionalArrayString(v) {
    return parseCsv(v)[0].every((item) => canOnlyBeArray(item));
}
/**
 * Array Type Checks
 */
export function isBooleanArray(v) {
    return z.array(z.boolean()).check(v);
}
export function isStringArray(v) {
    return z.array(z.string()).check(v);
}
export function isNumberArray(v) {
    return z.array(z.number()).check(v);
}
export function isObjectArray(v) {
    return z.array(z.object({}).nonstrict()).check(v);
}
export function isTwoDimentionalArray(v) {
    return z.array(z.array(z.any())).check(v);
}
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
/**
 * @example
 * jsonSchema.parse({
 *   // data
 * })
 */
export const jsonSchema = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]));
