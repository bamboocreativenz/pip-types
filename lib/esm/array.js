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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTwoDimentionalArrayString = exports.isArrayString = exports.canOnlyBeArray = exports.isAnyArrayString = void 0;
const z = __importStar(require("zod"));
const yaml_1 = __importDefault(require("yaml"));
const fp_1 = require("lodash/fp");
const boolean_1 = require("./boolean");
const parse_csv_1 = require("./common/parse-csv");
const object_1 = require("./object");
/**
 * Checks
 */
function isAnyArrayString(v) {
    return /\[[^\]]*\]/.test(v);
}
exports.isAnyArrayString = isAnyArrayString;
exports.canOnlyBeArray = fp_1.cond([
    [fp_1.isBoolean, fp_1.stubFalse],
    [fp_1.isNumber, fp_1.stubFalse],
    [fp_1.isObject, fp_1.stubFalse],
    [boolean_1.isBooleanTrueString, fp_1.stubFalse],
    [boolean_1.isBooleanFalseString, fp_1.stubFalse],
    [object_1.isObjectString, fp_1.stubFalse],
    [isArrayString, fp_1.stubTrue],
    [fp_1.isArray, fp_1.stubTrue],
    [fp_1.stubTrue, fp_1.stubFalse],
]);
function isArrayString(v) {
    try {
        return z.array(z.any()).check(yaml_1.default.parse(v));
    }
    catch (error) {
        return false;
    }
}
exports.isArrayString = isArrayString;
function isTwoDimentionalArrayString(v) {
    return parse_csv_1.parseAndTrimCsv(v)[0].every((item) => exports.canOnlyBeArray(item));
}
exports.isTwoDimentionalArrayString = isTwoDimentionalArrayString;
/**
 * Coercions
 */
// export const coerceArray = cond<any, any>([
//   [isBooleanArrayString, coerceBooleanArray],
//   [isNumberArrayString, coerceNumberArray],
//   [isStringArrayString, coerceStringArray],
// ])
/**
 * Transforms
 */
// export const zToArrayT = <T extends z.ZodType<any>>(arrayType: T) => {
//   return z
//     .transformer(z.union([arrayType, z.array(arrayType)]), z.array(arrayType), n => coerceArray(n))
//     .transform(z.array(arrayType), data => data)
// }
