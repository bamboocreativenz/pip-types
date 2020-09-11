import * as z from 'zod'
import yaml from 'yaml'
import escape from 'validator/lib/escape'
import { isBoolean, stubTrue, cond, stubFalse, isNumber, isString, isObject, map } from 'lodash/fp'
import {
  isBooleanTrueString,
  isBooleanFalseString,
  isBooleanNumber,
  isBooleanArrayString,
  isNumberArrayString,
  isStringArrayString,
  isNumberString,
  isObjectString,
} from './typeChecks'

/**
 * Boolean
 */
export const coerceBoolean = cond<any, boolean>([
  [isBoolean, data => Boolean(data)],
  [isBooleanTrueString, stubTrue],
  [isBooleanFalseString, stubFalse],
  [isBooleanNumber, isBooleanNumber],
])

export const coerceBooleanArray = map<any, boolean>(coerceBoolean)

/**
 * String
 */
export const coerceString = cond<any, string>([[isString, data => escape(data)]])

export const coerceStringArray = map<any, string>(coerceString)

/**
 * Number
 */
export const coerceNumber = cond<any, number>([
  [isNumber, data => parseFloat(data)],
  [isNumberString, data => parseFloat(data)],
])

export const coerceNumberArray = map<any, number>(coerceNumber)

/**
 * Object
 */
export const coerceObject = cond<any, object>([
  [isObject, data => Object(data)],
  [isObjectString, data => yaml.parse(data)],
])

export const coerceObjectArray = map<any, object>(coerceObject)

// Wip - a generic coerceArray function
const _coerceArray: {
  [T in z.ZodTypes]?: (value: string, schema: z.ZodType<any>) => any
} = {
  [z.ZodTypes.boolean]: v => {
    if (isBooleanArrayString(v)) {
      return coerceBooleanArray(v)
    }
  },
  [z.ZodTypes.string]: v => {
    if (isStringArrayString(v)) {
      return coerceStringArray(v)
    }
  },
  [z.ZodTypes.number]: v => {
    if (isNumberArrayString(v)) {
      return coerceNumberArray(v)
    }
  },
}

function coerceArray<T>(scheme: z.ZodType<T>) {
  return (value: string): T[] => {
    const transform = _coerceArray[scheme._def.t]
    //@ts-ignore
    return transform(value, scheme)
  }
}

const _coerceBooleanArray = coerceArray<boolean>(z.boolean())

const test = _coerceBooleanArray('[true,false]')

// take 2

const coerceArrayAgain = <T extends z.ZodType<any>>(arrayType: T) => {
  return z.transformer(z.union([arrayType, z.array(arrayType)]), z.array(arrayType), n =>
    cond<any, any>([
      [isBooleanArrayString, coerceBooleanArray],
      [isNumberArrayString, coerceNumberArray],
      [isStringArrayString, coerceStringArray],
    ])(n)
  )
}

const test2 = coerceArrayAgain(z.boolean()).parse('[true,false]')

/**
 * Transform Type return Zod Object

export function parseAndTransform<T>(schema: z.ZodType<T>, value: unknown): T {
  try {
    return schema.parse(value);
  } catch {}
  const transformedValue = _parseAndTransform(schema, value);
  return schema.parse(transformedValue);
}

function _parseAndTransform<T>(
  schema: z.ZodType<T> | undefined,
  value: unknown
): T | unknown {
  if (!schema) {
    return value;
  }
  const transform = transformByZodType[schema._def.t];
  if (!transform) {
    return value;
  }
  return transform(value, schema);
}

export const transformByZodType: {
  [T in z.ZodTypes]?: (value: unknown, schema: z.ZodType<any>) => unknown;
} = {
  [z.ZodTypes.number]: (v) => {
    const n = Number(v);
    if (!isNaN(n)) {
      return n;
    }
    return v;
  },
  [z.ZodTypes.boolean]: (v) => {
    return Boolean(v);
  },
  [z.ZodTypes.date]: (v, _s) => {
    const s = _s as z.ZodDate;
    if (s.check(v)) return v;
    if (isString(v) || isNumber(v)) {
      return new Date(v);
    }
    return v;
  },
  [z.ZodTypes.array]: (v, _s) => {
    const s = _s as z.ZodArray<any>;
    if (!isArrayLike(v) && !isIterable(v)) {
      return v;
    }
    const array: unknown[] = Array.from(v);
    return array.map((e) => {
      return _parseAndTransform(s._def.type, e);
    });
  },
  [z.ZodTypes.union]: (v, _s) => {
    const s = _s as z.ZodUnion<any>;
    for (const subSchema of s._def.options) {
      const parsedValue = _parseAndTransform(subSchema, v);
      if (s.check(parsedValue)) {
        return parsedValue;
      }
    }
    return v;
  },
  [z.ZodTypes.object]: (object, _s) => {
    const s = _s as z.ZodObject<any>;
    if (!isObject(object)) {
      return object;
    }
    return Object.fromEntries(
      Object.entries(object).map(([k, v]) => [
        k,
        _parseAndTransform(s._def.shape()[k], v),
      ])
    );
  },
  [z.ZodTypes.record]: (object, _s) => {
    const s = _s as z.ZodRecord;
    if (!isObject(object)) {
      return object;
    }
    return Object.fromEntries(
      Object.entries(object).map(([k, v]) => [
        k,
        _parseAndTransform(s._def.valueType, v),
      ])
    );
  },
};
*/
