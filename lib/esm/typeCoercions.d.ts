/**
 * Boolean
 */
export declare const coerceBoolean: (Target: any) => boolean;
export declare const coerceBooleanArray: import("lodash/fp").LodashMap1x1<any, boolean>;
/**
 * String
 */
export declare const coerceString: (Target: any) => string;
export declare const coerceStringArray: import("lodash/fp").LodashMap1x1<any, string>;
/**
 * Number
 */
export declare const coerceNumber: (Target: any) => number;
export declare const coerceNumberArray: import("lodash/fp").LodashMap1x1<any, number>;
/**
 * Object
 */
export declare const coerceObject: (Target: any) => object;
export declare const coerceObjectArray: import("lodash/fp").LodashMap1x1<any, object>;
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
