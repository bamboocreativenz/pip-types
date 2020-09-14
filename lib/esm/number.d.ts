import * as z from 'zod';
/**
 * Checks
 */
/**
 * isNumberString checks if a string can be coerced.
 * Trims excess whitespace
 * @param v string to check
 */
export declare function isNumberString(v: string): boolean;
export declare const canOnlyBeNumber: (Target: any) => boolean;
export declare function isNumberArrayString(v: string): boolean;
/**
 * Coercions
 */
export declare const coerceNumber: (Target: any) => number;
export declare const coerceNumberArray: import("lodash/fp").LodashMap1x1<any, number>;
/**
 * Transforms
 */
export declare const zToNumber: z.ZodTransformer<z.ZodAny, z.ZodNumber>;
export declare const zToNumberArray: z.ZodTransformer<z.ZodAny, z.ZodArray<z.ZodNumber>>;
