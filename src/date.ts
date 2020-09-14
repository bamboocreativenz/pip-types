import * as z from 'zod'
import { cond, identity, isBoolean, isDate, isString, map, stubFalse } from 'lodash/fp'
import moment from 'moment'
import { parseAndTrimCsv } from './common/parse-csv'

/**
 * Checks
 */
export function isDateString(v: string) {
  try {
    return z.date().check(moment(v).toDate)
  } catch (error) {
    return false
  }
}

export const canOnlyBeDate = cond<any, boolean>([[isBoolean, stubFalse]])

export function isDateArrayString(v: string) {
  return parseAndTrimCsv(v)[0].every((item: string) => canOnlyBeDate(item))
}

/**
 * Coercions
 */
export const coerceDate = cond<any, Date>([
  [isDate, data => moment(data).toDate()],
  [isString, data => moment(data).toDate()],
])

export const coerceDateArray = map<any, Date>(coerceDate)

/**
 * Transforms
 */
export const zToDate = z
  .any()
  .refine(value => canOnlyBeDate(value), {
    params: identity,
    message: 'Cannot coerce value to Date.',
  })
  .transform(z.date(), data => coerceDate(data))

export const zToDateArray = z
  .any()
  .refine(value => isDateArrayString(value), {
    params: identity,
    message: 'Cannot coerce value to Date[].',
  })
  .transform(z.array(z.date()), data => coerceDateArray(data))
