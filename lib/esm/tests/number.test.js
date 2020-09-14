"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const z = __importStar(require("zod"));
const number_1 = require("../number");
/**
 * Transform Tests
 */
test('Transformer: zToNumber parses positive decimal strings', () => {
    expect(number_1.zToNumber.parse('1.4')).toBe(1.4);
    expect(number_1.zToNumber.parse('-1.4')).toBe(-1.4);
    expect(number_1.zToNumber.parse('1')).toBe(1);
    expect(number_1.zToNumber.parse('-1')).toBe(-1);
});
test('Transformer: when zToNumber is passed a number it returns it', () => {
    expect(number_1.zToNumber.parse(1)).toBe(1);
    expect(number_1.zToNumber.parse(-1)).toBe(-1);
    expect(number_1.zToNumber.parse(333)).toBe(333);
});
test('Transformer: when zToNumber is passed a bool it returns 1 or 0', () => {
    expect(number_1.zToNumber.parse(true)).toBe(1);
    expect(number_1.zToNumber.parse(false)).toBe(0);
});
test('Transformer: zToNumber returns the recieved value if it could not transform it', () => {
    const val = number_1.zToNumber.parse(1);
    expect(val).toBe(1);
});
test('Transformer: zToNumber within a Zod object parses a js object', () => {
    const zTest = z.object({
        num: number_1.zToNumber,
    });
    const data = {
        num: '1.4',
    };
    const zData = zTest.parse(data);
    expect(zData.num).toBe(1.4);
});
test('Transformer: zToNumber within a Zod object works with JSON.parse()', () => {
    const zTest = z.object({
        num: number_1.zToNumber,
    });
    const data = `{
		"num": "1.4"
	}`;
    const zData = zTest.parse(JSON.parse(data));
    expect(zData.num).toBe(1.4);
});
