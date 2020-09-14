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
exports.singleToArray = void 0;
const z = __importStar(require("zod"));
/**
 * singleToArray is used when you are not sure whether a returned value is wrapped in an array or not and you want make sure it is.
 * @param arrayType the Zod type you are expecting to pass the function
 * @example
 *  const stringArrayWithSingle = singleToArray(z.string())
 *  const result = stringArrayWithSingle.parse('5');
 *  const parsed = stringArrayWithSingle.parse(['5']);
 *  console.log(result, parsed)
 */
exports.singleToArray = (arrayType) => {
    return z
        .transformer(z.union([arrayType, z.array(arrayType)]), z.array(arrayType), n => (Array.isArray(n) ? n : [n]))
        .transform(z.array(arrayType), data => data);
};
