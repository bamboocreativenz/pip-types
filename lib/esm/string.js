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
exports.zToStringArray = exports.zToString = exports.coerceStringArray = exports.coerceString = exports.isStringArrayString = exports.canOnlyBeString = void 0;
const z = __importStar(require("zod"));
const fp_1 = require("lodash/fp");
const array_1 = require("./array");
const boolean_1 = require("./boolean");
const parse_csv_1 = require("./common/parse-csv");
const number_1 = require("./number");
const object_1 = require("./object");
/**
 * Checks
 */
exports.canOnlyBeString = fp_1.cond([
    [fp_1.isNumber, fp_1.stubFalse],
    [fp_1.isBoolean, fp_1.stubFalse],
    [fp_1.isArray, fp_1.stubFalse],
    [fp_1.isObject, fp_1.stubFalse],
    [boolean_1.isBooleanTrueString, fp_1.stubFalse],
    [boolean_1.isBooleanFalseString, fp_1.stubFalse],
    [number_1.isNumberString, fp_1.stubFalse],
    [object_1.isObjectString, fp_1.stubFalse],
    [array_1.isArrayString, fp_1.stubFalse],
    // canOnlyBeString is the only cond function here that defaults to returning true.
    [fp_1.stubTrue, fp_1.stubTrue],
]);
function isStringArrayString(v) {
    return parse_csv_1.parseAndTrimCsv(v)[0].every((item) => exports.canOnlyBeString(item));
}
exports.isStringArrayString = isStringArrayString;
/**
 * Coercions
 */
exports.coerceString = fp_1.cond([[fp_1.isString, data => fp_1.flow([escape, fp_1.trim])(data)]]);
exports.coerceStringArray = (v) => {
    return fp_1.map(exports.coerceString)(parse_csv_1.parseAndTrimCsv(v)[0]);
};
/**
 * Transforms
 */
exports.zToString = z
    .any()
    .refine(value => exports.canOnlyBeString(value), {
    params: fp_1.identity,
    message: 'Value can be coerced to a type - consider updating to using the corresponding transform.',
})
    .transform(z.string(), data => exports.coerceString(data));
exports.zToStringArray = z
    .any()
    .refine(value => isStringArrayString(value), {
    params: fp_1.identity,
    message: 'Cannot coerce value to String[].',
})
    .transform(z.array(z.string()), data => exports.coerceStringArray(data));
