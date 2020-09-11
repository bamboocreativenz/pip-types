import { coerceBoolean } from "../typeCoercions";
test('Coerce: coerceBoolean returns true as expected', () => {
    expect(coerceBoolean('true')).toBe(true);
    expect(coerceBoolean('x')).toBe(true);
    expect(coerceBoolean('[x]')).toBe(true);
    expect(coerceBoolean('y')).toBe(true);
    expect(coerceBoolean('yes')).toBe(true);
    expect(coerceBoolean('1')).toBe(true);
    expect(coerceBoolean(1)).toBe(true);
});
test('Coerce: coerceBoolean returns false as expected', () => {
    expect(coerceBoolean('false')).toBe(false);
    expect(coerceBoolean(' ')).toBe(false);
    expect(coerceBoolean('[ ]')).toBe(false);
    expect(coerceBoolean('n')).toBe(false);
    expect(coerceBoolean('no')).toBe(false);
    expect(coerceBoolean('0')).toBe(false);
    expect(coerceBoolean(0)).toBe(false);
});
