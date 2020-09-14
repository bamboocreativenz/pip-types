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
exports.zToObjectArray = exports.zToObject = exports.coerceObjectArray = exports.coerceObject = exports.isObjectArrayString = exports.canOnlyBeObject = exports.isObjectString = void 0;
const z = __importStar(require("zod"));
const fp_1 = require("lodash/fp");
const yaml_1 = __importDefault(require("yaml"));
const array_1 = require("./array");
const boolean_1 = require("./boolean");
const parse_csv_1 = require("./common/parse-csv");
/**
 * Checks
 */
function isObjectString(v) {
    try {
        return z.object({}).nonstrict().check(yaml_1.default.parse(v));
    }
    catch (error) {
        return false;
    }
}
exports.isObjectString = isObjectString;
exports.canOnlyBeObject = fp_1.cond([
    [fp_1.isBoolean, fp_1.stubFalse],
    [fp_1.isNumber, fp_1.stubFalse],
    [fp_1.isArray, fp_1.stubFalse],
    [boolean_1.isBooleanTrueString, fp_1.stubFalse],
    [boolean_1.isBooleanFalseString, fp_1.stubFalse],
    [array_1.isArrayString, fp_1.stubFalse],
    [isObjectString, fp_1.stubTrue],
    [fp_1.isObject, fp_1.stubTrue],
    [fp_1.stubTrue, fp_1.stubFalse],
]);
function isObjectArrayString(v) {
    return parse_csv_1.parseAndTrimCsv(v)[0].every((item) => exports.canOnlyBeObject(item));
}
exports.isObjectArrayString = isObjectArrayString;
/**
 * Coercions
 */
exports.coerceObject = fp_1.cond([
    [fp_1.isObject, data => Object(data)],
    [isObjectString, data => yaml_1.default.parse(data)],
]);
exports.coerceObjectArray = fp_1.map(exports.coerceObject);
/**
 * Transforms
 */
exports.zToObject = z
    .any()
    .refine(value => exports.canOnlyBeObject(value), {
    params: fp_1.identity,
    message: 'Cannot coerce value to Object.',
})
    .transform(z.object({}).nonstrict(), data => exports.coerceObject(data));
exports.zToObjectArray = z
    .any()
    .refine(value => isObjectArrayString(value), {
    params: fp_1.identity,
    message: 'Cannot coerce value to Object[].',
})
    .transform(z.array(z.object({}).nonstrict()), data => exports.coerceObjectArray(data));
