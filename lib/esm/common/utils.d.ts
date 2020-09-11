/** Util Functions Go Here*/
/** Creates a Guid (UUID v4) */
export declare function createId(): string;
/** Creates a Guid (UUID v4) */
export declare var createGuid: typeof createId;
/**
 * FP functions
 * https://codingwithjs.rocks/blog/lodash-fp-usage-retrospective
 */
export declare const isEven: (num: number) => boolean;
export declare const isOdd: (num: number) => boolean;
export declare const exists: (value: any) => boolean;
export declare const splitOnComma: import("lodash/fp").LodashSplit1x1;
export declare const hasFields: (value: any) => boolean;
export declare const replaceNonAlphaWithSpace: import("lodash/fp").LodashReplace1x3;
export declare const camelify: (string: string) => string;
/**
 * Remove all object keys whose values are falsey (null/undefined)
 */
export declare const pickTruthy: () => (obj: object) => object;
/**
 * @param obj The object we want to flatten the values into a string array
 * @returns String[]
 * @example
 *  let obj = {
 *      a: 'hello',
 *      b: {
 *        c: {
 *          d: 6,
 *          e: {
 *            f: 'goodbye'
 *          },
 *          g: {}
 *        }
 *      }
 *    };
 *    mapValuesFlat(obj); // => ['hello', 6, 'goodbye']
 */
export declare const mapValuesFlat: (obj: object) => boolean[];
/**
 * mapValuesDeep can be used to operate on each value within a deeply nested object including object arrays
 * Converted to lodash/fp & typescript from: https://github.com/Kikobeats/map-values-deep/blob/master/index.js
 * If you object is flat consider using mapValues https://lodash.com/docs/4.17.15#mapValues
 * mapValuesDeep is a curried function that you pass your Iteratee function to.
 * The iteratee function should match the param defined method signature.
 * @param fn Function {(value: any) => any}
 * @returns Function {(obj: object) => object}
 * @example
 *  const nestedObj = {
 *    id: 1234
 *    firstName: 'daniel',
 *    lastName: 'lewis'
 *    org: {
 *      'name': 'bamboo creative'
 *    }
 *  }
 *
 *  const upperFirstDeep = mapValuesDeep(upperFirst)
 *  const updateObj = upperFirstDeep(nestedObj)
 *  // {id: 1234, firstName: 'Daniel', lastName: 'Lewis', org: {name: 'Bamboo creative'}}
 */
export declare const mapValuesDeep: (fn: Function, key?: any) => (obj: object | object[]) => object;
/**
 * mapKeysDeep can be used to operate on each key within a deeply nested object including object arrays.
 * Converted to lodash/fp & typescript from: https://github.com/Kikobeats/map-keys-deep/blob/master/index.js
 * If your object is flat consider using mapKeys: https://lodash.com/docs/4.17.15#mapKeys
 * mapKeysDeep is a curried function that you pass your Iteratee function to.
 * The iteratee function should match the param defined method signature.
 * @param fn Function {(value: any, key: string) => string}
 * @returns Function {(obj: object) => object}
 * @example
 *  const nestedObj = {
 *    'Id': 1234,
 *    created-at: '123456',
 *    data: {
 *      'first name': 'daniel'
 *    }
 *  }
 *
 *  const camelifyDeep = mapKeysDeep(camelify)
 *  const updateObj = camelifyDeep(nestedObj)
 *  // {id: 1234, createdAt: '123456', data: {firstName: 'daniel'}}
 */
export declare const mapKeysDeep: (fn: any) => (obj: object | object[]) => object;
/**
 * camelifyDeep
 */
export declare const camelifyDeep: (obj: object | object[]) => object;
/**
 * renameKeys will rename all keys of one string with another
 * @export
 * @param oldKey the string key you want to replace
 * @param newKey the string you will replace the old key with
 * @returns {(obj: object) => any} a curried function you will pass an object to
 ** Note: Even though it says the curried function returns any it will return an object
 */
export declare function renameKeys(oldKey: string, newKey: string): (obj: object) => object;
/**
 * HasAtLeastOne - is the inverse of isEmpty
 * Takes an Object or Array and returns true if it has a value within
 * If passed a string or number will return false
 */
export declare const hasAtLeastOne: (value: any) => boolean;
/**
 * mergeIfExists is a conditional object merge. Good for when your not sure if the one object exsts or not.
 * It returns a curried function that you can use with Lodash Flow :)
 * @param newData the key value pair you wish to check exists before merging
 * @param data is the param of the curried function - it is the object you wish to merge newData into (if it exists)
 * @example
 *  const view = { view: args.viewName }
 *  const fields = args.fields ? { fields: args.fields } : null
 *  const filter = args.filter ? { filterByFormula: args.filter } : null
 *  const sort = args.sortByFields ? { sort: `[{field: "${args.sortByFields}", direction: "desc"}]`} : null
 *  const getQuery = flow([
 *      mergeIfExists(fields),
 *      mergeIfExists(filter),
 *      mergeIfExists(sort)
 *  ])
 *  const query = getQuery(view)
 */
export declare function mergeIfExists(newData: any): (data: any) => any;
/**
 * isRecordId checks if a value is an Airtable Record Id using a simple Regex.
 * The Regex looks for words that start with "rec" and have an additional 14 characters.
 * Currently Airtbale records are 17 characters long - this may change!!!
 * @param value the variable to test.
 * @returs True for single record Ids as strings or arrays of string ids otherwise returns false
 */
export declare const isRecordId: (value: any) => boolean;
/**
 * flattenFields takes all the properties within the fields of a AirtableRecord and moves them to top level properties of the object.
 * It will flatten the fields of related records as well.
 * The function is recursive so will flatten subRecord subRecords
 */
export declare const flattenFields: any;
/**
 * objectArrayToObject is used to flatten objects arrays with length of 1 to an object
 * TODO: write better documentation of how this works. And cover with tests
 */
export declare const objectArrayToObject: any;
