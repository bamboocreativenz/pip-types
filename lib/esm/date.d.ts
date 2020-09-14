import * as z from 'zod';
/**
 * Checks
 */
export declare function isDateString(v: string): boolean;
export declare const canOnlyBeDate: (Target: any) => boolean;
export declare function isDateArrayString(v: string): boolean;
/**
 * Coercions
 */
export declare const coerceDate: (Target: any) => Date;
export declare const coerceDateArray: import("lodash/fp").LodashMap1x1<any, Date>;
/**
 * Transforms
 */
export declare const zToDate: z.ZodTransformer<z.ZodAny, z.ZodDate>;
export declare const zToDateArray: z.ZodTransformer<z.ZodAny, z.ZodArray<z.ZodDate>>;
