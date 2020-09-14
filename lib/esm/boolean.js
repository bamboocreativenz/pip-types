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
exports.zToBooleanArray = exports.zToBoolean = exports.coerceBooleanArray = exports.coerceAnyToBooleanArray = exports.coerceArrayToBooleanArray = exports.coerceBooleanArrayCsv = exports.coerceBooleanArrayString = exports.coerceBoolean = exports.canOnlyBeBooleanArray = exports.checkBooleanArrayString = exports.isBooleanNumberArray = exports.isBooleanArrayCsv = exports.isBooleanArrayString = exports.canOnlyBeBoolean = exports.isBooleanNumber = exports.isBooleanFalseString = exports.isBooleanTrueString = void 0;
const z = __importStar(require("zod"));
const yaml = __importStar(require("yaml"));
const fp_1 = require("lodash/fp");
const parse_csv_1 = require("./common/parse-csv");
const singleToArray_1 = require("./common/singleToArray");
const array_1 = require("./array");
/**
 * Checks
 */
function isBooleanTrueString(v) {
    return /^(?:true|truee|pass|x|\[x\]|y|yes|1)$/.test(v);
}
exports.isBooleanTrueString = isBooleanTrueString;
function isBooleanFalseString(v) {
    return /^(?:false|falsee|fales|fale| |\[ \]|n|no|0)$/.test(v);
}
exports.isBooleanFalseString = isBooleanFalseString;
function isBooleanNumber(v) {
    if (fp_1.isNil(Number(v)))
        return false;
    return Number(v) === 1 || Number(v) === 0;
}
exports.isBooleanNumber = isBooleanNumber;
exports.canOnlyBeBoolean = fp_1.cond([
    [fp_1.isBoolean, fp_1.stubTrue],
    [isBooleanTrueString, fp_1.stubTrue],
    [isBooleanFalseString, fp_1.stubTrue],
    [isBooleanNumber, fp_1.stubTrue],
    [fp_1.stubTrue, fp_1.stubFalse],
]);
function isBooleanArrayString(v) {
    try {
        const arr = yaml.parse(v);
        return arr.every((item) => exports.canOnlyBeBoolean(item));
    }
    catch (error) {
        return false;
    }
}
exports.isBooleanArrayString = isBooleanArrayString;
function isBooleanArrayCsv(v) {
    return parse_csv_1.parseAndTrimCsv(v)[0].every((item) => exports.canOnlyBeBoolean(item));
}
exports.isBooleanArrayCsv = isBooleanArrayCsv;
function isBooleanNumberArray(v) {
    return z.array(z.number()).check(v) === false ? false : v.every((num) => isBooleanNumber(num));
}
exports.isBooleanNumberArray = isBooleanNumberArray;
function checkBooleanArrayString(v) {
    const update = String(v)
        .replace(/^\[+|\]+$/g, '')
        .replace(/\"/g, '');
    const arr = update.split(',');
    if (z.array(z.string()).check(arr)) {
        return arr.every((_v) => exports.canOnlyBeBoolean(_v));
    }
    else {
        return exports.canOnlyBeBoolean(arr);
    }
}
exports.checkBooleanArrayString = checkBooleanArrayString;
exports.canOnlyBeBooleanArray = fp_1.cond([
    [Array.isArray, (data) => data.every(item => exports.canOnlyBeBoolean(item))],
    [fp_1.isBoolean, fp_1.stubTrue],
    [isBooleanTrueString, fp_1.stubTrue],
    [isBooleanFalseString, fp_1.stubTrue],
    [checkBooleanArrayString, fp_1.stubTrue],
    [parse_csv_1.canParseCsv, isBooleanArrayCsv],
    [array_1.isAnyArrayString, isBooleanArrayString],
    [fp_1.isNumber, isBooleanNumber],
    [fp_1.stubTrue, fp_1.stubFalse],
]);
/**
 * Coercions
 */
exports.coerceBoolean = fp_1.cond([
    [fp_1.isBoolean, data => Boolean(data)],
    [isBooleanTrueString, fp_1.stubTrue],
    [isBooleanFalseString, fp_1.stubFalse],
    [isBooleanNumber, isBooleanNumber],
]);
function coerceBooleanArrayString(v) {
    const update = String(v)
        .replace(/^\[+|\]+$/g, '')
        .replace(/\"/g, '');
    const arr = update.split(',');
    if (z.array(z.string()).check(arr)) {
        return arr.map((_v) => exports.coerceBoolean(_v));
    }
    else {
        return coerceAnyToBooleanArray(arr);
    }
}
exports.coerceBooleanArrayString = coerceBooleanArrayString;
function coerceBooleanArrayCsv(v) {
    return parse_csv_1.parseAndTrimCsv(v)[0].map((_v) => exports.coerceBoolean(_v));
}
exports.coerceBooleanArrayCsv = coerceBooleanArrayCsv;
function coerceArrayToBooleanArray(v) {
    return v.map(_v => exports.coerceBoolean(_v));
}
exports.coerceArrayToBooleanArray = coerceArrayToBooleanArray;
function coerceAnyToBooleanArray(v) {
    return singleToArray_1.singleToArray(z.boolean()).parse(exports.coerceBoolean(v));
}
exports.coerceAnyToBooleanArray = coerceAnyToBooleanArray;
exports.coerceBooleanArray = fp_1.cond([
    [Array.isArray, coerceArrayToBooleanArray],
    [fp_1.isBoolean, coerceAnyToBooleanArray],
    [fp_1.isNumber, coerceAnyToBooleanArray],
    [array_1.isAnyArrayString, coerceBooleanArrayString],
    [parse_csv_1.canParseCsv, coerceBooleanArrayCsv],
    [fp_1.isString, coerceBooleanArrayString],
]);
/**
 * Transforms
 */
exports.zToBoolean = z
    .any()
    .refine(value => exports.canOnlyBeBoolean(value), {
    params: fp_1.identity,
    message: 'Cannot coerce value to Boolean.',
})
    .transform(z.boolean(), data => exports.coerceBoolean(data));
exports.zToBooleanArray = z
    .any()
    .refine(value => exports.canOnlyBeBooleanArray(value), {
    params: fp_1.identity,
    message: 'Cannot coerce value to Boolean[].',
})
    .transform(z.array(z.boolean()), data => exports.coerceBooleanArray(data));
