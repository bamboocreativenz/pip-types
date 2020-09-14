import * as z from 'zod';
/**
 * singleToArray is used when you are not sure whether a returned value is wrapped in an array or not and you want make sure it is.
 * @param arrayType the Zod type you are expecting to pass the function
 * @example
 *  const stringArrayWithSingle = singleToArray(z.string())
 *  const result = stringArrayWithSingle.parse('5');
 *  const parsed = stringArrayWithSingle.parse(['5']);
 *  console.log(result, parsed)
 */
export declare const singleToArray: <T extends z.ZodType<any, z.ZodTypeDef>>(arrayType: T) => z.ZodTransformer<z.ZodTransformer<z.ZodUnion<[T, z.ZodArray<T>]>, z.ZodArray<T>>, z.ZodArray<T>>;
