import * as z from 'zod'
import {
  cond,
  flow,
  identity,
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isString,
  map,
  stubFalse,
  stubTrue,
  trim,
} from 'lodash/fp'

import { isArrayString } from './array'
import { isBooleanFalseString, isBooleanTrueString } from './boolean'
import { parseAndTrimCsv } from './common/parse-csv'
import { isNumberString } from './number'
import { isObjectString } from './object'

/**
 * Checks
 */
export const canOnlyBeString = cond<any, boolean>([
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
  [stubTrue, stubTrue],
])

export function isStringArrayString(v: string) {
  return parseAndTrimCsv(v)[0].every((item: string) => canOnlyBeString(item))
}

/**
 * Coercions
 */

export const coerceString = cond<any, string>([[isString, data => flow([escape, trim])(data)]])

export const coerceStringArray = (v: string) => {
  return map<any, string>(coerceString)(parseAndTrimCsv(v)[0])
}

/**
 * Transforms
 */
export const zToString = z
  .any()
  .refine(value => canOnlyBeString(value), {
    params: identity,
    message: 'Value can be coerced to a type - consider updating to using the corresponding transform.',
  })
  .transform(z.string(), data => coerceString(data))

export const zToStringArray = z
  .any()
  .refine(value => isStringArrayString(value), {
    params: identity,
    message: 'Cannot coerce value to String[].',
  })
  .transform(z.array(z.string()), data => coerceStringArray(data))
