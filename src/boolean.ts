import * as z from 'zod'
import * as yaml from 'yaml'
import { cond, stubFalse, stubTrue, isNil, isBoolean, isNumber, isString, identity } from 'lodash/fp'
import { parseAndTrimCsv, canParseCsv } from './common/parse-csv'
import { singleToArray } from './common/singleToArray'
import { isAnyArrayString } from './array'

/**
 * Checks
 */
export function isBooleanTrueString(v: string) {
  return /^(?:true|truee|pass|x|\[x\]|y|yes|1)$/.test(v)
}

export function isBooleanFalseString(v: string) {
  return /^(?:false|falsee|fales|fale| |\[ \]|n|no|0)$/.test(v)
}

export function isBooleanNumber(v: any) {
  if (isNil(Number(v))) return false
  return Number(v) === 1 || Number(v) === 0
}

export const canOnlyBeBoolean = cond<any, boolean>([
  [isBoolean, stubTrue],
  [isBooleanTrueString, stubTrue],
  [isBooleanFalseString, stubTrue],
  [isBooleanNumber, stubTrue],
  [stubTrue, stubFalse],
])

export function isBooleanArrayString(v: string) {
  try {
    const arr: string[] = yaml.parse(v)
    return arr.every((item: string) => canOnlyBeBoolean(item))
  } catch (error) {
    return false
  }
}

export function isBooleanArrayCsv(v: string) {
  return parseAndTrimCsv(v)[0].every((item: string) => canOnlyBeBoolean(item))
}

export function isBooleanNumberArray(v: any) {
  return z.array(z.number()).check(v) === false ? false : v.every((num: number) => isBooleanNumber(num))
}

export function checkBooleanArrayString(v: string) {
  const update = String(v)
    .replace(/^\[+|\]+$/g, '')
    .replace(/\"/g, '')
  const arr: string[] = update.split(',')
  if (z.array(z.string()).check(arr)) {
    return arr.every((_v: string) => canOnlyBeBoolean(_v))
  } else {
    return canOnlyBeBoolean(arr)
  }
}

export const canOnlyBeBooleanArray = cond<any, boolean>([
  [Array.isArray, (data: any[]) => data.every(item => canOnlyBeBoolean(item))],
  [isBoolean, stubTrue],
  [isBooleanTrueString, stubTrue],
  [isBooleanFalseString, stubTrue],
  [checkBooleanArrayString, stubTrue],
  [canParseCsv, isBooleanArrayCsv],
  [isAnyArrayString, isBooleanArrayString],
  [isNumber, isBooleanNumber],
  [stubTrue, stubFalse],
])

/**
 * Coercions
 */
export const coerceBoolean = cond<any, boolean>([
  [isBoolean, data => Boolean(data)],
  [isBooleanTrueString, stubTrue],
  [isBooleanFalseString, stubFalse],
  [isBooleanNumber, isBooleanNumber],
])

export function coerceBooleanArrayString(v: string): boolean[] {
  const update = String(v)
    .replace(/^\[+|\]+$/g, '')
    .replace(/\"/g, '')
  const arr: string[] = update.split(',')
  if (z.array(z.string()).check(arr)) {
    return arr.map((_v: string) => coerceBoolean(_v))
  } else {
    return coerceAnyToBooleanArray(arr)
  }
}

export function coerceBooleanArrayCsv(v: string): boolean[] {
  return parseAndTrimCsv(v)[0].map((_v: string) => coerceBoolean(_v))
}

export function coerceArrayToBooleanArray(v: any[]): boolean[] {
  return v.map(_v => coerceBoolean(_v))
}

export function coerceAnyToBooleanArray(v: unknown): boolean[] {
  return singleToArray(z.boolean()).parse(coerceBoolean(v))
}

export const coerceBooleanArray = cond<any, boolean[]>([
  [Array.isArray, coerceArrayToBooleanArray],
  [isBoolean, coerceAnyToBooleanArray],
  [isNumber, coerceAnyToBooleanArray],
  [isAnyArrayString, coerceBooleanArrayString],
  [canParseCsv, coerceBooleanArrayCsv],
  [isString, coerceBooleanArrayString],
])

/**
 * Transforms
 */

export const zToBoolean = z
  .any()
  .refine(value => canOnlyBeBoolean(value), {
    params: identity,
    message: 'Cannot coerce value to Boolean.',
  })
  .transform(z.boolean(), data => coerceBoolean(data))

export const zToBooleanArray = z
  .any()
  .refine(value => canOnlyBeBooleanArray(value), {
    params: identity,
    message: 'Cannot coerce value to Boolean[].',
  })
  .transform(z.array(z.boolean()), data => coerceBooleanArray(data))
