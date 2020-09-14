"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("../json");
test('Type Check: jsonSchema parses json as expected', () => {
    const validJSON = JSON.stringify({ a: '1' });
    expect(json_1.jsonSchema.parse(validJSON)).toBe(validJSON);
});
test('Type Check: jsonSchema parses JS objects to valid JSON', () => {
    const uut = json_1.jsonSchema.parse({ id: 1234, name: 'Lewis, Mr Lewis' });
    expect(uut).toStrictEqual({ id: 1234, name: 'Lewis, Mr Lewis' });
    expect(JSON.parse(JSON.stringify(uut))).toStrictEqual({ id: 1234, name: 'Lewis, Mr Lewis' });
});
