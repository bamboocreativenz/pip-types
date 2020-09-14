import * as z from 'zod'

/**
 * Checks
 */
type Literal = boolean | null | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])

/**
 * @example
 * jsonSchema.parse({
 *   // data
 * })
 */
export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
)
