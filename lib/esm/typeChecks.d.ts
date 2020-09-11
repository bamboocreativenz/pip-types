import * as z from 'zod';
/**
 * Boolean
 */
export declare function isBooleanTrueString(v: string): boolean;
export declare function isBooleanFalseString(v: string): boolean;
export declare function isBooleanNumber(v: any): boolean;
export declare const canOnlyBeBoolean: (Target: any) => boolean;
export declare function isBooleanArrayString(v: string): boolean;
/**
 * String
 */
export declare const canOnlyBeString: (Target: any) => boolean;
export declare function isStringArrayString(v: string): boolean;
/**
 * Number
 */
export declare function isNumberString(v: string): boolean;
export declare const canOnlyBeNumber: (Target: any) => boolean;
export declare function isNumberArrayString(v: string): boolean;
/**
 * Object
 */
export declare function isObjectString(v: string): boolean;
export declare const canOnlyBeObject: (Target: any) => boolean;
export declare function isObjectArrayString(v: string): boolean;
/**
 * Array
 */
export declare const canOnlyBeArray: (Target: any) => boolean;
export declare function isArrayString(v: string): boolean;
export declare function isTwoDimentionalArrayString(v: string): boolean;
/**
 * Array Type Checks
 */
export declare function isBooleanArray(v: unknown): boolean;
export declare function isStringArray(v: unknown): boolean;
export declare function isNumberArray(v: unknown): boolean;
export declare function isObjectArray(v: unknown): boolean;
export declare function isTwoDimentionalArray(v: unknown): boolean;
/**
 * JSON
 */
declare type Literal = boolean | null | number | string;
declare type Json = Literal | {
    [key: string]: Json;
} | Json[];
/**
 * @example
 * jsonSchema.parse({
 *   // data
 * })
 */
export declare const jsonSchema: z.ZodSchema<Json>;
export {};
