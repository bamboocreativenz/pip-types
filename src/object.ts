import * as z from 'zod'
import { cond, identity, isArray, isBoolean, isNumber, isObject, map, stubFalse, stubTrue } from 'lodash/fp'
import yaml from 'yaml'

import { isArrayString } from './array'
import { isBooleanFalseString, isBooleanTrueString } from './boolean'
import { parseAndTrimCsv } from './common/parse-csv'

/**
 * Checks
 */
export function isObjectString(v: string) {
  try {
    return z.object({}).nonstrict().check(yaml.parse(v))
  } catch (error) {
    return false
  }
}

export const canOnlyBeObject = cond<any, boolean>([
  [isBoolean, stubFalse],
  [isNumber, stubFalse],
  [isArray, stubFalse],
  [isBooleanTrueString, stubFalse],
  [isBooleanFalseString, stubFalse],
  [isArrayString, stubFalse],
  [isObjectString, stubTrue],
  [isObject, stubTrue],
  [stubTrue, stubFalse],
])

export function isObjectArrayString(v: string) {
  return parseAndTrimCsv(v)[0].every((item: string) => canOnlyBeObject(item))
}

/**
 * Coercions
 */
export const coerceObject = cond<any, object>([
  [isObject, data => Object(data)],
  [isObjectString, data => yaml.parse(data)],
])

export const coerceObjectArray = map<any, object>(coerceObject)

/**
 * Transforms
 */
export const zToObject = z
  .any()
  .refine(value => canOnlyBeObject(value), {
    params: identity,
    message: 'Cannot coerce value to Object.',
  })
  .transform(z.object({}).nonstrict(), data => coerceObject(data))

export const zToObjectArray = z
  .any()
  .refine(value => isObjectArrayString(value), {
    params: identity,
    message: 'Cannot coerce value to Object[].',
  })
  .transform(z.array(z.object({}).nonstrict()), data => coerceObjectArray(data))
