import { cond, flow, isEmpty, isNil, merge, negate, split, transform, first, keys, pick, replace, trim, camelCase, has, get, set, isArray, isObject, map, mapKeys, identity, flatMap, isPlainObject, pickBy, mapValues } from "lodash/fp";
import { objectArrayToObjectEndPoint, flattenFieldsEndPoint } from './types';
/** Util Functions Go Here*/
/** Creates a Guid (UUID v4) */
export function createId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
/** Creates a Guid (UUID v4) */
export var createGuid = createId;
/**
 * FP functions
 * https://codingwithjs.rocks/blog/lodash-fp-usage-retrospective
 */
export const isEven = (num) => num % 2 == 0;
export const isOdd = negate(isEven);
export const exists = negate(isNil);
export const splitOnComma = split(",");
export const hasFields = (value) => exists(value.fields);
export const replaceNonAlphaWithSpace = replace(/( ?[^a-zA-Z\d\s:] ?)/g, ' ');
export const camelify = flow(replaceNonAlphaWithSpace, trim, camelCase);
/**
 * Remove all object keys whose values are falsey (null/undefined)
 */
export const pickTruthy = () => pickBy(identity);
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
export const mapValuesFlat = (obj) => {
    return flatMap(obj, (value) => {
        if (isPlainObject(value)) {
            return mapValuesFlat(value);
        }
        return value;
    });
};
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
export const mapValuesDeep = (fn, key) => (obj) => isArray(obj)
    ? map((innerObj, idx) => mapValuesDeep(fn, idx)(innerObj))(obj)
    : isPlainObject(obj)
        ? mapValues((val, key) => mapValuesDeep(fn, key)(val))(obj)
        : isObject(obj)
            ? obj
            : fn(obj, key);
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
export const mapKeysDeep = (fn) => (obj) => isArray(obj)
    ? map((innerObj) => mapKeysDeep(fn)(innerObj))(obj)
    : isPlainObject(obj)
        ? flow([mapKeys(fn), mapValues((value) => mapKeysDeep(fn)(value))])(obj)
        : obj;
/**
 * camelifyDeep
 */
export const camelifyDeep = mapKeysDeep(camelify);
/**
 * renameKeys will rename all keys of one string with another
 * @export
 * @param oldKey the string key you want to replace
 * @param newKey the string you will replace the old key with
 * @returns {(obj: object) => any} a curried function you will pass an object to
 ** Note: Even though it says the curried function returns any it will return an object
 */
export function renameKeys(oldKey, newKey) {
    return (originalObj) => {
        if (has(oldKey)) {
            return flow(get(oldKey), set(newKey))(originalObj);
        }
        else {
            return originalObj;
        }
    };
}
/**
 * HasAtLeastOne - is the inverse of isEmpty
 * Takes an Object or Array and returns true if it has a value within
 * If passed a string or number will return false
 */
export const hasAtLeastOne = negate(isEmpty);
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
export function mergeIfExists(newData) {
    return (data) => cond([[exists, merge(data)]])(newData);
}
/**
 * isRecordId checks if a value is an Airtable Record Id using a simple Regex.
 * The Regex looks for words that start with "rec" and have an additional 14 characters.
 * Currently Airtbale records are 17 characters long - this may change!!!
 * @param value the variable to test.
 * @returs True for single record Ids as strings or arrays of string ids otherwise returns false
 */
export const isRecordId = (value) => {
    const regRecord = new RegExp(/^rec=?.{14,}\w+/g);
    if (isNil(value) || typeof value !== "string") {
        return false;
    }
    else if (Array.isArray(value) && typeof value[0] === "string") {
        return value[0].search(regRecord) === 0 ? true : false;
    }
    else {
        return value.search(regRecord) === 0 ? true : false;
    }
};
/**
 * flattenFields takes all the properties within the fields of a AirtableRecord and moves them to top level properties of the object.
 * It will flatten the fields of related records as well.
 * The function is recursive so will flatten subRecord subRecords
 */
export const flattenFields = flattenFieldsEndPoint.validate((record) => {
    const getMeta = pick(['id', 'createdTime']);
    const updateRecord = {};
    Object.entries(record.fields).map(([key, value]) => {
        if (Array.isArray(value) && hasFields(value[0])) {
            return value.map((subRecord) => {
                return flattenFields(subRecord);
            });
        }
        else {
            updateRecord[key] = value;
        }
    });
    return merge(getMeta(record), updateRecord);
});
/**
 * objectArrayToObject is used to flatten objects arrays with length of 1 to an object
 * TODO: write better documentation of how this works. And cover with tests
 */
export const objectArrayToObject = objectArrayToObjectEndPoint.validate((args) => {
    return transform(args, (result, value, key) => {
        const realKey = first(keys(value));
        result[realKey] = value[realKey];
        return result;
    });
});
