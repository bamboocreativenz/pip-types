import * as z from 'zod'
import yaml from 'yaml'
import { cond, isArray, isBoolean, isNumber, isObject, stubFalse, stubTrue } from 'lodash/fp'

import { coerceBooleanArray, isBooleanArrayString, isBooleanFalseString, isBooleanTrueString } from './boolean'
import { parseAndTrimCsv } from './common/parse-csv'
import { isObjectString } from './object'
import { coerceNumberArray, isNumberArrayString } from './number'
import { coerceStringArray, isStringArrayString } from './string'

/**
 * Checks
 */
export function isAnyArrayString(v: string) {
  return /\[[^\]]*\]/.test(v)
}

export const canOnlyBeArray = cond<any, boolean>([
  [isBoolean, stubFalse],
  [isNumber, stubFalse],
  [isObject, stubFalse],
  [isBooleanTrueString, stubFalse],
  [isBooleanFalseString, stubFalse],
  [isObjectString, stubFalse],
  [isArrayString, stubTrue],
  [isArray, stubTrue],
  [stubTrue, stubFalse],
])

export function isArrayString(v: string) {
  try {
    return z.array(z.any()).check(yaml.parse(v))
  } catch (error) {
    return false
  }
}

export function isTwoDimentionalArrayString(v: string) {
  return parseAndTrimCsv(v)[0].every((item: string) => canOnlyBeArray(item))
}

/**
 * Coercions
 */

// export const coerceArray = cond<any, any>([
//   [isBooleanArrayString, coerceBooleanArray],
//   [isNumberArrayString, coerceNumberArray],
//   [isStringArrayString, coerceStringArray],
// ])

/**
 * Transforms
 */

// export const zToArrayT = <T extends z.ZodType<any>>(arrayType: T) => {
//   return z
//     .transformer(z.union([arrayType, z.array(arrayType)]), z.array(arrayType), n => coerceArray(n))
//     .transform(z.array(arrayType), data => data)
// }
