import * as z from 'zod';
/**
 * Checks
 */
export declare function isBooleanTrueString(v: string): boolean;
export declare function isBooleanFalseString(v: string): boolean;
export declare function isBooleanNumber(v: any): boolean;
export declare const canOnlyBeBoolean: (Target: any) => boolean;
export declare function isBooleanArrayString(v: string): boolean;
export declare function isBooleanArrayCsv(v: string): boolean;
export declare function isBooleanNumberArray(v: any): any;
export declare function checkBooleanArrayString(v: string): boolean;
export declare const canOnlyBeBooleanArray: (Target: any) => boolean;
/**
 * Coercions
 */
export declare const coerceBoolean: (Target: any) => boolean;
export declare function coerceBooleanArrayString(v: string): boolean[];
export declare function coerceBooleanArrayCsv(v: string): boolean[];
export declare function coerceArrayToBooleanArray(v: any[]): boolean[];
export declare function coerceAnyToBooleanArray(v: unknown): boolean[];
export declare const coerceBooleanArray: (Target: any) => boolean[];
/**
 * Transforms
 */
export declare const zToBoolean: z.ZodTransformer<z.ZodAny, z.ZodBoolean>;
export declare const zToBooleanArray: z.ZodTransformer<z.ZodAny, z.ZodArray<z.ZodBoolean>>;
