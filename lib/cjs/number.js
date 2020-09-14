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
exports.zToNumberArray = exports.zToNumber = exports.coerceNumberArray = exports.coerceNumber = exports.isNumberArrayString = exports.canOnlyBeNumber = exports.isNumberString = void 0;
const z = __importStar(require("zod"));
const fp_1 = require("lodash/fp");
const array_1 = require("./array");
const boolean_1 = require("./boolean");
const parse_csv_1 = require("./common/parse-csv");
const object_1 = require("./object");
/**
 * Checks
 */
/**
 * isNumberString checks if a string can be coerced.
 * Trims excess whitespace
 * @param v string to check
 */
function isNumberString(v) {
    return z.number().check(Number(fp_1.trim(v)));
}
exports.isNumberString = isNumberString;
exports.canOnlyBeNumber = fp_1.cond([
    [fp_1.isBoolean, fp_1.stubTrue],
    [fp_1.isArray, fp_1.stubFalse],
    [fp_1.isObject, fp_1.stubFalse],
    [array_1.isArrayString, fp_1.stubFalse],
    [object_1.isObjectString, fp_1.stubFalse],
    [isNumberString, fp_1.stubTrue],
    [fp_1.isNumber, fp_1.stubTrue],
    [boolean_1.isBooleanTrueString, fp_1.stubFalse],
    [boolean_1.isBooleanFalseString, fp_1.stubFalse],
    [fp_1.stubTrue, fp_1.stubFalse],
]);
function isNumberArrayString(v) {
    return parse_csv_1.parseAndTrimCsv(v)[0].every((item) => exports.canOnlyBeNumber(item));
}
exports.isNumberArrayString = isNumberArrayString;
/**
 * Coercions
 */
exports.coerceNumber = fp_1.cond([
    [fp_1.isBoolean, data => Number(data)],
    [fp_1.isNumber, data => Number(data)],
    [isNumberString, data => Number(data)],
]);
exports.coerceNumberArray = fp_1.map(exports.coerceNumber);
/**
 * Transforms
 */
exports.zToNumber = z
    .any()
    .refine(value => exports.canOnlyBeNumber(value), {
    params: fp_1.identity,
    message: 'Cannot coerce value to Number.',
})
    .transform(z.number(), data => exports.coerceNumber(data));
exports.zToNumberArray = z
    .any()
    .refine(value => isNumberArrayString(value), {
    params: fp_1.identity,
    message: 'Cannot coerce value to Number[].',
})
    .transform(z.array(z.number()), data => exports.coerceNumberArray(data));
