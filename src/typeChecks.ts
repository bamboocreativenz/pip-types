import * as z from 'zod'
import * as yaml from 'yaml'
import { reduce, cond, stubFalse, stubTrue, isNil, isBoolean, isNumber, isArray, isObject } from 'lodash/fp';
import { parseCsv } from './common/parse-csv';

/**
 * Boolean
 */

export function isBooleanTrueString(v: string) { 
  return /^(?:true|truee|x|\[x\]|y|yes|1)$/.test(v)
}

export function isBooleanFalseString(v: string) {
  return /^(?:false|falsee| |\[ \]|n|no|0)$/.test(v)
}

export function isBooleanNumber(v: any) {
  return Number(v) === 1 || Number(v) === 0
}

export const canOnlyBeBoolean = cond<any,boolean> ([
  [isBoolean, stubTrue],
  [isBooleanTrueString, stubTrue],
  [isBooleanFalseString, stubTrue],
  [isBooleanNumber, stubTrue],
  [stubTrue, stubFalse]
])

export function isBooleanArrayString(v: string) {
  return parseCsv(v)[0].every((item: string) => canOnlyBeBoolean(item))
}

/**
 * String
 */

export const canOnlyBeString = cond<any,boolean> ([
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
])

export function isStringArrayString(v: string) {
  return parseCsv(v)[0].every((item: string) => canOnlyBeString(item))
}

/**
 * Number
 */

export function isNumberString(v: string) {
  return z.number().check(parseFloat(v.trim()))
}

export const canOnlyBeNumber = cond<any,boolean> ([
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
])

export function isNumberArrayString(v: string) {
  return parseCsv(v)[0].every((item: string) => canOnlyBeNumber(item))
}

/**
 * Object
 */

export function isObjectString(v: string) {
  try {
    return z.object({}).nonstrict().check(yaml.parse(v))
  } catch (error) {
    return false
  }
}

export const canOnlyBeObject = cond<any,boolean> ([
  [isBoolean, stubFalse],
  [isNumber, stubFalse],
  [isArray, stubFalse],
  [isBooleanTrueString, stubFalse],
  [isBooleanFalseString, stubFalse],
  [isArrayString, stubFalse],
  [isObjectString, stubTrue],
  [isObject, stubTrue],
  [stubTrue, stubFalse]
])

export function isObjectArrayString(v: string) {
  return parseCsv(v)[0].every((item: string) => canOnlyBeObject(item))
}

/**
 * Array
 */

export const canOnlyBeArray = cond<any,boolean> ([
  [isBoolean, stubFalse],
  [isNumber, stubFalse],
  [isObject, stubFalse],
  [isBooleanTrueString, stubFalse],
  [isBooleanFalseString, stubFalse],
  [isObjectString, stubFalse],
  [isArrayString, stubTrue],
  [isArray, stubTrue],
  [stubTrue, stubFalse]
])

export function isArrayString(v: string) {
  try {
    return z.array(z.any()).check(yaml.parse(v))
  } catch (error) {
    return false
  }
}

export function isTwoDimentionalArrayString(v: string) {
  return parseCsv(v)[0].every((item: string) => canOnlyBeArray(item))
}

/**
 * Array Type Checks
 */

export function isBooleanArray(v: unknown): boolean {
  return z.array(z.boolean()).check(v)
}

export function isStringArray(v: unknown): boolean {
  return z.array(z.string()).check(v)
}

export function isNumberArray(v: unknown): boolean {
  return z.array(z.number()).check(v)
}

export function isObjectArray(v: unknown): boolean {
  return z.array(z.object({}).nonstrict()).check(v)
}

export function isTwoDimentionalArray(v: unknown): boolean {
  return z.array(z.array(z.any())).check(v)
}


/**
 * JSON
 */

type Literal = boolean | null | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

/**
 * @example
 * jsonSchema.parse({
 *   // data
 * })
 */
export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);
