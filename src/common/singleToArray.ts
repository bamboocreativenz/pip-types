import * as z from 'zod'
/**
 * singleToArray is used when you are not sure whether a returned value is wrapped in an array or not and you want make sure it is.
 * @param arrayType the Zod type you are expecting to pass the function
 * @example
 *  const stringArrayWithSingle = singleToArray(z.string())
 *  const result = stringArrayWithSingle.parse('5');
 *  const parsed = stringArrayWithSingle.parse(['5']);
 *  console.log(result, parsed)
 */
export const singleToArray = <T extends z.ZodType<any>>(arrayType: T) => {
  return z
    .transformer(z.union([arrayType, z.array(arrayType)]), z.array(arrayType), n => (Array.isArray(n) ? n : [n]))
    .transform(z.array(arrayType), data => data)
}
