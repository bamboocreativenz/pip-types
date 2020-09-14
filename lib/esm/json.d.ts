import * as z from 'zod';
/**
 * Checks
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
