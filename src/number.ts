import * as z from 'zod'
import { cond, identity, isArray, isBoolean, isNumber, isObject, map, stubFalse, stubTrue, trim } from 'lodash/fp'

import { isArrayString } from './array'
import { isBooleanFalseString, isBooleanTrueString } from './boolean'
import { parseAndTrimCsv } from './common/parse-csv'
import { isObjectString } from './object'

/**
 * Checks
 */

/**
 * isNumberString checks if a string can be coerced.
 * Trims excess whitespace
 * @param v string to check
 */
export function isNumberString(v: string) {
  return z.number().check(Number(trim(v)))
}

export const canOnlyBeNumber = cond<any, boolean>([
  [isBoolean, stubTrue],
  [isArray, stubFalse],
  [isObject, stubFalse],
  [isArrayString, stubFalse],
  [isObjectString, stubFalse],
  [isNumberString, stubTrue],
  [isNumber, stubTrue],
  [isBooleanTrueString, stubFalse],
  [isBooleanFalseString, stubFalse],
  [stubTrue, stubFalse],
])

export function isNumberArrayString(v: string) {
  return parseAndTrimCsv(v)[0].every((item: string) => canOnlyBeNumber(item))
}

/**
 * Coercions
 */

export const coerceNumber = cond<any, number>([
  [isBoolean, data => Number(data)],
  [isNumber, data => Number(data)],
  [isNumberString, data => Number(data)],
])

export const coerceNumberArray = map<any, number>(coerceNumber)

/**
 * Transforms
 */

export const zToNumber = z
  .any()
  .refine(value => canOnlyBeNumber(value), {
    params: identity,
    message: 'Cannot coerce value to Number.',
  })
  .transform(z.number(), data => coerceNumber(data))

export const zToNumberArray = z
  .any()
  .refine(value => isNumberArrayString(value), {
    params: identity,
    message: 'Cannot coerce value to Number[].',
  })
  .transform(z.array(z.number()), data => coerceNumberArray(data))
