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
exports.zToDateArray = exports.zToDate = exports.coerceDateArray = exports.coerceDate = exports.isDateArrayString = exports.canOnlyBeDate = exports.isDateString = void 0;
const z = __importStar(require("zod"));
const fp_1 = require("lodash/fp");
const moment_1 = __importDefault(require("moment"));
const parse_csv_1 = require("./common/parse-csv");
/**
 * Checks
 */
function isDateString(v) {
    try {
        return z.date().check(moment_1.default(v).toDate);
    }
    catch (error) {
        return false;
    }
}
exports.isDateString = isDateString;
exports.canOnlyBeDate = fp_1.cond([[fp_1.isBoolean, fp_1.stubFalse]]);
function isDateArrayString(v) {
    return parse_csv_1.parseAndTrimCsv(v)[0].every((item) => exports.canOnlyBeDate(item));
}
exports.isDateArrayString = isDateArrayString;
/**
 * Coercions
 */
exports.coerceDate = fp_1.cond([
    [fp_1.isDate, data => moment_1.default(data).toDate()],
    [fp_1.isString, data => moment_1.default(data).toDate()],
]);
exports.coerceDateArray = fp_1.map(exports.coerceDate);
/**
 * Transforms
 */
exports.zToDate = z
    .any()
    .refine(value => exports.canOnlyBeDate(value), {
    params: fp_1.identity,
    message: 'Cannot coerce value to Date.',
})
    .transform(z.date(), data => exports.coerceDate(data));
exports.zToDateArray = z
    .any()
    .refine(value => isDateArrayString(value), {
    params: fp_1.identity,
    message: 'Cannot coerce value to Date[].',
})
    .transform(z.array(z.date()), data => exports.coerceDateArray(data));
