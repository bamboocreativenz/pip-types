import * as z from 'zod'
import { zToNumber } from '../number'

/**
 * Transform Tests
 */
test('Transformer: zToNumber parses positive decimal strings', () => {
  expect(zToNumber.parse('1.4')).toBe(1.4)
  expect(zToNumber.parse('-1.4')).toBe(-1.4)
  expect(zToNumber.parse('1')).toBe(1)
  expect(zToNumber.parse('-1')).toBe(-1)
})

test('Transformer: when zToNumber is passed a number it returns it', () => {
  expect(zToNumber.parse(1)).toBe(1)
  expect(zToNumber.parse(-1)).toBe(-1)
  expect(zToNumber.parse(333)).toBe(333)
})

test('Transformer: when zToNumber is passed a bool it returns 1 or 0', () => {
  expect(zToNumber.parse(true)).toBe(1)
  expect(zToNumber.parse(false)).toBe(0)
})

test('Transformer: zToNumber returns the recieved value if it could not transform it', () => {
  const val = zToNumber.parse(1)
  expect(val).toBe(1)
})

test('Transformer: zToNumber within a Zod object parses a js object', () => {
  const zTest = z.object({
    num: zToNumber,
  })
  const data = {
    num: '1.4',
  }
  const zData = zTest.parse(data)
  expect(zData.num).toBe(1.4)
})

test('Transformer: zToNumber within a Zod object works with JSON.parse()', () => {
  const zTest = z.object({
    num: zToNumber,
  })
  const data = `{
		"num": "1.4"
	}`
  const zData = zTest.parse(JSON.parse(data))
  expect(zData.num).toBe(1.4)
})
