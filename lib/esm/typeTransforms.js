import * as z from 'zod';
import { identity } from 'lodash/fp';
import { canOnlyBeBoolean, canOnlyBeString, canOnlyBeNumber, canOnlyBeObject, isBooleanArrayString, isNumberArrayString, isStringArrayString, isObjectArrayString } from './typeChecks';
import { coerceBoolean, coerceString, coerceNumber, coerceObject, coerceBooleanArray, coerceStringArray, coerceNumberArray, coerceObjectArray } from './typeCoercions';
/**
 * Boolean Transformers
 */
export const zToBoolean = z.any()
    .refine(value => canOnlyBeBoolean(value), {
    params: identity,
    message: "Cannot coerce value to boolean."
})
    .transform(z.boolean(), (data) => coerceBoolean(data));
export const zToBooleanArray = z.any()
    .refine(value => isBooleanArrayString(value), {
    params: identity,
    message: "Cannot coerce value to boolean array."
})
    .transform(z.array(z.boolean()), (data) => coerceBooleanArray(data));
/**
 * String Transformers
 */
export const zToString = z.any()
    .refine(value => canOnlyBeString(value), {
    params: identity,
    message: "Value can be coerced to a type - consider updating to using the corresponding transform."
})
    .transform(z.string(), (data) => coerceString(data));
export const zToStringArray = z.any()
    .refine(value => isStringArrayString(value), {
    params: identity,
    message: "Cannot coerce value to string array"
})
    .transform(z.array(z.string()), (data) => coerceStringArray(data));
/**
 * Number Transformers
 */
export const zToNumber = z.any()
    .refine(value => canOnlyBeNumber(value), {
    params: identity,
    message: "Cannot coerce value to number."
})
    .transform(z.number(), (data) => coerceNumber(data));
export const zToNumberArray = z.any()
    .refine(value => isNumberArrayString(value), {
    params: identity,
    message: "Cannot coerce value to number array."
})
    .transform(z.array(z.number()), (data) => coerceNumberArray(data));
/**
 * Date Transformers
 */
//TODO
/**
 * Object Transformers
 */
export const zToObject = z.any()
    .refine(value => canOnlyBeObject(value), {
    params: identity,
    message: "Cannot coerce value to object"
})
    .transform(z.object({}).nonstrict(), (data) => coerceObject(data));
export const zToObjectArray = z.any()
    .refine(value => isObjectArrayString(value), {
    params: identity,
    message: "Cannot coerce value to object"
})
    .transform(z.array(z.object({}).nonstrict()), (data) => coerceObjectArray(data));
/**
 * singleToArray is used when you are not sure whether a returned value is wrapped in an array or not and you want make sure it is.
 * @param arrayType the Zod type you are expecting to pass the function
 * @example
 *  const stringArrayWithSingle = singleToArray(z.string())
 *  const result = stringArrayWithSingle.parse('5');
 *  const parsed = stringArrayWithSingle.parse(['5']);
 *  console.log(result, parsed)
 */
export const singleToArray = (arrayType) => {
    return z
        .transformer(z.union([arrayType, z.array(arrayType)]), z.array(arrayType), n => Array.isArray(n) ? n : [n]);
};
