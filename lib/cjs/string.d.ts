import * as z from 'zod';
/**
 * Checks
 */
export declare const canOnlyBeString: (Target: any) => boolean;
export declare function isStringArrayString(v: string): boolean;
/**
 * Coercions
 */
export declare const coerceString: (Target: any) => string;
export declare const coerceStringArray: (v: string) => string[];
/**
 * Transforms
 */
export declare const zToString: z.ZodTransformer<z.ZodAny, z.ZodString>;
export declare const zToStringArray: z.ZodTransformer<z.ZodAny, z.ZodArray<z.ZodString>>;
