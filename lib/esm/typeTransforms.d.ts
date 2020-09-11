import * as z from 'zod';
/**
 * Boolean Transformers
 */
export declare const zToBoolean: z.ZodTransformer<z.ZodAny, z.ZodBoolean>;
export declare const zToBooleanArray: z.ZodTransformer<z.ZodAny, z.ZodArray<z.ZodBoolean>>;
/**
 * String Transformers
 */
export declare const zToString: z.ZodTransformer<z.ZodAny, z.ZodString>;
export declare const zToStringArray: z.ZodTransformer<z.ZodAny, z.ZodArray<z.ZodString>>;
/**
 * Number Transformers
 */
export declare const zToNumber: z.ZodTransformer<z.ZodAny, z.ZodNumber>;
export declare const zToNumberArray: z.ZodTransformer<z.ZodAny, z.ZodArray<z.ZodNumber>>;
/**
 * Date Transformers
 */
/**
 * Object Transformers
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
/**
 * singleToArray is used when you are not sure whether a returned value is wrapped in an array or not and you want make sure it is.
 * @param arrayType the Zod type you are expecting to pass the function
 * @example
 *  const stringArrayWithSingle = singleToArray(z.string())
 *  const result = stringArrayWithSingle.parse('5');
 *  const parsed = stringArrayWithSingle.parse(['5']);
 *  console.log(result, parsed)
 */
export declare const singleToArray: <T extends z.ZodType<any, z.ZodTypeDef>>(arrayType: T) => z.ZodTransformer<z.ZodUnion<[T, z.ZodArray<T>]>, z.ZodArray<T>>;
