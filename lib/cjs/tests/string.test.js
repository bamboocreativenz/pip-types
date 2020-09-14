"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_1 = require("../string");
test.each([
    '1',
    '-5',
    '[1,2]',
    'x',
    '[ ]',
    'true',
    '[true, false]',
    '["string","array"',
    '{a: "1", b: 2}',
    '[{a: "1", b: 2},{a: "1", b: 2}]',
    '[["nested", "array"],[1,2]',
])("Transformer: zToString returns an error as it can't coerce %d", input => {
    try {
        expect(string_1.zToString.parse(input));
    }
    catch (err) {
        expect(err.errors[0].message).toBe('Value can be coerced to a type - consider updating to using the corresponding transform.');
    }
});
test('Transformer: zToStringArray parses comma seperated strings with no spaces', () => {
    const uut = string_1.zToStringArray.parse('hello,bob,its,me');
    expect(uut).toStrictEqual(['hello', 'bob', 'its', 'me']);
});
test('Transformer: zToStringArray parses comma seperated strings with spaces', () => {
    const uut = string_1.zToStringArray.parse('hello, bob, its, me');
    expect(uut).toStrictEqual(['hello', 'bob', 'its', 'me']);
});
