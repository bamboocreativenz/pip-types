import * as z from 'zod';
/**
 * Checks
 */
export declare function isObjectString(v: string): boolean;
export declare const canOnlyBeObject: (Target: any) => boolean;
export declare function isObjectArrayString(v: string): boolean;
/**
 * Coercions
 */
export declare const coerceObject: (Target: any) => object;
export declare const coerceObjectArray: import("lodash/fp").LodashMap1x1<any, object>;
/**
 * Transforms
 */
export declare const zToObject: z.ZodTransformer<z.ZodAny, z.ZodObject<{}, import("zod/lib/src/helpers/objectUtil").objectUtil.Flatten<{} & {
    strict: false;
}>, import("zod/lib/src/helpers/objectUtil").objectUtil.Flatten<{} & {
    [k: string]: any;
}>>>;
export declare const zToObjectArray: z.ZodTransformer<z.ZodAny, z.ZodArray<z.ZodObject<{}, import("zod/lib/src/helpers/objectUtil").objectUtil.Flatten<{} & {
    strict: false;
}>, import("zod/lib/src/helpers/objectUtil").objectUtil.Flatten<{} & {
    [k: string]: any;
}>>>>;
